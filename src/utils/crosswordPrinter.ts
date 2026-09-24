export interface NYTCrosswordData {
  title?: string;
  author?: string;
  editor?: string;
  date?: string;
  publisher?: string;
  size: {
    rows: number;
    cols: number;
  };
  grid: string[];
  gridnums: number[];
  clues: {
    across: string[];
    down: string[];
  };
}

/**
 * Fetches today's NYT crossword from the doshea/nyt_crosswords GitHub repository.
 * Uses media.githubusercontent.com/media/ to download actual files bypassing Git LFS pointers.
 */
export async function fetchDailyCrossword(targetDate: Date = new Date()): Promise<NYTCrosswordData> {
  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
  const dd = String(targetDate.getDate()).padStart(2, '0');

  const primaryUrl = `https://media.githubusercontent.com/media/doshea/nyt_crosswords/master/${yyyy}/${mm}/${dd}.json`;

  try {
    const res = await fetch(primaryUrl);
    if (!res.ok) throw new Error(`Puzzle not found for date ${yyyy}-${mm}-${dd}`);
    return await res.json();
  } catch (err) {
    console.warn(`Could not load puzzle for ${yyyy}-${mm}-${dd}. Loading fallback archive puzzle.`, err);

    // Fallback to a confirmed historic puzzle from the media CDN
    const fallbackUrl = `https://media.githubusercontent.com/media/doshea/nyt_crosswords/master/2017/01/01.json`;
    const fallbackRes = await fetch(fallbackUrl);
    if (!fallbackRes.ok) {
      throw new Error("Failed to load fallback crossword puzzle.");
    }
    return await fallbackRes.json();
  }
}

/**
 * Generates and renders the daily crossword into a base64 PNG image URL formatted for thermal printing.
 */
export async function generateCrosswordImage(): Promise<string> {
  const puzzle = await fetchDailyCrossword();

  const canvasWidth = 576; // Standard 80mm thermal printer dot width
  const padding = 20;
  const contentWidth = canvasWidth - padding * 2;

  // Grid dimensions
  const cols = puzzle.size.cols || 15;
  const rows = puzzle.size.rows || 15;
  const cellSize = Math.floor(contentWidth / cols);
  const gridWidth = cellSize * cols;
  const gridHeight = cellSize * rows;

  // Layout calculations for two-column clue listing
  const colWidth = Math.floor((contentWidth - 15) / 2);
  const lineHeight = 16;

  // Temporary canvas context for measuring clue text height
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.font = '12px sans-serif';

  const measureCluesHeight = (cluesList: string[]) => {
    let totalH = 0;
    cluesList.forEach((clue) => {
      const words = clue.split(' ');
      let line = '';
      let linesCount = 1;
      words.forEach((w) => {
        const testLine = line + w + ' ';
        if (tempCtx.measureText(testLine).width > colWidth - 5 && line !== '') {
          linesCount++;
          line = w + ' ';
        } else {
          line = testLine;
        }
      });
      totalH += linesCount * lineHeight + 4;
    });
    return totalH;
  };

  const acrossHeight = measureCluesHeight(puzzle.clues.across);
  const downHeight = measureCluesHeight(puzzle.clues.down);
  const cluesSectionHeight = Math.max(acrossHeight, downHeight) + 40;

  const headerHeight = 100;
  const totalHeight = headerHeight + gridHeight + cluesSectionHeight + 40;

  // Initialize canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = totalHeight;

  const ctx = canvas.getContext('2d')!;

  // White Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvasWidth, totalHeight);

  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#000000';

  // --- HEADER ---
  ctx.textAlign = 'center';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('DAILY CROSSWORD', canvasWidth / 2, 35);

  ctx.font = '14px sans-serif';
  const authorText = puzzle.author ? `By ${puzzle.author}` : 'New York Times Crossword';
  ctx.fillText(authorText, canvasWidth / 2, 58);

  if (puzzle.date) {
    ctx.font = 'italic 12px sans-serif';
    ctx.fillText(puzzle.date, canvasWidth / 2, 78);
  }

  // --- GRID ---
  const gridStartX = Math.floor((canvasWidth - gridWidth) / 2);
  const gridStartY = headerHeight;

  // Outer border
  ctx.lineWidth = 2;
  ctx.strokeRect(gridStartX, gridStartY, gridWidth, gridHeight);

  // Render cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      const x = gridStartX + c * cellSize;
      const y = gridStartY + r * cellSize;

      const cellVal = puzzle.grid[index];
      const numVal = puzzle.gridnums[index];

      if (cellVal === '.') {
        // Solid black cell
        ctx.fillRect(x, y, cellSize, cellSize);
      } else {
        // White cell outline
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellSize, cellSize);

        // Grid number in top-left
        if (numVal && numVal > 0) {
          ctx.font = '9px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(numVal.toString(), x + 2, y + 10);
        }
      }
    }
  }

  // --- CLUES SECTION ---
  const cluesStartY = gridStartY + gridHeight + 30;

  ctx.textAlign = 'left';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('ACROSS', padding, cluesStartY);
  ctx.fillText('DOWN', padding + colWidth + 15, cluesStartY);

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, cluesStartY + 5);
  ctx.lineTo(padding + colWidth - 10, cluesStartY + 5);
  ctx.moveTo(padding + colWidth + 15, cluesStartY + 5);
  ctx.lineTo(canvasWidth - padding, cluesStartY + 5);
  ctx.stroke();

  const renderClueColumn = (cluesList: string[], startX: number, startY: number) => {
    let currentY = startY + 22;
    ctx.font = '12px sans-serif';

    cluesList.forEach((clue) => {
      const words = clue.split(' ');
      let line = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > colWidth - 5 && i > 0) {
          ctx.fillText(line, startX, currentY);
          line = words[i] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, startX, currentY);
      currentY += lineHeight + 4;
    });
  };

  renderClueColumn(puzzle.clues.across, padding, cluesStartY);
  renderClueColumn(puzzle.clues.down, padding + colWidth + 15, cluesStartY);

  return canvas.toDataURL('image/png');
}
