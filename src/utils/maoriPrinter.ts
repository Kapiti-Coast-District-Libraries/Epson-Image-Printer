export async function generateMaoriWordImage(): Promise<string> {
  // 1. Fetch live feed through CORS proxy
  const feedUrl = 'https://kupu.maori.nz/feed.xml';
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
  
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error(`Proxy HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  if (!data.contents) {
    throw new Error('Received empty response payload from proxy');
  }

  // 2. Parse XML Feed
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
  
  // Check for XML parsing errors
  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    throw new Error(`XML Parsing failed: ${parseError.textContent}`);
  }

  const latestItem = xmlDoc.querySelector('item');
  if (!latestItem) {
    throw new Error('No <item> elements found in RSS feed');
  }

  // 3. Extract Fields
  const rawTitle = latestItem.querySelector('title')?.textContent || '';
  const rawDescription = latestItem.querySelector('description')?.textContent || '';

  // Title format on kupu.maori.nz RSS: "Māori Word - English Translation"
  const titleParts = rawTitle.split(' - ');
  const word = titleParts[0]?.trim();
  const translation = titleParts.slice(1).join(' - ').trim(); // handles translations containing hyphens

  if (!word) {
    throw new Error(`Could not parse target word from title string: "${rawTitle}"`);
  }

  // Parse HTML stored inside RSS description node
  const descDoc = parser.parseFromString(rawDescription, 'text/html');
  const paragraphs = Array.from(descDoc.querySelectorAll('p, div'))
    .map(el => el.textContent?.trim())
    .filter((text): text is string => Boolean(text && text.length > 0));

  // Extract Sentences (Paragraph 1 = Māori, Paragraph 2 = English)
  const sentenceMaori = paragraphs[0] || '';
  const sentenceEnglish = paragraphs[1] || '';

  const entry = {
    word,
    type: "Kupu o te Rā",
    translation,
    sentenceMaori,
    sentenceEnglish
  };

  // 4. Render Thermal Receipt Canvas (576px / 80mm)
  const width = 576;
  const height = 520;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(15, 15, width - 30, height - 30);

  // Title Header
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 30px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KUPU O TE RĀ', width / 2, 60);
  ctx.font = '16px monospace';
  ctx.fillText('kupu.maori.nz', width / 2, 85);

  // Divider
  ctx.beginPath();
  ctx.moveTo(35, 105);
  ctx.lineTo(width - 35, 105);
  ctx.stroke();

  // Primary Word
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText(entry.word, width / 2, 165);

  if (entry.type) {
    ctx.font = 'italic 18px sans-serif';
    ctx.fillText(`(${entry.type})`, width / 2, 195);
  }

  // Translation
  ctx.font = 'bold 22px sans-serif';
  let currentY = wrapText(ctx, entry.translation, width / 2, 235, width - 80, 28);

  // Divider Line
  currentY += 20;
  ctx.beginPath();
  ctx.moveTo(60, currentY);
  ctx.lineTo(width - 60, currentY);
  ctx.lineWidth = 1;
  ctx.stroke();

  // Example Section
  if (entry.sentenceMaori) {
    currentY += 30;
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('TAUIRA / EXAMPLE', width / 2, currentY);

    currentY += 30;
    ctx.font = 'italic 20px sans-serif';
    currentY = wrapText(ctx, `"${entry.sentenceMaori}"`, width / 2, currentY, width - 80, 26);

    if (entry.sentenceEnglish) {
      currentY += 10;
      ctx.font = '18px sans-serif';
      wrapText(ctx, entry.sentenceEnglish, width / 2, currentY, width - 80, 24);
    }
  }

  return canvas.toDataURL('image/png');
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}
