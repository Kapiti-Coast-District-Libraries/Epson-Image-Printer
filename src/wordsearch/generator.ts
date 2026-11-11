/**
 * Daily Word Search – built locally from the crossword's kid-level word bank.
 *
 * Each day uses a different theme from the crossword (half a theme cycle away), so the
 * two puzzles never overlap. The same date always gives the same puzzle.
 */
import { difficultyOf, puzzleDayOf, themeForDay, type Difficulty } from '../crossword/generator';
import { makeRng, shuffle } from '../crossword/random';
import type { Theme } from '../crossword/types';

export interface PlacedWord {
  /** As shown in the word list, e.g. "ICE CREAM". */
  label: string;
  /** Letters as they sit in the grid, e.g. "ICECREAM". */
  letters: string;
  row: number;
  col: number;
  dr: number;
  dc: number;
}

export interface WordSearch {
  dateKey: string;
  number: number;
  theme: { id: string; title: string };
  difficulty: Difficulty;
  size: number;
  grid: string[][];
  words: PlacedWord[];
}

interface Level { size: number; words: number; maxLen: number; dirs: [number, number][] }

// Easy: across and down only. Medium adds the downward diagonal. Tricky adds every
// direction, backwards included – still with short, everyday words.
const RIGHT: [number, number] = [0, 1], DOWN: [number, number] = [1, 0], DIAG: [number, number] = [1, 1], UPDIAG: [number, number] = [-1, 1];
const LEVELS: Record<Difficulty, Level> = {
  Easy: { size: 10, words: 8, maxLen: 8, dirs: [RIGHT, DOWN] },
  Medium: { size: 11, words: 10, maxLen: 9, dirs: [RIGHT, DOWN, DIAG, UPDIAG] },
  Tricky: { size: 12, words: 12, maxLen: 10, dirs: [RIGHT, DOWN, DIAG, UPDIAG, [0, -1], [-1, 0], [-1, -1], [1, -1]] },
};

/** Directions used when checking the finished grid for hidden extras. */
const ALL_DIRS: [number, number][] = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];

// Random filler letters can spell things by accident. Any grid containing one of these,
// in any direction, is thrown away and refilled.
const BLOCKED = ['FUCK', 'SHIT', 'CUNT', 'COCK', 'DICK', 'PISS', 'TWAT', 'SLUT', 'WANK', 'ARSE', 'TITS', 'CRAP', 'DAMN', 'HELL', 'POOP', 'FART', 'NAZI', 'RAPE', 'KILL', 'DEAD', 'SEXY', 'SEX', 'ASS', 'FAG', 'GAY', 'NOB', 'TIT', 'POO', 'WEE', 'BUM', 'HOE', 'JIZZ', 'BOOB', 'PORN', 'NUDE', 'DRUG', 'BITCH', 'BOLLOCK'];

const DAY_MS = 86_400_000;

function dateKeyOf(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

const lettersOnly = (s: string) => s.replace(/[^A-Z]/g, '');

/** Words from the theme that suit the level: plain letters, a sensible length, no word hiding inside another. */
function candidates(theme: Theme, level: Level): { label: string; letters: string }[] {
  const seen = new Set<string>();
  const out: { label: string; letters: string }[] = [];
  for (const e of theme.entries) {
    const letters = lettersOnly(e.answer);
    if (letters.length < 3 || letters.length > level.maxLen || seen.has(letters)) continue;
    seen.add(letters);
    out.push({ label: e.answer.replace(/-/g, ' '), letters });
  }
  return out;
}

/** Does `word` appear in the grid, in any direction, starting at (r, c)? Counts every match. */
function countInGrid(grid: (string | null)[][], word: string): number {
  const n = grid.length;
  let count = 0;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (grid[r][c] !== word[0]) continue;
    for (const [dr, dc] of ALL_DIRS) {
      // A palindrome reads the same both ways; count it once.
      if (word.length > 1 && word === [...word].reverse().join('') && (dr < 0 || (dr === 0 && dc < 0))) continue;
      let k = 1;
      for (; k < word.length; k++) {
        const rr = r + dr * k, cc = c + dc * k;
        if (rr < 0 || cc < 0 || rr >= n || cc >= n || grid[rr][cc] !== word[k]) break;
      }
      if (k === word.length) count++;
    }
  }
  return count;
}

/** How many times `word` reads inside `text`, forwards or backwards. */
function occurrencesIn(text: string, word: string): number {
  const reversed = [...word].reverse().join('');
  let n = 0;
  for (let i = 0; i + word.length <= text.length; i++) {
    const part = text.slice(i, i + word.length);
    if (part === word) n++;
    else if (part === reversed) n++;
  }
  return n;
}

