export async function generateMaoriWordImage(): Promise<string> {
  let entry = FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)];

  try {
    // 1. Fetch the official RSS feed via AllOrigins proxy
    const feedUrl = 'https://kupu.maori.nz/feed.xml';
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
    const response = await fetch(proxyUrl);

    if (response.ok) {
      const data = await response.json();
      const parser = new DOMParser();
      
      // 2. Parse as XML rather than HTML
      const xmlDoc = parser.parseFromString(data.contents, 'application/xml');
      const latestItem = xmlDoc.querySelector('item');

      if (latestItem) {
        // Extract Title (e.g., "Aroha - Love, empathy")
        const rawTitle = latestItem.querySelector('title')?.textContent || '';
        
        // Extract Description HTML body (contains sentences & grammatical types)
        const rawDescription = latestItem.querySelector('description')?.textContent || '';
        const descDoc = parser.parseFromString(rawDescription, 'text/html');

        // Parse word vs English translation from title ("Word - Translation")
        const titleParts = rawTitle.split(' - ');
        const scrapedWord = titleParts[0]?.trim();
        const scrapedTrans = titleParts[1]?.trim() || '';

        // Extract example sentences from description paragraph tags
        const paragraphs = Array.from(descDoc.querySelectorAll('p'))
          .map(p => p.textContent?.trim())
          .filter(Boolean);

        if (scrapedWord) {
          entry = {
            word: scrapedWord,
            type: "Kupu o te Rā",
            translation: scrapedTrans,
            sentenceMaori: paragraphs[0] || entry.sentenceMaori,
            sentenceEnglish: paragraphs[1] || entry.sentenceEnglish
          };
        }
      }
    }
  } catch (err) {
    console.warn("Could not fetch live Kupu o te Rā feed; using fallback:", err);
  }

  // --- Thermal Receipt Rendering ---
  const width = 576;
  const height = 520;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(15, 15, width - 30, height - 30);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 30px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KUPU O TE RĀ', width / 2, 60);
  ctx.font = '16px monospace';
  ctx.fillText('kupu.maori.nz', width / 2, 85);

  ctx.beginPath();
  ctx.moveTo(35, 105);
  ctx.lineTo(width - 35, 105);
  ctx.stroke();

  ctx.font = 'bold 44px sans-serif';
  ctx.fillText(entry.word, width / 2, 165);

  if (entry.type) {
    ctx.font = 'italic 18px sans-serif';
    ctx.fillText(`(${entry.type})`, width / 2, 195);
  }

  ctx.font = 'bold 22px sans-serif';
  let currentY = wrapText(ctx, entry.translation, width / 2, 235, width - 80, 28);

  currentY += 20;
  ctx.beginPath();
  ctx.moveTo(60, currentY);
  ctx.lineTo(width - 60, currentY);
  ctx.lineWidth = 1;
  ctx.stroke();

  currentY += 30;
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('TAUIRA / EXAMPLE', width / 2, currentY);

  currentY += 30;
  ctx.font = 'italic 20px sans-serif';
  currentY = wrapText(ctx, `"${entry.sentenceMaori}"`, width / 2, currentY, width - 80, 26);

  currentY += 10;
  ctx.font = '18px sans-serif';
  wrapText(ctx, entry.sentenceEnglish, width / 2, currentY, width - 80, 24);

  return canvas.toDataURL('image/png');
}
