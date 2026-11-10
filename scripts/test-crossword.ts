/**
 * Generates a puzzle for every day over a span and checks each one is a valid crossword.
 * Usage: npx tsx scripts/test-crossword.ts [days=730] [--show YYYY-MM-DD]
 */
import { generatePuzzle, MAX_COLS, MAX_ROWS, _internal, type Puzzle } from '../src/crossword/generator';
import { THEMES } from '../src/crossword/themes';

function problems(p: Puzzle): string[] {
  const errs: string[] = [];
  if (p.rows > MAX_ROWS || p.cols > MAX_COLS) errs.push(`grid ${p.rows}x${p.cols} too big`);

  // Every run of 2+ letters in the grid must be exactly one of the clued answers.
  const clued = new Map<string, string>();
  for (const c of [...p.across, ...p.down]) clued.set(`${c.direction},${c.row},${c.col}`, c.answer);
  const runs: string[] = [];
  const scan = (dir: 'across' | 'down') => {
    const outer = dir === 'across' ? p.rows : p.cols;
    const inner = dir === 'across' ? p.cols : p.rows;
    for (let a = 0; a < outer; a++) {
      let start = -1, word = '';
      for (let b = 0; b <= inner; b++) {
        const ch = b < inner ? (dir === 'across' ? p.grid[a][b] : p.grid[b][a]) : null;
        if (ch) { if (start < 0) start = b; word += ch; continue; }
        if (word.length >= 2) {
          const [r, c] = dir === 'across' ? [a, start] : [start, a];
          const key = `${dir},${r},${c}`;
          if (clued.get(key) !== word) errs.push(`unclued/mismatched ${dir} run "${word}" at ${r},${c}`);
          runs.push(key);
        }
        start = -1; word = '';
      }
    }
  };
  scan('across');
  scan('down');
  if (runs.length !== clued.size) errs.push(`${clued.size} clues but ${runs.length} runs in grid`);

  // Connectivity: all letter cells reachable from one another.
  const cells: [number, number][] = [];
  p.grid.forEach((row, r) => row.forEach((ch, c) => ch && cells.push([r, c])));
  const seen = new Set<string>([`${cells[0][0]},${cells[0][1]}`]);
  const stack = [cells[0]];
  while (stack.length) {
    const [r, c] = stack.pop()!;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const k = `${r + dr},${c + dc}`;
      if (!seen.has(k) && p.grid[r + dr]?.[c + dc]) { seen.add(k); stack.push([r + dr, c + dc]); }
    }
  }
  if (seen.size !== cells.length) errs.push('grid is not fully connected');

  // Numbers must be increasing in reading order.
  let last = 0;
  p.numbers.forEach((row) => row.forEach((n) => { if (n) { if (n !== last + 1) errs.push(`numbering skips ${last}->${n}`); last = n; } }));

  // No clue should contain another answer in the same puzzle.
  const all = [...p.across, ...p.down];
  for (const a of all) for (const b of all) {
    if (a !== b && b.answer.length >= 3 && new RegExp(`\\b${b.answer}\\b`, 'i').test(a.clue)) errs.push(`clue for ${a.answer} mentions ${b.answer}`);
  }
  // No repeated or overlapping answers (SEA + SEA LION, BOOK + BOOKMARK).
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
    if (_internal.overlapping(all[i].answer, all[j].answer)) errs.push(`answers ${all[i].answer} and ${all[j].answer} overlap`);
  }

  // Fair clueing: a playful clue only on an answer at least half crossed.
  const inA = new Set<string>(), inD = new Set<string>();
  for (const c of p.across) for (let k = 0; k < c.answer.length; k++) inA.add(`${c.row},${c.col + k}`);
  for (const c of p.down) for (let k = 0; k < c.answer.length; k++) inD.add(`${c.row + k},${c.col}`);
  for (const c of all) {
    if (!c.playful) continue;
    let k = 0;
    for (let j = 0; j < c.answer.length; j++) {
      const key = c.direction === 'across' ? `${c.row},${c.col + j}` : `${c.row + j},${c.col}`;
      if (inA.has(key) && inD.has(key)) k++;
    }
    if (k / c.answer.length < 0.5) errs.push(`playful clue on lightly crossed ${c.answer}`);
  }
  if (p.difficulty === 'Easy' && all.some((c) => c.playful)) errs.push('playful clue on an Easy day');

  if (p.bonus) {
    if (all.some((c) => new RegExp(`\\b${c.answer}`, 'i').test(p.bonus!.hint))) errs.push('bonus hint names a grid answer');
    if (all.some((c) => _internal.overlapping(c.answer, p.bonus!.answer))) errs.push('bonus word overlaps a grid answer');
    const letters = p.bonus.cells.map(([r, c]) => p.grid[r][c]).sort().join('');
    if (letters !== p.bonus.answer.split('').sort().join('')) errs.push(`bonus cells don't spell ${p.bonus.answer}`);
    if (new Set(p.bonus.cells.map(([r, c]) => `${r},${c}`)).size !== p.bonus.cells.length) errs.push('bonus reuses a square');
    if (all.some((c) => c.answer === p.bonus!.answer)) errs.push('bonus word is also a grid answer');
  } else bonusMissing++;
  return errs;
}
let bonusMissing = 0;

