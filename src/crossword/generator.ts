/**
 * Daily crossword generator – fully local and deterministic.
 *
 * - The date picks the theme (every theme is used once before any repeats),
 *   the difficulty (by weekday) and seeds the layout, so everyone pressing the
 *   button on the same day gets the same puzzle.
 * - Layout is a "criss-cross" (puzzle-book style): words interlock on a blank
 *   background. Many seeded attempts are made and the best-scoring grid wins.
 */
import type { ClueEntry, Theme } from './types';
import { hashString, makeRng, shuffle } from './random';

export type Direction = 'across' | 'down';
export type Difficulty = 'Easy' | 'Medium' | 'Tricky';

export interface PuzzleClue {
  number: number;
  clue: string;
  /** Grid answer, letters only. */
  answer: string;
  /** Letter count, e.g. "(5)" or "(3,4)" for multi-word answers. */
  enumeration: string;
  /** True when today's wording is the playful "hard" clue. */
  playful: boolean;
  row: number;
  col: number;
  direction: Direction;
}

export interface Puzzle {
  dateKey: string;
  /** Running puzzle number: 1 on launch day (PUZZLE_EPOCH); 0 or less before it. */
  number: number;
  theme: { id: string; title: string };
  difficulty: Difficulty;
  rows: number;
  cols: number;
  /** Solution letters; null for blank squares. */
  grid: (string | null)[][];
  /** Clue numbers for cells that start a word; 0 otherwise. */
  numbers: number[][];
  across: PuzzleClue[];
  down: PuzzleClue[];
  /**
   * Hidden bonus word: an unused theme word whose letters are circled in the grid,
   * to unscramble once the grid is done. Answer is revealed the next day.
   */
  bonus: { answer: string; hint: string; enumeration: string; cells: [number, number][] } | null;
}

/** Narrow grid → bigger squares on 72 mm paper (11 cols ≈ 6 mm squares). The receipt can be as long as it likes. */
// Wide, short grids: every row of squares is 6 mm of receipt paper, so the grid may be
// wider than it is tall but never the other way round.
export const MAX_COLS = 12;
export const MAX_ROWS = 11;
/** Layout tuning (exported so scripts can experiment). */
export const TUNING = { attempts: 60, bonusWords: 2, multiCross: 12, shortBonus: 40, growth: 0.35, fresh: 12, minFresh: 0.6, recent: 8, stale: 30, recentDays: 30, repairRounds: 6, repairBoards: 6 };
/** Day 1 of the daily crossword. */
const PUZZLE_EPOCH = Date.UTC(2026, 10, 10);
const DAY_MS = 86_400_000;

// Sunday = 0. Weekends and early week stay friendly; Friday is the trickiest.
// Every level is meant to be finishable – the harder days just need more thought.
const WEEKDAY_DIFFICULTY: Difficulty[] = ['Medium', 'Easy', 'Easy', 'Medium', 'Medium', 'Tricky', 'Easy'];
const TARGET_WORDS: Record<Difficulty, [number, number]> = {
  Easy: [9, 11],
  Medium: [11, 13],
  Tricky: [13, 15],
};
/** Share of clues that use the cleverer "hard" wording. */
const HARD_CLUE_SHARE: Record<Difficulty, number> = { Easy: 0, Medium: 0.15, Tricky: 0.3 };
/** Length range for the hidden bonus word. */
const BONUS_LEN: Record<Difficulty, [number, number]> = { Easy: [4, 5], Medium: [5, 6], Tricky: [6, 7] };
/** Longest answer allowed per level – long words are hard work for kids. */
const MAX_ANSWER_LEN: Record<Difficulty, number> = { Easy: 7, Medium: 9, Tricky: 10 };

const lettersOnly = (answer: string) => answer.replace(/[^A-Z]/g, '');

function enumerationOf(answer: string): string {
  // "KIWI" -> (4); "SEA LION" -> (3,4); hyphens are kept: "X-RAY" -> (1-3)
  const words = answer.trim().split(/\s+/);
  return '(' + words.map((w) => w.split('-').map((s) => s.length).join('-')).join(',') + ')';
}

/** Weekday (Sunday = 0) of a day number – 1 Jan 1970 was a Thursday. */
const weekdayOf = (day: number) => (((day + 4) % 7) + 7) % 7;

