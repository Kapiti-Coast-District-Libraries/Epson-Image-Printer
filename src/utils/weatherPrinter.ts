/**
 * Weather Thermal Receipt Generator
 * Uses Open-Meteo API (Free, No Key, No CORS issues)
 */

interface WeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

// Map WMO Weather Codes to Canvas Drawing Functions
function drawWeatherSymbol(ctx: CanvasRenderingContext2D, code: number, x: number, y: number, size: number) {
  ctx.save();
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const r = size / 2;
  const cx = x + r;
  const cy = y + r;

  // Clear / Sunny (0, 1)
  if (code <= 1) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
    ctx.stroke();
    // Sun rays
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const x1 = cx + Math.cos(angle) * (r * 0.65);
      const y1 = cy + Math.sin(angle) * (r * 0.65);
      const x2 = cx + Math.cos(angle) * (r * 0.9);
      const y2 = cy + Math.sin(angle) * (r * 0.9);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
  // Rain / Drizzle / Showers (51-67, 80-82)
  else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    // Cloud outline
    drawCloudShape(ctx, cx, cy - 6, r * 0.8);
    // Rain drops
    ctx.lineWidth = 2.5;
    for (let i = -1; i <= 1; i++) {
      const dropX = cx + i * 10 - 2;
      const dropY = cy + 12;
      ctx.beginPath();
      ctx.moveTo(dropX, dropY);
      ctx.lineTo(dropX - 3, dropY + 8);
      ctx.stroke();
    }
  }
  // Thunderstorm (95-99)
  else if (code >= 95) {
    drawCloudShape(ctx, cx, cy - 8, r * 0.8);
    // Lightning bolt
    ctx.beginPath();
    ctx.moveTo(cx + 2, cy + 4);
    ctx.lineTo(cx - 4, cy + 14);
    ctx.lineTo(cx + 1, cy + 14);
    ctx.lineTo(cx - 3, cy + 24);
    ctx.stroke();
  }
  // Snow (71-77, 85-86)
  else if (code >= 71 && code <= 77) {
    drawCloudShape(ctx, cx, cy - 6, r * 0.8);
    // Snow dots
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.arc(cx + i * 10, cy + 16, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // Cloudy / Overcast / Fog (2, 3, 45, 48)
  else {
    drawCloudShape(ctx, cx, cy, r * 0.9);
  }

  ctx.restore();
}

function drawCloudShape(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) {
  ctx.beginPath();
  ctx.arc(cx - scale * 0.35, cy + scale * 0.1, scale * 0.3, Math.PI * 0.7, Math.PI * 1.7);
  ctx.arc(cx - scale * 0.05, cy - scale * 0.2, scale * 0.35, Math.PI * 1.0, Math.PI * 2.0);
  ctx.arc(cx + scale * 0.35, cy + scale * 0.1, scale * 0.28, Math.PI * 1.3, Math.PI * 0.3);
  ctx.lineTo(cx - scale * 0.5, cy + scale * 0.38);
  ctx.closePath();
  ctx.stroke();
}

export async function generateWeatherImage(lat = -40.9006, lon = 175.0067, locationName = "PARAPARAUMU"): Promise<string> {
  // 1. Fetch 7-Day Forecast from Open-Meteo
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API request failed");
  const data = await res.json();
  const daily: WeatherData = data.daily;

  // 2. Setup Canvas (576px wide for high-density 80mm thermal canvas)
  const canvas = document.createElement("canvas");
  const width = 576;
  const height = 400;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  // Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  // Decorative Thermal Header
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, 12);

  ctx.font = "900 26px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("7-DAY WEATHER FORECAST", width / 2, 50);

  ctx.font = "700 14px monospace";
  ctx.fillText(`LOCATION: ${locationName.toUpperCase()}`, width / 2, 72);

  // Dashed Line
  ctx.beginPath();
  ctx.setLineDash([6, 4]);
  ctx.moveTo(30, 90);
  ctx.lineTo(width - 30, 90);
  ctx.stroke();
  ctx.setLineDash([]);

  // 3. Render 7 Days Horizontally
  const colWidth = (width - 40) / 7;
  const startX = 20;

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  for (let i = 0; i < 7; i++) {
    const colX = startX + i * colWidth;
    const date = new Date(daily.time[i] + "T00:00:00");
    const dayLabel = dayNames[date.getDay()];

    const maxTemp = Math.round(daily.temperature_2m_max[i]);
    const minTemp = Math.round(daily.temperature_2m_min[i]);
    const code = daily.weather_code[i];

    // Day Name Header
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(dayLabel, colX + colWidth / 2, 125);

    // Date subtext (e.g. 15/9)
    ctx.font = "11px monospace";
    ctx.fillText(`${date.getDate()}/${date.getMonth() + 1}`, colX + colWidth / 2, 142);

    // Draw Weather Symbol (48x48 box)
    drawWeatherSymbol(ctx, code, colX + (colWidth - 48) / 2, 160, 48);

    // Temperature High / Low
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`${maxTemp}°`, colX + colWidth / 2, 240);

    ctx.font = "14px monospace";
    ctx.fillText(`${minTemp}°`, colX + colWidth / 2, 262);

    // Vertical Separator Lines (between columns)
    if (i < 6) {
      ctx.beginPath();
      ctx.strokeStyle = "#E0E0E0";
      ctx.lineWidth = 1;
      ctx.moveTo(colX + colWidth, 110);
      ctx.lineTo(colX + colWidth, 275);
      ctx.stroke();
    }
  }

  // Footer Section
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.setLineDash([6, 4]);
  ctx.moveTo(30, 295);
  ctx.lineTo(width - 30, 295);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = "italic 13px sans-serif";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.fillText("Generated live via Open-Meteo Engine", width / 2, 330);

  ctx.fillRect(0, height - 12, width, 12);

  return canvas.toDataURL("image/png");
}