function show(p: Puzzle) {
  console.log(`\n#${p.number} ${p.dateKey} – ${p.theme.title} (${p.difficulty}) ${p.rows}x${p.cols}`);
  for (let r = 0; r < p.rows; r++) console.log('  ' + p.grid[r].map((ch) => ch ?? '·').join(' '));
  if (p.bonus) console.log(`  BONUS: ${p.bonus.answer} ${p.bonus.enumeration} – hint: ${p.bonus.hint} @ ${p.bonus.cells.map(([r, c]) => `${p.grid[r][c]}${r},${c}`).join(' ')}`);
  console.log('  ACROSS'); p.across.forEach((c) => console.log(`   ${c.number}. ${c.clue} ${c.enumeration}  [${c.answer}]`));
  console.log('  DOWN'); p.down.forEach((c) => console.log(`   ${c.number}. ${c.clue} ${c.enumeration}  [${c.answer}]`));
}

const args = process.argv.slice(2);
const showIdx = args.indexOf('--show');
if (showIdx >= 0) {
  const [y, m, d] = args[showIdx + 1].split('-').map(Number);
  show(generatePuzzle(new Date(y, m - 1, d), THEMES));
  process.exit(0);
}

const days = Number(args[0] ?? 730);
const start = new Date(2026, 10, 10);
let failures = 0, totalWords = 0, minWords = Infinity, totalCross = 0, maxMs = 0;
const perDifficulty: Record<string, number[]> = { Easy: [], Medium: [], Tricky: [] };
let prevTheme = '';
let repeats = 0;
const lastSeen = new Map<string, number>();
const gridsSeen = new Map<string, string>();
let minGap = Infinity;
const t0 = Date.now();
for (let i = 0; i < days; i++) {
  const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
  const s = Date.now();
  const p = generatePuzzle(date, THEMES);
  maxMs = Math.max(maxMs, Date.now() - s);
  const words = p.across.length + p.down.length;
  totalWords += words; minWords = Math.min(minWords, words);
  perDifficulty[p.difficulty].push(words);
  const letters = p.grid.flat().filter(Boolean).length;
  totalCross += [...p.across, ...p.down].reduce((n, c) => n + c.answer.length, 0) - letters;
  if (p.theme.id === prevTheme) repeats++;
  if (lastSeen.has(p.theme.id)) minGap = Math.min(minGap, i - lastSeen.get(p.theme.id)!);
  lastSeen.set(p.theme.id, i);
  prevTheme = p.theme.id;
  const errs = problems(p);
  const gridKey = p.grid.map((r) => r.map((ch) => ch ?? '.').join('')).join('/');
  if (gridsSeen.has(gridKey)) errs.push(`same grid as ${gridsSeen.get(gridKey)}`);
  gridsSeen.set(gridKey, p.dateKey);
  // Same date must always give the same puzzle (everyone gets the same crossword).
  if (i % 25 === 0 && JSON.stringify(generatePuzzle(date, THEMES)) !== JSON.stringify(p)) errs.push('not deterministic');
  if (errs.length) { failures++; console.log(`✗ ${p.dateKey} ${p.theme.id}: ${errs.join('; ')}`); }
}
const avg = (xs: number[]) => (xs.reduce((a, b) => a + b, 0) / (xs.length || 1)).toFixed(1);
if (minGap < 14) { failures++; console.log(`✗ a theme came back after only ${minGap} days`); }
console.log(`\n${days} puzzles, ${THEMES.length} themes, ${failures} invalid, ${repeats} back-to-back theme repeats, closest theme repeat ${minGap} days, ${bonusMissing} without a bonus word`);
console.log(`words: avg ${(totalWords / days).toFixed(1)}, min ${minWords} | Easy ${avg(perDifficulty.Easy)}, Medium ${avg(perDifficulty.Medium)}, Tricky ${avg(perDifficulty.Tricky)}`);
console.log(`crossings per puzzle: ${(totalCross / days).toFixed(1)} | slowest ${maxMs} ms, total ${Date.now() - t0} ms`);
process.exit(failures ? 1 : 0);