function tryBuild(pool: { label: string; letters: string }[], level: Level, rng: () => number): { grid: string[][]; words: PlacedWord[] } | null {
  const n = level.size;
  const grid: (string | null)[][] = Array.from({ length: n }, () => Array(n).fill(null));
  const words: PlacedWord[] = [];
  // A mix of short and long words: no more than half the list may be 7+ letters, so
  // younger solvers always have easy ones to start on. Longer words go in first,
  // since they are the hardest to fit.
  let long = 0;
  const picks = shuffle(pool, rng).filter((w) => {
    if (w.letters.length < 7) return true;
    return long++ < level.words;
  }).slice(0, level.words * 2).sort((a, b) => b.letters.length - a.letters.length);
  const maxLong = Math.floor(level.words / 2);
  let placedLong = 0;
  for (const w of picks) {
    if (words.length >= level.words) break;
    // Skip a word that contains, or is contained in, one already placed (CAT and CATERPILLAR).
    if (words.some((p) => p.letters.includes(w.letters) || w.letters.includes(p.letters))) continue;
    if (w.letters.length >= 7 && placedLong >= maxLong) continue;
    const spots: { r: number; c: number; dr: number; dc: number; overlap: number }[] = [];
    for (const [dr, dc] of level.dirs) {
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        const er = r + dr * (w.letters.length - 1), ec = c + dc * (w.letters.length - 1);
        if (er < 0 || ec < 0 || er >= n || ec >= n) continue;
        let overlap = 0, ok = true;
        for (let k = 0; k < w.letters.length; k++) {
          const ch = grid[r + dr * k][c + dc * k];
          if (ch === null) continue;
          if (ch !== w.letters[k]) { ok = false; break; }
          overlap++;
        }
        // Sharing a letter or two makes a nicer grid; never let one word swallow another.
        if (ok && overlap < w.letters.length - 1) spots.push({ r, c, dr, dc, overlap });
      }
    }
    if (!spots.length) continue;
    // Prefer a little overlap, otherwise anywhere.
    const best = shuffle(spots, rng).sort((a, b) => Math.min(b.overlap, 2) - Math.min(a.overlap, 2))[0];
    for (let k = 0; k < w.letters.length; k++) grid[best.r + best.dr * k][best.c + best.dc * k] = w.letters[k];
    words.push({ ...w, row: best.r, col: best.c, dr: best.dr, dc: best.dc });
    if (w.letters.length >= 7) placedLong++;
  }
  if (words.length < level.words) return null;

  // Fill the gaps with letters drawn from the hidden words themselves, so stray
  // letters look like they belong and the words don't jump out.
  const bag = words.map((w) => w.letters).join('');
  for (let attempt = 0; attempt < 20; attempt++) {
    const filled = grid.map((row) => row.map((ch) => ch ?? bag[Math.floor(rng() * bag.length)]));
    // A blocked sequence inside a real word is fine (SHELL, GLASS, SPOON); only reject
    // one that turns up anywhere else, i.e. the filler letters spelled it by accident.
    const clean = !BLOCKED.some((b) => countInGrid(filled, b) > words.reduce((n, w) => n + occurrencesIn(w.letters, b), 0));
    // Every listed word must appear exactly once, so nobody circles the wrong copy.
    const unique = words.every((w) => countInGrid(filled, w.letters) === 1);
    if (clean && unique) return { grid: filled, words };
  }
  return null;
}

export function generateWordSearch(date: Date, themes: readonly Theme[]): WordSearch {
  if (!themes.length) throw new Error('No word search themes available');
  const day = puzzleDayOf(date);
  const difficulty = difficultyOf(date);
  const level = LEVELS[difficulty];
  const dateKey = dateKeyOf(date);
  // Half a theme cycle away from the crossword, so the two never share a theme on a day.
  const crosswordTheme = themeForDay(day, themes).id;
  let theme = themeForDay(day + Math.floor(themes.length / 2), themes);
  for (let tries = 0; tries < themes.length; tries++) {
    const pool = candidates(theme, level);
    // Where one theme cycle meets the next the offset can land on the crossword's own
    // theme; step past it so the two keys never print the same topic.
    if (theme.id !== crosswordTheme && pool.length >= level.words) {
      for (let attempt = 0; attempt < 40; attempt++) {
        const built = tryBuild(pool, level, makeRng(`wordsearch|${dateKey}|${theme.id}|${attempt}`));
        if (built) {
          built.words.sort((a, b) => (a.label < b.label ? -1 : 1));
          return { dateKey, number: day + 1, theme: { id: theme.id, title: theme.title }, difficulty, size: level.size, ...built };
        }
      }
    }
    // Fall back to a theme from a different point in the cycle (a quarter, then three
    // quarters, ...), which keeps it clear of the themes used on nearby days.
    const n = themes.length;
    const offsets = [Math.floor(n / 4), Math.floor((3 * n) / 4), Math.floor(n / 3), Math.floor((2 * n) / 3)];
    theme = themeForDay(day + (offsets[tries] ?? Math.floor(n / 2) + tries), themes);
  }
  throw new Error('Could not build a word search for this date');
}

export const _internal = { countInGrid, occurrencesIn, LEVELS, BLOCKED, DAY_MS };
