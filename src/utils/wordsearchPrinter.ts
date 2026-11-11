/**
 * Daily Word Search receipt – generated entirely locally (no network).
 * Same look as the crossword: header, theme banner, level, then the letter grid and
 * a tick-box word list.
 */
import { THEMES } from '../crossword/themes';
import { generateWordSearch, type WordSearch } from '../wordsearch/generator';

const WIDTH = 576; // 80mm thermal dot width
const MARGIN = 20;
const CONTENT = WIDTH - MARGIN * 2;

const HOW_TO: Record<WordSearch['difficulty'], string> = {
  Easy: 'Words go across and down.',
  Medium: 'Words go across, down and on a slant.',
  Tricky: 'Words go every way, even backwards!',
};

function drawDifficulty(ctx: CanvasRenderingContext2D, level: WordSearch['difficulty'], centreX: number, y: number) {
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

function dashedRule(ctx: CanvasRenderingContext2D, y: number) {
  ctx.save();
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(MARGIN + 10, y);
  ctx.lineTo(WIDTH - MARGIN - 10, y);
  ctx.stroke();
  ctx.restore();
}

// A day's puzzle never changes, so repeat presses reuse it.
const cache = new Map<string, WordSearch>();

export async function generateWordSearchImage(date: Date = new Date()): Promise<string> {
  // The Pi has no battery clock: if it hasn't synced the time, don't print a wrong-day puzzle.
  if (date.getFullYear() < 2026) throw new Error("The clock isn't set. Check the Pi's date and time.");
  const key = date.toDateString();
  let ws = cache.get(key);
  if (!ws) {
    ws = generateWordSearch(date, THEMES);
    cache.clear();
    cache.set(key, ws);
  }

  const scratch = document.createElement('canvas');
  scratch.width = WIDTH;
  scratch.height = 3000;
  const ctx = scratch.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, WIDTH, scratch.height);
  ctx.fillStyle = '#000';

  // --- Header ---
  ctx.fillRect(0, 0, WIDTH, 8);
  ctx.textAlign = 'center';
  ctx.font = '900 30px sans-serif';
  ctx.fillText('WORD SEARCH', WIDTH / 2, 44);
  ctx.font = '15px monospace';
  const dateStr = date.toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  ctx.fillText(`No. ${ws.number}  ·  ${dateStr}`, WIDTH / 2, 66);

  // Theme banner (white text on black)
  let y = 80;
  const bannerH = 40;
  ctx.fillRect(MARGIN, y, CONTENT, bannerH);
  ctx.fillStyle = '#FFF';
  ctx.font = 'bold 24px sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(ws.theme.title.toUpperCase(), WIDTH / 2, y + bannerH / 2 + 1);
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#000';
  y += bannerH + 24;

  drawDifficulty(ctx, ws.difficulty, WIDTH / 2, y);
  y += 22;
  ctx.textAlign = 'center';
  ctx.font = 'italic 17px sans-serif';
  ctx.fillText(`Find ${ws.words.length} hidden words. ${HOW_TO[ws.difficulty]}`, WIDTH / 2, y);
  y += 16;

  // --- Letter grid ---
  const cell = Math.min(46, Math.floor((CONTENT - 8) / ws.size));
  const gridW = cell * ws.size;
  const left = Math.floor((WIDTH - gridW) / 2);
  ctx.lineWidth = 2.5;
  ctx.strokeRect(left - 4, y - 4 + 0.5, gridW + 8, gridW + 8);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(cell * 0.6)}px sans-serif`;
  for (let r = 0; r < ws.size; r++) {
    for (let c = 0; c < ws.size; c++) {
      ctx.fillText(ws.grid[r][c], left + c * cell + cell / 2, y + r * cell + cell / 2 + 1);
    }
  }
  ctx.textBaseline = 'alphabetic';
  y += gridW + 4 + 30;

  // --- Word list with tick boxes ---
  ctx.font = '900 21px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('WORDS TO FIND', MARGIN, y);
  ctx.fillRect(MARGIN, y + 6, ctx.measureText('WORDS TO FIND').width, 3);
  y += 32;
  ctx.font = '20px sans-serif';
  const box = 16;
  const widest = Math.max(...ws.words.map((w) => ctx.measureText(w.label).width));
  const cols = widest + box + 14 <= CONTENT / 3 ? 3 : 2;
  const colW = CONTENT / cols;
  const rows = Math.ceil(ws.words.length / cols);
  const lineH = 30;
  ws.words.forEach((w, i) => {
    // Fill down each column, so the list still reads alphabetically.
    const col = Math.floor(i / rows), row = i % rows;
    const x = MARGIN + col * colW;
    const by = y + row * lineH;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 0.75, by - box + 1.75, box, box);
    ctx.fillText(w.label, x + box + 10, by);
  });
  y += rows * lineH + 6;

  // --- Footer ---
  dashedRule(ctx, y);
  y += 22;
  ctx.textAlign = 'center';
  ctx.font = 'italic 14px sans-serif';
  ctx.fillText('A brand new word search every day. Come back tomorrow!', WIDTH / 2, y);
  y += 14;
  ctx.fillRect(0, y, WIDTH, 8);
  y += 8;

  const out = document.createElement('canvas');
  out.width = WIDTH;
  out.height = y;
  out.getContext('2d')!.drawImage(scratch, 0, 0);
  scratch.width = scratch.height = 0;
  return out.toDataURL('image/png');
}
