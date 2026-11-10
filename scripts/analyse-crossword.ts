/**
 * Quality report for generated puzzles, measured against published crossword norms:
 *  - British "blocked" grids check at least half of every word's letters;
 *    American grids check every letter. More checking = easier to finish.
 *  - Squares must be big enough to write in (printed at 203 dpi = 8 dots/mm).
 * Usage: npx tsx scripts/analyse-crossword.ts [days=365]
 */
import { generatePuzzle } from '../src/crossword/generator';
import { THEMES } from '../src/crossword/themes';

const days = Number(process.argv[2] ?? 365);
const DOTS_PER_MM = 8;
const PRINT_WIDTH = 536; // usable dots across for the grid

// Recognition: would a daily regular have met this answer (or this exact clue) lately?
const lastSeen = new Map<string, number>(), clueSeen = new Map<string, number>();
let seen30 = 0, seen90 = 0, clueSeen365 = 0, recogWords = 0;
let words = 0, checkedLetters = 0, letters = 0, oneCrossing = 0, halfChecked = 0, cellMm = 0, minCellMm = Infinity;
const byLevel: Record<string, { n: number; checked: number; words: number; playful: number; playfulWeak: number }> = {};
for (let i = 0; i < days; i++) {
  const p = generatePuzzle(new Date(2026, 10, 10 + i), THEMES);
  // A square is "checked" if it belongs to both an across and a down answer.
  const inAcross = new Set<string>(), inDown = new Set<string>();
  for (const c of p.across) for (let k = 0; k < c.answer.length; k++) inAcross.add(`${c.row},${c.col + k}`);
  for (const c of p.down) for (let k = 0; k < c.answer.length; k++) inDown.add(`${c.row + k},${c.col}`);
  const lvl = (byLevel[p.difficulty] ??= { n: 0, checked: 0, words: 0, playful: 0, playfulWeak: 0 });
  lvl.n++;
  for (const c of [...p.across, ...p.down]) {
    const last = lastSeen.get(c.answer), lastClue = clueSeen.get(c.answer + '|' + c.clue);
    if (i >= 90) {
      recogWords++;
      if (last !== undefined && i - last <= 30) seen30++;
      if (last !== undefined && i - last <= 90) seen90++;
      if (lastClue !== undefined && i - lastClue <= 365) clueSeen365++;
    }
    lastSeen.set(c.answer, i);
    clueSeen.set(c.answer + '|' + c.clue, i);
    let k = 0;
    for (let j = 0; j < c.answer.length; j++) {
      const key = c.direction === 'across' ? `${c.row},${c.col + j}` : `${c.row + j},${c.col}`;
      if (inAcross.has(key) && inDown.has(key)) k++;
    }
    words++; lvl.words++;
    letters += c.answer.length;
    checkedLetters += k;
    lvl.checked += k / c.answer.length;
    if (k === 1) oneCrossing++;
    if (c.playful) { lvl.playful++; if (k / c.answer.length < 0.5) lvl.playfulWeak++; }
    if (k / c.answer.length >= 0.5) halfChecked++;
  }
  const cell = Math.min(50, Math.floor(PRINT_WIDTH / p.cols)) / DOTS_PER_MM;
  cellMm += cell;
  minCellMm = Math.min(minCellMm, cell);
}
const pct = (a: number, b: number) => `${((100 * a) / b).toFixed(0)}%`;
console.log(`${days} puzzles, ${words} answers`);
console.log(`letters checked (crossed):        ${pct(checkedLetters, letters)}   (British norm ≥50% per word, American 100%)`);
console.log(`answers at least half checked:    ${pct(halfChecked, words)}`);
console.log(`answers crossed only once:        ${pct(oneCrossing, words)}`);
for (const [k, v] of Object.entries(byLevel)) console.log(`  ${k.padEnd(7)} avg checked per answer ${pct(v.checked, v.words)}, playful clues ${pct(v.playful, v.words)} (${v.playfulWeak} on lightly crossed answers)`);
console.log(`answers seen in the last 30 days:  ${pct(seen30, recogWords)}`);
console.log(`answers seen in the last 90 days:  ${pct(seen90, recogWords)}`);
console.log(`same answer AND same clue within a year: ${pct(clueSeen365, recogWords)}`);
console.log(`square size: avg ${(cellMm / days).toFixed(1)} mm, smallest ${minCellMm.toFixed(1)} mm`);
