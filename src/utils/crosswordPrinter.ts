/**
 * Daily Crossword receipt – generated entirely locally (no network).
 * Today's puzzle on top, yesterday's solution in a mini grid at the bottom.
 */
import { dateKeyOf, generatePuzzle, type Puzzle, type PuzzleClue } from '../crossword/generator';
import { THEMES } from '../crossword/themes';

const WIDTH = 576; // 80mm thermal dot width
const MARGIN = 20;
const CONTENT = WIDTH - MARGIN * 2;

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function dashedRule(ctx: CanvasRenderingContext2D, y: number) {
  ctx.save();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(MARGIN + 10, y);
  ctx.lineTo(WIDTH - MARGIN - 10, y);
  ctx.stroke();
  ctx.restore();
}

/** Draws a grid; when `solution` is true letters are filled in. Returns the bottom y. */
function drawGrid(ctx: CanvasRenderingContext2D, p: Puzzle, top: number, maxCell: number, maxWidth: number, solution: boolean): number {
  const cell = Math.min(maxCell, Math.floor(maxWidth / p.cols));
  const left = Math.floor((WIDTH - cell * p.cols) / 2);
  const circled = new Set(!solution && p.bonus ? p.bonus.cells.map(([r, c]) => `${r},${c}`) : []);
  ctx.save();
  ctx.lineWidth = solution ? 1.5 : 2;
  ctx.strokeStyle = '#000';
  for (let r = 0; r < p.rows; r++) {
    for (let c = 0; c < p.cols; c++) {
      const ch = p.grid[r][c];
      if (!ch) continue;
      const x = left + c * cell, y = top + r * cell;
      ctx.fillStyle = '#FFF';
      ctx.fillRect(x, y, cell, cell);
      ctx.strokeRect(x + 0.5, y + 0.5, cell, cell);
      ctx.fillStyle = '#000';
      if (solution) {
        ctx.font = `bold ${Math.round(cell * 0.62)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ch, x + cell / 2 + 0.5, y + cell / 2 + 1.5);
      } else {
        if (circled.has(`${r},${c}`)) {
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          // Sit the circle slightly low-right so it clears the clue number.
          ctx.arc(x + cell * 0.55, y + cell * 0.57, cell * 0.33, 0, Math.PI * 2);
          ctx.stroke();
          ctx.lineWidth = 2;
        }
        if (p.numbers[r][c]) {
          const label = String(p.numbers[r][c]);
          const size = Math.max(10, Math.round(cell * 0.3));
          ctx.font = `bold ${size}px sans-serif`;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          // White backing keeps the number readable over a circle.
          ctx.fillStyle = '#FFF';
          ctx.fillRect(x + 2, y + 2, ctx.measureText(label).width + 3, size + 2);
          ctx.fillStyle = '#000';
          ctx.fillText(label, x + 3, y + 3);
        }
      }
    }
  }
  ctx.restore();
  return top + cell * p.rows;
}

function drawClues(ctx: CanvasRenderingContext2D, heading: string, clues: PuzzleClue[], top: number): number {
  let y = top;
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.font = '900 23px sans-serif';
  ctx.fillText(heading, MARGIN, y);
  ctx.fillRect(MARGIN, y + 6, ctx.measureText(heading).width, 3);
  y += 34;

  // ~2.6 mm text: newspaper clue size, comfortable for kids and older eyes alike.
  const gutter = 40;
  const lineHeight = 26;
  for (const c of clues) {
    ctx.font = 'bold 21px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(String(c.number), MARGIN + gutter - 10, y);
    ctx.textAlign = 'left';
    ctx.font = '21px sans-serif';
    const text = c.enumeration ? `${c.clue} ${c.enumeration}` : c.clue;
    const lines = wrapLines(ctx, text, CONTENT - gutter);
    lines.forEach((line, i) => ctx.fillText(line, MARGIN + gutter, y + i * lineHeight));
    y += lines.length * lineHeight + 8;
  }
  return y;
}

const HINT_LINE: Record<Puzzle['difficulty'], string> = {
  Easy: 'Nice and gentle. Perfect for all ages!',
  Medium: 'A few clues have a playful twist.',
  Tricky: 'Lots of clues have a twist. Think sideways!',
};

/** Boxed bonus challenge. Returns the bottom y. */
function drawBonus(ctx: CanvasRenderingContext2D, p: Puzzle, top: number): number {
  if (!p.bonus) return top;
  const inner = CONTENT - 28;
  ctx.font = '18px sans-serif';
  const howLines = wrapLines(ctx, `Unscramble the circled letters to find a hidden word ${p.bonus.enumeration}`, inner);
  ctx.font = 'italic 19px sans-serif';
  const hintLines = wrapLines(ctx, `Hint: ${p.bonus.hint}`, inner);
  const blanks = p.bonus.answer.length;
  const bw = 34, gap = 6, line = 24;
  const boxH = 40 + howLines.length * line + 6 + hintLines.length * line + 14 + bw + 18;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.strokeRect(MARGIN + 1, top, CONTENT - 2, boxH);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.font = '900 21px sans-serif';
  ctx.fillText('BONUS WORD', WIDTH / 2, top + 30);
  let y = top + 30 + line;
  ctx.font = '18px sans-serif';
  howLines.forEach((l) => { ctx.fillText(l, WIDTH / 2, y); y += line; });
  y += 6;
  ctx.font = 'italic 19px sans-serif';
  hintLines.forEach((l) => { ctx.fillText(l, WIDTH / 2, y); y += line; });
  // Write-in boxes for the answer.
  let x = WIDTH / 2 - (blanks * bw + (blanks - 1) * gap) / 2;
  const by = y - 6;
  for (let i = 0; i < blanks; i++) {
    ctx.strokeRect(x + 0.5, by + 0.5, bw, bw);
    x += bw + gap;
  }
  ctx.restore();
  return top + boxH;
}

function drawDifficulty(ctx: CanvasRenderingContext2D, level: Puzzle['difficulty'], centreX: number, y: number) {
  const filled = level === 'Easy' ? 1 : level === 'Medium' ? 2 : 3;
  const label = level.toUpperCase();
  ctx.font = 'bold 15px monospace';
  const labelW = ctx.measureText(label).width;
  const box = 11, gap = 4;
  const total = 3 * box + 2 * gap + 10 + labelW;
  let x = centreX - total / 2;
  for (let i = 0; i < 3; i++) {
    if (i < filled) ctx.fillRect(x, y - box, box, box);
    else { ctx.lineWidth = 1.5; ctx.strokeRect(x + 0.75, y - box + 0.75, box - 1.5, box - 1.5); }
    x += box + gap;
  }
  ctx.textAlign = 'left';
  ctx.fillText(label, x + 6, y);
}

// A day's puzzle never changes, so keep the last few in memory – repeat presses are instant on the Pi.
const puzzleCache = new Map<string, Puzzle>();
// Bump the version when the word bank changes enough that saved puzzles should be remade.
const STORE_PREFIX = 'crossword-puzzle-v2-';
const OLD_STORE_PREFIX = 'crossword-puzzle-2';

/**
 * Each day's puzzle is also saved on the device the first time it's made. That way
 * "yesterday's answers" always match the puzzle people were actually given, even if
 * the themes or generator are updated overnight.
 */
function loadStored(key: string): Puzzle | null {
  try {
    const raw = localStorage.getItem(STORE_PREFIX + key);
    if (!raw) return null;
    const p = JSON.parse(raw) as Puzzle;
    return p && p.dateKey === key && Array.isArray(p.grid) && Array.isArray(p.across) ? p : null;
  } catch {
    return null;
  }
}

function store(p: Puzzle) {
  try {
    localStorage.setItem(STORE_PREFIX + p.dateKey, JSON.stringify(p));
    // Keep only the last few days.
    const keep = new Set([0, 1, 2, 3].map((n) => dateKeyOf(new Date(Date.now() - n * 86_400_000))));
    keep.add(p.dateKey);
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k?.startsWith(STORE_PREFIX) && !keep.has(k.slice(STORE_PREFIX.length))) localStorage.removeItem(k);
      else if (k?.startsWith(OLD_STORE_PREFIX)) localStorage.removeItem(k); // puzzles saved by an older version
    }
  } catch {
    /* storage full or unavailable – the puzzle still prints */
  }
}

function puzzleFor(date: Date): Puzzle {
  const key = dateKeyOf(date);
  let p = puzzleCache.get(key) ?? loadStored(key);
  if (!p) {
    p = generatePuzzle(date, THEMES);
    store(p);
  }
  if (!puzzleCache.has(key)) {
    puzzleCache.set(key, p);
    if (puzzleCache.size > 4) puzzleCache.delete(puzzleCache.keys().next().value!);
  }
  return p;
}

/**
 * Builds today's (and yesterday's) puzzle ahead of time so the button prints instantly.
 * Safe to call often: once a day's puzzle is cached this does nothing.
 */
export function prewarmCrossword(date: Date = new Date()): void {
  if (date.getFullYear() < 2026) return;
  if (puzzleFor(date).number > 1) puzzleFor(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
}

export async function generateCrosswordImage(date: Date = new Date()): Promise<string> {
  // The Pi has no battery clock: if it hasn't synced the time, don't print a wrong-day puzzle.
  if (date.getFullYear() < 2026) throw new Error("The clock isn't set. Check the Pi's date and time.");
  const today = puzzleFor(date);
  // No "yesterday" before launch day.
  const yesterday = today.number > 1 ? puzzleFor(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)) : null;

  // Draw onto a tall scratch canvas, then crop to the used height.
  const scratch = document.createElement('canvas');
  scratch.width = WIDTH;
  scratch.height = 6000;
  const ctx = scratch.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, WIDTH, scratch.height);
  ctx.fillStyle = '#000';

  // --- Header ---
  ctx.fillRect(0, 0, WIDTH, 12);
  ctx.textAlign = 'center';
  ctx.font = '900 30px sans-serif';
  ctx.fillText('DAILY CROSSWORD', WIDTH / 2, 56);

  ctx.font = '15px monospace';
  const dateStr = date.toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  ctx.fillText(`No. ${today.number}  ·  ${dateStr}`, WIDTH / 2, 82);

  // Theme banner (white text on black)
  let y = 100;
  ctx.font = 'bold 24px sans-serif';
  const bannerH = 44;
  ctx.fillRect(MARGIN, y, CONTENT, bannerH);
  ctx.fillStyle = '#FFF';
  ctx.textBaseline = 'middle';
  ctx.fillText(today.theme.title.toUpperCase(), WIDTH / 2, y + bannerH / 2 + 1);
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#000';
  y += bannerH + 28;

  drawDifficulty(ctx, today.difficulty, WIDTH / 2, y);
  y += 24;
  ctx.textAlign = 'center';
  ctx.font = 'italic 17px sans-serif';
  ctx.fillText(HINT_LINE[today.difficulty], WIDTH / 2, y);
  y += 22;

  // --- Grid ---
  y = drawGrid(ctx, today, y, 50, CONTENT, false) + 34;

  // --- Clues ---
  y = drawClues(ctx, 'ACROSS', today.across, y) + 12;
  y = drawClues(ctx, 'DOWN', today.down, y) + 8;
  if (today.bonus) y = drawBonus(ctx, today, y + 6) + 20;

  // --- Yesterday's answers ---
  if (yesterday) {
    dashedRule(ctx, y);
    y += 32;
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText("YESTERDAY'S ANSWERS", WIDTH / 2, y);
    y += 20;
    ctx.font = 'italic 14px sans-serif';
    ctx.fillText(yesterday.theme.title, WIDTH / 2, y);
    y += 14;
    y = drawGrid(ctx, yesterday, y, 22, 300, true) + 30;
    if (yesterday.bonus) {
      ctx.textAlign = 'center';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(`Bonus word: ${yesterday.bonus.answer}`, WIDTH / 2, y - 4);
      y += 22;
    }
  }

  // --- Footer ---
  dashedRule(ctx, y);
  y += 28;
  ctx.textAlign = 'center';
  ctx.font = 'italic 14px sans-serif';
  ctx.fillText('A brand new puzzle every day. Come back tomorrow!', WIDTH / 2, y);
  y += 20;
  ctx.fillRect(0, y, WIDTH, 12);
  y += 12;

  const out = document.createElement('canvas');
  out.width = WIDTH;
  out.height = y;
  out.getContext('2d')!.drawImage(scratch, 0, 0);
  scratch.width = scratch.height = 0; // release the large scratch buffer straight away
  return out.toDataURL('image/png');
}