/** Local calendar day number (days since Unix epoch, ignoring timezone offset). */
function dayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_MS);
}

/** Puzzle day for a date: 0 on launch day, counting up one per calendar day. */
export function puzzleDayOf(date: Date): number {
  return dayNumber(date) - PUZZLE_EPOCH / DAY_MS;
}

/** The day's level, shared by the crossword and the word search. */
export function difficultyOf(date: Date): Difficulty {
  return WEEKDAY_DIFFICULTY[date.getDay()];
}

export function dateKeyOf(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
}

/** Minimum days before a theme can come round again across a cycle boundary. */
const MIN_THEME_GAP = 14;
const cycleCache = new Map<string, Theme[]>();

/**
 * Themes are shuffled once per cycle, so every theme is used once before any repeats.
 * Where one cycle meets the next, the themes from the end of the old cycle are kept out
 * of the start of the new one, so no theme ever returns within MIN_THEME_GAP days.
 */
function cycleOrder(cycle: number, sorted: readonly Theme[]): Theme[] {
  const cacheKey = `${cycle}|${sorted.map((t) => t.id).join(',')}`;
  const hit = cycleCache.get(cacheKey);
  if (hit) return hit;
  // Build forward from cycle 0 (cheap: a few dozen shuffles even decades on).
  let order = shuffle(sorted, makeRng('theme-cycle-0'));
  for (let c = 1; c <= cycle; c++) {
    const k = Math.min(MIN_THEME_GAP, Math.floor(sorted.length / 2));
    const tail = new Set(order.slice(order.length - k));
    const next = shuffle(sorted, makeRng(`theme-cycle-${c}`));
    const fresh = next.filter((t) => !tail.has(t));
    const head = fresh.slice(0, k);
    const headSet = new Set(head);
    order = [...head, ...next.filter((t) => !headSet.has(t))];
  }
  if (cycleCache.size > 8) cycleCache.clear();
  cycleCache.set(cacheKey, order);
  return order;
}

