/**
 * Automatically generates a randomized maze puzzle on a canvas
 * for thermal/image printing.
 */

export interface MazeOptions {
  width?: number;   // Number of horizontal cells
  height?: number;  // Number of vertical cells
  cellSize?: number; // Size of each cell in pixels
}

export function generateMazeCanvas(options: MazeOptions = {}): HTMLCanvasElement {
  const cols = options.width || 15;
  const rows = options.height || 15;
  const cellSize = options.cellSize || 22;

  const padding = 30;
  const headerHeight = 70;
  const canvasWidth = cols * cellSize + padding * 2;
  const canvasHeight = rows * cellSize + padding * 2 + headerHeight;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // High contrast monochrome background for crisp thermal printing
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Title and Date Header
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DAILY MAZE', canvasWidth / 2, 40);

  ctx.font = '14px sans-serif';
  ctx.fillText(new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }), canvasWidth / 2, 62);

  // Maze Data Structure setup
  type Cell = { x: number; y: number; walls: boolean[]; visited: boolean };
  const grid: Cell[][] = [];

  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      // Top, Right, Bottom, Left
      grid[r][c] = { x: c, y: r, walls: [true, true, true, true], visited: false };
    }
  }

  // Recursive Backtracker Generator
  const stack: Cell[] = [];
  let current = grid[0][0];
  current.visited = true;
  let unvisitedCount = rows * cols - 1;

  while (unvisitedCount > 0) {
    const { x, y } = current;
    const neighbors: { cell: Cell; dir: number }[] = [];

    if (y > 0 && !grid[y - 1][x].visited) neighbors.push({ cell: grid[y - 1][x], dir: 0 }); // Top
    if (x < cols - 1 && !grid[y][x + 1].visited) neighbors.push({ cell: grid[y][x + 1], dir: 1 }); // Right
    if (y < rows - 1 && !grid[y + 1][x].visited) neighbors.push({ cell: grid[y + 1][x], dir: 2 }); // Bottom
    if (x > 0 && !grid[y][x - 1].visited) neighbors.push({ cell: grid[y][x - 1], dir: 3 }); // Left

    if (neighbors.length > 0) {
      const nextChoice = neighbors[Math.floor(Math.random() * neighbors.length)];
      const nextCell = nextChoice.cell;
      const dir = nextChoice.dir;

      // Remove wall between current cell and chosen cell
      current.walls[dir] = false;
      nextCell.walls[(dir + 2) % 4] = false;

      stack.push(current);
      current = nextCell;
      current.visited = true;
      unvisitedCount--;
    } else if (stack.length > 0) {
      current = stack.pop()!;
    }
  }

  // Draw Walls
  const offsetX = padding;
  const offsetY = headerHeight + padding;

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.lineCap = 'square';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      const x = offsetX + c * cellSize;
      const y = offsetY + r * cellSize;

      ctx.beginPath();
      // Top (Open entry at top-left)
      if (cell.walls[0] && !(r === 0 && c === 0)) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellSize, y);
      }
      // Right
      if (cell.walls[1]) {
        ctx.moveTo(x + cellSize, y);
        ctx.lineTo(x + cellSize, y + cellSize);
      }
      // Bottom (Open exit at bottom-right)
      if (cell.walls[2] && !(r === rows - 1 && c === cols - 1)) {
        ctx.moveTo(x + cellSize, y + cellSize);
        ctx.lineTo(x, y + cellSize);
      }
      // Left
      if (cell.walls[3]) {
        ctx.moveTo(x, y + cellSize);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  // Start & End Labels
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IN', offsetX + cellSize / 2, offsetY - 6);
  ctx.fillText('OUT', offsetX + (cols - 0.5) * cellSize, offsetY + rows * cellSize + 15);

  return canvas;
}

export async function generateMazePrintable(): Promise<HTMLCanvasElement> {
  return generateMazeCanvas({ width: 15, height: 15, cellSize: 24 });
}
