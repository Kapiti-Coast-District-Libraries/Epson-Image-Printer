/**
 * Wikipedia Live "On This Day" Thermal Generator
 * Endpoint: https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/{month}/{day}
 */

interface HistoryEvent {
  year: number;
  text: string;
}

// Helper to word-wrap canvas text cleanly
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, curY);
      line = words[n] + " ";
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, curY);
  return curY + lineHeight;
}

export async function generateHistoryImage(): Promise<string> {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  // 1. Fetch live events from Wikipedia's public API
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
  if (!res.ok) throw new Error("Failed to fetch Wikipedia history data");
  
  const data = await res.json();
  const events: HistoryEvent[] = data.events || [];

  // Pick 3-4 notable events spread across different eras
  const selectedEvents: HistoryEvent[] = [];
  if (events.length > 0) {
    const step = Math.max(1, Math.floor(events.length / 4));
    for (let i = 0; i < events.length && selectedEvents.length < 4; i += step) {
      selectedEvents.push(events[i]);
    }
  }

  // 2. Canvas Setup (576px wide for 80mm thermal dot grid)
  const canvas = document.createElement("canvas");
  const width = 576;
  const height = 780;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  // Fill White Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  // Top Header Bar
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, 12);

  ctx.font = "900 26px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ON THIS DAY IN HISTORY", width / 2, 50);

  const dateStr = now
    .toLocaleDateString("en-NZ", { month: "long", day: "numeric" })
    .toUpperCase();
  ctx.font = "700 14px monospace";
  ctx.fillText(`${dateStr} // WIKIPEDIA GAZETTE`, width / 2, 72);

  // Dashed Line
  ctx.beginPath();
  ctx.setLineDash([6, 4]);
  ctx.moveTo(30, 90);
  ctx.lineTo(width - 30, 90);
  ctx.stroke();
  ctx.setLineDash([]);

  // Render Historical Events
  let currentY = 120;
  ctx.textAlign = "left";

  selectedEvents.forEach((ev, idx) => {
    // Year Badge Box
    ctx.fillStyle = "#000000";
    ctx.fillRect(35, currentY - 14, 85, 24);

    ctx.font = "bold 14px monospace";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`YEAR ${ev.year}`, 42, currentY + 2);

    currentY += 24;

    // Event Description Body
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#000000";
    currentY = wrapText(ctx, ev.text, 35, currentY, width - 70, 20);

    // Separator between events
    if (idx < selectedEvents.length - 1) {
      currentY += 10;
      ctx.beginPath();
      ctx.strokeStyle = "#CCCCCC";
      ctx.lineWidth = 1;
      ctx.moveTo(35, currentY);
      ctx.lineTo(width - 35, currentY);
      ctx.stroke();
      ctx.strokeStyle = "#000000";
      currentY += 20;
    }
  });

  // Footer Section
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.setLineDash([6, 4]);
  ctx.moveTo(30, height - 55);
  ctx.lineTo(width - 30, height - 55);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = "italic 12px sans-serif";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.fillText("Source: Live Wikimedia REST API", width / 2, height - 30);

  ctx.fillRect(0, height - 12, width, 12);

  return canvas.toDataURL("image/png");
}