/** Theme for a given puzzle day (0 = launch day). */
export function themeForDay(day: number, themes: readonly Theme[]): Theme {
  // Plain code-point sort: localeCompare would depend on the device's language settings.
  const sorted = themes.slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const n = sorted.length;
  const cycle = Math.max(0, Math.floor(day / n));
  return cycleOrder(cycle, sorted)[((day % n) + n) % n];
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

interface Cell { ch: string; across: boolean; down: boolean; r: number; c: number }
/** Numeric square key (much faster than "r,c" strings in the hot layout loop). */
const keyOf = (r: number, c: number) => (r + 512) * 1024 + (c + 512);
interface Placement { entry: ClueEntry; word: string; row: number; col: number; dir: Direction; clue: string }

class Board {
  cells = new Map<number, Cell>();
  /** Squares indexed by letter, so finding crossing spots doesn't scan the whole grid. */
  byLetter = new Map<string, [number, number, Cell][]>();
  placed: Placement[] = [];
  minR = 0; maxR = -1; minC = 0; maxC = -1;
  crossings = 0;

  get(r: number, c: number) { return this.cells.get(keyOf(r, c)); }
  empty(r: number, c: number) { return !this.cells.has(keyOf(r, c)); }

  /** Returns number of crossings if the word fits legally, else -1. */
  check(word: string, r: number, c: number, dir: Direction): number {
    const dr = dir === 'down' ? 1 : 0;
    const dc = dir === 'across' ? 1 : 0;
    const len = word.length;
    if (!this.empty(r - dr, c - dc) || !this.empty(r + dr * len, c + dc * len)) return -1;

    let crossings = 0;
    for (let i = 0; i < len; i++) {
      const rr = r + dr * i, cc = c + dc * i;
      const cell = this.get(rr, cc);
      if (cell) {
        if (cell.ch !== word[i] || cell[dir]) return -1;
        crossings++;
      } else if (dir === 'across') {
        if (!this.empty(rr - 1, cc) || !this.empty(rr + 1, cc)) return -1;
      } else {
        if (!this.empty(rr, cc - 1) || !this.empty(rr, cc + 1)) return -1;
      }
    }
    if (this.placed.length > 0 && (crossings === 0 || crossings === len)) return -1;

    const minR = Math.min(this.minR, r), maxR = Math.max(this.maxR, r + dr * (len - 1));
    const minC = Math.min(this.minC, c), maxC = Math.max(this.maxC, c + dc * (len - 1));
    if (this.placed.length > 0 && (maxR - minR + 1 > MAX_ROWS || maxC - minC + 1 > MAX_COLS)) return -1;
    return crossings;
  }

  area(extra?: { r: number; c: number; dir: Direction; len: number }) {
    let { minR, maxR, minC, maxC } = this;
    if (extra) {
      const endR = extra.r + (extra.dir === 'down' ? extra.len - 1 : 0);
      const endC = extra.c + (extra.dir === 'across' ? extra.len - 1 : 0);
      if (this.placed.length === 0) { minR = extra.r; minC = extra.c; maxR = endR; maxC = endC; }
      minR = Math.min(minR, extra.r); maxR = Math.max(maxR, endR);
      minC = Math.min(minC, extra.c); maxC = Math.max(maxC, endC);
    }
    return { rows: maxR - minR + 1, cols: maxC - minC + 1 };
  }

  place(p: Placement, crossings: number) {
    const dr = p.dir === 'down' ? 1 : 0;
    const dc = p.dir === 'across' ? 1 : 0;
    const first = this.placed.length === 0;
    for (let i = 0; i < p.word.length; i++) {
      const r = p.row + dr * i, c = p.col + dc * i;
      const key = keyOf(r, c);
      let cell = this.cells.get(key);
      if (!cell) {
        cell = { ch: p.word[i], across: false, down: false, r, c };
        this.cells.set(key, cell);
        const list = this.byLetter.get(cell.ch) ?? [];
        list.push([r, c, cell]);
        this.byLetter.set(cell.ch, list);
      }
      cell[p.dir] = true;
    }
    const endR = p.row + dr * (p.word.length - 1), endC = p.col + dc * (p.word.length - 1);
    if (first) { this.minR = p.row; this.minC = p.col; this.maxR = endR; this.maxC = endC; }
    this.minR = Math.min(this.minR, p.row); this.maxR = Math.max(this.maxR, endR);
    this.minC = Math.min(this.minC, p.col); this.maxC = Math.max(this.maxC, endC);
    this.crossings += crossings;
    this.placed.push(p);
  }

  /** Every legal crossing placement for a word. */
  options(word: string) {
    const out: { r: number; c: number; dir: Direction; crossings: number }[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < word.length; i++) {
      for (const [r, c, cell] of this.byLetter.get(word[i]) ?? []) {
        if (cell.across && cell.down) continue;
        const dir: Direction = cell.across ? 'down' : 'across';
        const sr = dir === 'down' ? r - i : r;
        const sc = dir === 'across' ? c - i : c;
        const id = `${sr},${sc},${dir}`;
        if (seen.has(id)) continue;
        seen.add(id);
        const crossings = this.check(word, sr, sc, dir);
        if (crossings > 0) out.push({ r: sr, c: sc, dir, crossings });
      }
    }
    return out;
  }
}

/** True if any answer word (3+ letters) appears in the text – avoids clues giving away other answers. */
function mentions(text: string, answer: string): boolean {
  const plain = text.toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return answer
    .split(/[\s-]+/)
    .filter((w) => w.length >= 3)
    .some((w) => new RegExp(`\\b${w.replace(/[^A-Z]/g, '')}`).test(plain));
}

/** Answers that repeat each other (SEA / SEA LION, STAR / STARFISH) shouldn't share a grid. */
function overlapping(a: string, b: string): boolean {
  const wa = a.split(/[\s-]+/), wb = b.split(/[\s-]+/);
  if (wa.some((w) => w.length >= 3 && wb.includes(w))) return true;
  const la = lettersOnly(a), lb = lettersOnly(b);
  const [short, long] = la.length <= lb.length ? [la, lb] : [lb, la];
  return short.length >= 4 && (long.startsWith(short) || long.endsWith(short));
}

const STOPWORDS = new Set('that this with from your what when where which they them their there have into than then also just like used make made for and the are its you who has had one ones kind sort type'.split(' '));

/** Distinctive words in a clue (plurals folded, neighbouring words joined so "green stone" ~ "greenstone"). */
function clueTokens(clue: string): string[] {
  const words = clue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
  const out = new Set<string>();
  const fold = (w: string) => w.replace(/(es|s)$/, '');
  words.forEach((w, i) => {
    if (w.length >= 4 && !STOPWORDS.has(w)) out.add(fold(w));
    if (i > 0 && words[i - 1].length >= 3 && w.length >= 3) out.add(fold(words[i - 1] + w));
  });
  return [...out];
}

/**
 * Greedy best-first builder: at every step, look at every remaining word and every
 * legal spot, and take the single placement that interlocks best. Words that cross
 * two or more others are strongly preferred – the more letters are crossed, the more
 * help a solver gets when a clue stumps them.
 */
function buildBoard(entries: ClueEntry[], clueFor: Map<ClueEntry, string>, clashes: Map<ClueEntry, Set<ClueEntry>>, target: [number, number], seed: string, fresh: Set<ClueEntry>, recent: Set<string>): Board {
  const rng = makeRng(seed);
  const board = new Board();
  const pool = shuffle(entries, rng);

  const words = new Map(pool.map((e) => [e, lettersOnly(e.answer)]));
  /** This visit's half of the word list, and nothing seen in the last few weeks. */
  const rank = (e: ClueEntry) => (fresh.has(e) ? 1 : 0);

  // Start with a mid-length word that fits across the narrow receipt grid.
  const starters = pool.filter((e) => { const n = lettersOnly(e.answer).length; return n >= 5 && n <= Math.min(9, MAX_COLS); })
    .sort((a, b) => rank(b) - rank(a));
  const first = starters[0] ?? pool[0];
  const firstWord = lettersOnly(first.answer);
  const firstDir: Direction = firstWord.length <= MAX_COLS && rng() < 0.6 ? 'across' : 'down';
  board.place({ entry: first, word: firstWord, row: 0, col: 0, dir: firstDir, clue: clueFor.get(first)! }, 0);

  const goal = target[0] + Math.floor(rng() * (target[1] - target[0] + 1));
  // Small per-attempt preference per word so different attempts explore different grids.
  const jitter = new Map(pool.map((e) => [e, rng() * 10]));
  const ctx: GrowContext = { pool, words, clueFor, clashes, fresh, recent, jitter, rng };
  // Once the goal is met, allow a couple of bonus words – but only ones that bridge 2+ words.
  grow(board, ctx, goal, goal + TUNING.bonusWords);
  return board;
}

interface GrowContext {
  pool: ClueEntry[];
  words: Map<ClueEntry, string>;
  clueFor: Map<ClueEntry, string>;
  clashes: Map<ClueEntry, Set<ClueEntry>>;
  fresh: Set<ClueEntry>;
  recent: Set<string>;
  jitter: Map<ClueEntry, number>;
  rng: () => number;
}

/**
 * Adds words one at a time, always taking the placement that interlocks best, until
 * the board has `cap` words. Past `goal`, only words crossing two or more others go in.
 */
function grow(board: Board, ctx: GrowContext, goal: number, cap: number) {
  const { words, clashes, fresh, recent, jitter, rng } = ctx;
  // Entries that clash with a placed word (or are already in) are left out.
  const blocked = new Set<ClueEntry>();
  for (const p of board.placed) { blocked.add(p.entry); for (const e of clashes.get(p.entry) ?? []) blocked.add(e); }
  let remaining = ctx.pool.filter((e) => !blocked.has(e));

  while (board.placed.length < cap) {
    const bonusRound = board.placed.length >= goal;
    let best: { entry: ClueEntry; word: string; r: number; c: number; dir: Direction; crossings: number } | null = null;
    let bestScore = -Infinity;
    const before = board.area();

    for (const entry of remaining) {
      const word = words.get(entry)!;
      for (const o of board.options(word)) {
        if (bonusRound && o.crossings < 2) continue;
        const after = board.area({ r: o.r, c: o.c, dir: o.dir, len: word.length });
        const growth = after.rows * after.cols - before.rows * before.cols;
        const checkedShare = o.crossings / word.length;
        const score =
          o.crossings * o.crossings * TUNING.multiCross + // multi-crossings are worth far more than singles
          checkedShare * TUNING.shortBonus -              // short, well-crossed words beat long dangly ones
          growth * TUNING.growth +
          (fresh.has(entry) ? TUNING.fresh : 0) -         // this time round's half of the word list
          (recent.has(word) ? TUNING.recent : 0) +        // seen lately, perhaps in another theme
          jitter.get(entry)! + rng() * 4;
        if (score > bestScore) { bestScore = score; best = { entry, word, ...o }; }
      }
    }
    if (!best) break;
    board.place({ entry: best.entry, word: best.word, row: best.r, col: best.c, dir: best.dir, clue: ctx.clueFor.get(best.entry)! }, best.crossings);
    const placed = best.entry;
    remaining = remaining.filter((e) => e !== placed && !clashes.get(placed)?.has(e));
  }
}

/** A fresh board holding the given placements (in their original order). */
function rebuild(placements: Placement[]): Board {
  const board = new Board();
  for (const p of placements) board.place({ ...p }, Math.max(0, board.check(p.word, p.row, p.col, p.dir)));
  return board;
}

/**
 * Repair pass: a word hanging on by a single crossing is the one a solver gets stuck
 * on. Try lifting each such word out and regrowing the grid with words that cross two
 * or more others; keep any change that scores better. Repeats until nothing improves.
 */
function improve(board: Board, ctx: GrowContext, score: (b: Board) => number, cap: number): Board {
  let best = board, bestScore = score(board);
  for (let round = 0; round < TUNING.repairRounds; round++) {
    let improved = false;
    const loose = best.placed.filter((p) => crossedLetters(best, p) <= 1);
    for (const p of shuffle(loose, ctx.rng)) {
      // A word with one crossing crossed something placed before it, and nothing after
      // it crosses it, so lifting it out leaves the rest connected and in a valid order.
      const trial = rebuild(best.placed.filter((q) => q !== p));
      if (!trial.placed.length) continue;
      grow(trial, ctx, 0, cap);
      const s = score(trial);
      if (s > bestScore) { best = trial; bestScore = s; improved = true; break; }
    }
    if (!improved) break;
  }
  return best;
}

/** Share of answer letters that are crossed by another answer. */
function checkedShare(board: Board): number {
  let crossed = 0;
  for (const cell of board.cells.values()) if (cell.across && cell.down) crossed++;
  const letters = board.placed.reduce((n, p) => n + p.word.length, 0);
  return letters ? (crossed * 2) / letters : 0;
}

/** Answers crossed only once – the ones a solver can get stuck on. */
function weaklyCrossed(board: Board): number {
  let weak = 0;
  for (const p of board.placed) if (crossedLetters(board, p) <= 1) weak++;
  return weak;
}

function scoreBoard(board: Board, target: [number, number]): number {
  const n = board.placed.length;
  const shortfall = Math.max(0, target[0] - n);
  const { rows, cols } = board.area();
  const density = board.cells.size / (rows * cols);
  // Each extra row costs paper, so shorter layouts win when all else is close.
  return checkedShare(board) * 400 - weaklyCrossed(board) * 25 + n * 4 - shortfall * 60 + density * 40 - rows * 6;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function generatePuzzle(date: Date, themes: readonly Theme[]): Puzzle {
  if (!themes.length) throw new Error('No crossword themes available');
  const day = dayNumber(date);
  const dateKey = dateKeyOf(date);
  const puzzleDay = day - PUZZLE_EPOCH / DAY_MS; // 0 on launch day
  const theme = themeForDay(puzzleDay, themes);
  const difficulty = WEEKDAY_DIFFICULTY[date.getDay()];
  const target = TARGET_WORDS[difficulty];
  const visit = visitOf(puzzleDay, themes);

  // Each answer has several wordings that take turns, one per visit to the theme.
  const wording = wordingFor(theme, visit);
  // Layout uses the plain clue; the final easy/hard choice is made once we know
  // how well each answer is crossed (see chooseClues).
  const clueFor = new Map<ClueEntry, string>(theme.entries.map((e) => [e, wording.get(e)!.easy]));
  const cluesOf = (e: ClueEntry) => { const w = wording.get(e)!; return HARD_CLUE_SHARE[difficulty] > 0 && w.hard ? [w.easy, w.hard] : [w.easy]; };

  const usable = usableFor(theme, difficulty);

  // Pairs of entries that can't share a grid because one's clue names the other's answer.
  const clashes = new Map<ClueEntry, Set<ClueEntry>>();
  // Also pairs whose answers repeat each other, or whose clues are near-twins: a word
  // that only two entries' clues share is a sign they describe the same thing.
  const tokens = new Map(usable.map((e) => [e, new Set(cluesOf(e).flatMap(clueTokens))]));
  const df = new Map<string, number>();
  for (const set of tokens.values()) for (const t of set) df.set(t, (df.get(t) ?? 0) + 1);
  const twins = (a: ClueEntry, b: ClueEntry) => {
    let shared = 0;
    for (const t of tokens.get(a)!) if (tokens.get(b)!.has(t) && df.get(t)! <= 2) shared++;
    return shared >= 2;
  };
  for (const a of usable) for (const b of usable) {
    if (a === b) continue;
    // Either of today's possible clues counts, since the wording is settled after layout.
    if (cluesOf(a).some((c) => mentions(c, b.answer)) || cluesOf(b).some((c) => mentions(c, a.answer)) ||
        overlapping(a.answer, b.answer) || twins(a, b)) {
      if (!clashes.has(a)) clashes.set(a, new Set());
      clashes.get(a)!.add(b);
    }
  }

  // Word rotation: each time a theme comes round it favours a different half of its word
  // list, so every word gets used over time and back-to-back visits feel fresh.
  const fresh = freshWords(theme, usable, visit);
  // Many answers live in several themes (OWL, MAP, GOLD…); steer clear of ones that
  // were probably in a recent puzzle, whatever its theme.
  const recent = recentAnswers(puzzleDay, themes);

  const fullScore = (board: Board) => {
    // Layouts built mostly from this visit's words rank first, so repeat visits look different.
    const freshShare = board.placed.filter((p) => fresh.has(p.entry)).length / board.placed.length;
    const stale = board.placed.filter((p) => recent.has(p.word)).length;
    return scoreBoard(board, target) + (freshShare >= TUNING.minFresh ? 1000 : 0) - stale * TUNING.stale;
  };
  const boards: { board: Board; score: number }[] = [];
  for (let i = 0; i < TUNING.attempts; i++) {
    const board = buildBoard(usable, clueFor, clashes, target, `${dateKey}|${theme.id}|${i}`, fresh, recent);
    boards.push({ board, score: fullScore(board) });
  }
  boards.sort((a, b) => b.score - a.score);
  // Polish the front-runners with the repair pass, then re-rank.
  const words = new Map(usable.map((e) => [e, lettersOnly(e.answer)]));
  for (let i = 0; i < Math.min(TUNING.repairBoards, boards.length); i++) {
    const rng = makeRng(`${dateKey}|repair|${i}`);
    const ctx: GrowContext = { pool: shuffle(usable, rng), words, clueFor, clashes, fresh, recent, jitter: new Map(usable.map((e) => [e, rng() * 10])), rng };
    const better = improve(boards[i].board, ctx, fullScore, target[1] + TUNING.bonusWords);
    boards[i] = { board: better, score: fullScore(better) };
  }
  boards.sort((a, b) => b.score - a.score);
  // Take the best layout that can also hide a bonus word (nearly always the very best one).
  let board = boards[0].board;
  for (const { board: b } of boards.slice(0, 8)) {
    chooseClues(b, difficulty, dateKey, wording);
    if (pickBonus(theme, b, gridOf(b), dateKey, difficulty, wording, recent)) { board = b; break; }
  }

  const grid = gridOf(board);
  const { rows, cols } = board.area();

  // Number the starting squares in reading order.
  const starts = board.placed
    .map((p) => ({ ...p, row: p.row - board.minR, col: p.col - board.minC }))
    .sort((a, b) => a.row - b.row || a.col - b.col);
  const numbers: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  let next = 1;
  const across: PuzzleClue[] = [];
  const down: PuzzleClue[] = [];
  for (const p of starts) {
    if (!numbers[p.row][p.col]) numbers[p.row][p.col] = next++;
    const clue: PuzzleClue = {
      number: numbers[p.row][p.col],
      clue: p.clue,
      answer: p.word,
      enumeration: enumerationOf(p.entry.answer),
      playful: !!wording.get(p.entry)!.hard && p.clue === wording.get(p.entry)!.hard,
      row: p.row,
      col: p.col,
      direction: p.dir,
    };
    (p.dir === 'across' ? across : down).push(clue);
  }
  across.sort((a, b) => a.number - b.number);
  down.sort((a, b) => a.number - b.number);

  const bonus = pickBonus(theme, board, grid, dateKey, difficulty, wording, recent);

  return {
    dateKey,
    number: puzzleDay + 1, // 0 or less means a date before launch
    theme: { id: theme.id, title: theme.title },
    difficulty,
    rows,
    cols,
    grid,
    numbers,
    across,
    down,
    bonus,
  };
}

/** How many times the theme has come round before (0 on its first appearance). */
function visitOf(puzzleDay: number, themes: readonly Theme[]): number {
  return Math.max(0, Math.floor(puzzleDay / themes.length));
}

/** Answers short enough for the day's level (everything, if a theme is short of them). */
function usableFor(theme: Theme, difficulty: Difficulty): ClueEntry[] {
  const fitting = theme.entries.filter((e) => lettersOnly(e.answer).length <= MAX_ANSWER_LEN[difficulty]);
  return fitting.length >= TARGET_WORDS[difficulty][1] * 2 ? fitting : theme.entries;
}

interface Wording { easy: string; hard: string }

/**
 * Today's wording for every answer. Wordings take turns visit by visit, each answer
 * starting at its own point in the rotation, so a returning word gets a new clue.
 */
function wordingFor(theme: Theme, visit: number): Map<ClueEntry, Wording> {
  const pick = (list: string[], salt: string) => list[(visit + hashString(salt)) % list.length];
  return new Map(theme.entries.map((e) => [e, {
    easy: pick(e.easy, `easy|${theme.id}|${e.answer}`),
    hard: e.hard.length ? pick(e.hard, `hard|${theme.id}|${e.answer}`) : '', // not every answer has a playful clue
  }]));
}

const recentCache = new Map<string, Set<string>>();

/**
 * Answers that were probably in a puzzle in the last TUNING.recentDays days: the favoured
 * half of each recent day's theme. Worked out from the schedule alone (no puzzles are
 * built), so it is quick and no puzzle depends on another one.
 */
function recentAnswers(puzzleDay: number, themes: readonly Theme[]): Set<string> {
  const key = `${puzzleDay}|${themes.length}|${TUNING.recentDays}`;
  const hit = recentCache.get(key);
  if (hit) return hit;
  const out = new Set<string>();
  for (let d = Math.max(0, puzzleDay - TUNING.recentDays); d < puzzleDay; d++) {
    const t = themeForDay(d, themes);
    const difficulty = WEEKDAY_DIFFICULTY[weekdayOf(d + PUZZLE_EPOCH / DAY_MS)];
    for (const e of freshWords(t, usableFor(t, difficulty), visitOf(d, themes))) out.add(lettersOnly(e.answer));
  }
  if (recentCache.size > 8) recentCache.clear();
  recentCache.set(key, out);
  return out;
}

/** The half of a theme's word list favoured on its `visit`-th appearance. */
function freshWords(theme: Theme, usable: ClueEntry[], visit: number): Set<ClueEntry> {
  const order = shuffle(usable, makeRng(`fresh|${theme.id}`));
  const n = order.length;
  const half = Math.ceil(n / 2);
  // Step round the list by the golden ratio, so the window lands somewhere new each visit
  // instead of flipping between the same two halves (which repeated whole grids).
  const start = Math.floor(((visit * 0.6180339887) % 1) * n);
  return new Set(Array.from({ length: half }, (_, i) => order[(start + i) % n]));
}

/** The board as a 0-based grid of letters (null = blank square). */
function gridOf(board: Board): (string | null)[][] {
  const { rows, cols } = board.area();
  const grid: (string | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
  for (const cell of board.cells.values()) {
    grid[cell.r - board.minR][cell.c - board.minC] = cell.ch;
  }
  return grid;
}

/** How many of a placed answer's letters are crossed by another answer. */
function crossedLetters(board: Board, p: Placement): number {
  let k = 0;
  for (let i = 0; i < p.word.length; i++) {
    const cell = board.get(p.row + (p.dir === 'down' ? i : 0), p.col + (p.dir === 'across' ? i : 0))!;
    if (cell.across && cell.down) k++;
  }
  return k;
}

/**
 * Fair clueing (a standard setter's rule): twisty clues only go on answers whose
 * letters are mostly crossed, so a stumped solver can always lean on the crossings.
 * Lightly crossed answers always get the plain clue.
 */
function chooseClues(board: Board, difficulty: Difficulty, dateKey: string, wording: Map<ClueEntry, Wording>) {
  const share = HARD_CLUE_SHARE[difficulty];
  for (const p of board.placed) p.clue = wording.get(p.entry)!.easy;
  if (share === 0) return;
  const rng = makeRng(`${dateKey}|clues`);
  const ranked = board.placed
    .map((p) => ({ p, checked: crossedLetters(board, p) / p.word.length, tie: rng() }))
    .filter((x) => x.checked >= 0.5 && wording.get(x.p.entry)!.hard)
    .sort((a, b) => b.checked - a.checked || a.tie - b.tie);
  const want = Math.round(share * board.placed.length);
  // Shuffle among the eligible answers so it isn't always the most-crossed ones.
  const eligible = shuffle(ranked.slice(0, Math.max(want, Math.ceil(ranked.length * 0.8))), rng);
  for (const { p } of eligible.slice(0, want)) p.clue = wording.get(p.entry)!.hard;
}

function pickBonus(theme: Theme, board: Board, grid: (string | null)[][], dateKey: string, difficulty: Difficulty, wording: Map<ClueEntry, Wording>, recent: Set<string>): Puzzle['bonus'] {
  const rng = makeRng(`${dateKey}|bonus`);
  const placed = new Set(board.placed.map((p) => p.entry));
  const [minLen, maxLen] = BONUS_LEN[difficulty];
  const fits = (e: ClueEntry, lo: number, hi: number) => e.answer.length >= lo && e.answer.length <= hi;
  const cellsByLetter = new Map<string, [number, number][]>();
  grid.forEach((row, r) => row.forEach((ch, c) => {
    if (ch) cellsByLetter.set(ch, [...(cellsByLetter.get(ch) ?? []), [r, c]]);
  }));

  // A hint that doesn't name any grid answer (the plain clue, else the playful one).
  const hintFor = (e: ClueEntry) => { const w = wording.get(e)!; return [w.easy, w.hard].find((h) => h && !board.placed.some((p) => mentions(h, p.entry.answer))); };
  // Words not seen lately come first.
  const candidates = shuffle(theme.entries, rng).sort((a, b) => Number(recent.has(a.answer)) - Number(recent.has(b.answer))).filter((e) => {
    if (placed.has(e) || /[\s-]/.test(e.answer)) return false;
    if (!fits(e, 4, 8)) return false;
    // It mustn't repeat a grid answer, and no printed clue may give it away.
    if (board.placed.some((p) => mentions(p.clue, e.answer) || overlapping(p.entry.answer, e.answer))) return false;
    if (!hintFor(e)) return false;
    const need = new Map<string, number>();
    for (const ch of e.answer) need.set(ch, (need.get(ch) ?? 0) + 1);
    return [...need].every(([ch, n]) => (cellsByLetter.get(ch)?.length ?? 0) >= n);
  });
  // Prefer today's length range, then the nearest length to it.
  const target = (minLen + maxLen) / 2;
  const chosen = candidates.find((e) => fits(e, minLen, maxLen)) ??
    candidates.slice().sort((a, b) => Math.abs(a.answer.length - target) - Math.abs(b.answer.length - target))[0];
  if (!chosen) return null;

  // Circle one square per letter, spread around the grid.
  const used = new Set<string>();
  const cells: [number, number][] = [];
  for (const ch of chosen.answer) {
    const options = shuffle(cellsByLetter.get(ch)!, rng).filter(([r, c]) => !used.has(`${r},${c}`));
    const pick = options.sort((a, b) => spread(b, cells) - spread(a, cells))[0];
    used.add(`${pick[0]},${pick[1]}`);
    cells.push(pick);
  }
  return { answer: chosen.answer, hint: hintFor(chosen)!, enumeration: enumerationOf(chosen.answer), cells };
}

/** Distance to the nearest already-circled square (bigger = more spread out). */
function spread([r, c]: [number, number], chosen: [number, number][]): number {
  if (!chosen.length) return 0;
  return Math.min(...chosen.map(([r2, c2]) => Math.abs(r - r2) + Math.abs(c - c2)));
}

/** Exposed for tests. */
export const _internal = { hashString, enumerationOf, dayNumber, clueTokens, overlapping };
