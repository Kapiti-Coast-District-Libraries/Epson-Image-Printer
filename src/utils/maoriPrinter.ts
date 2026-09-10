/**
 * Utility to fetch Kupu o te Rā (Māori Word of the Day)
 * and render a high-contrast receipt layout for thermal printing.
 */

// Curated fallbacks in case of offline boot or scraping structure changes
const FALLBACK_WORDS = [
  {
    word: "Aroha",
    type: "noun / verb",
    translation: "Love, empathy, compassion, affection.",
    sentenceMaori: "Kia tau te aroha me te rangimārie.",
    sentenceEnglish: "May love and peace prevail."
  },
  {
    word: "Kia Ora",
    type: "greeting / interjection",
    translation: "Hello, thank you, be well.",
    sentenceMaori: "Kia ora e hoa, kei te hoki koe ki whea?",
    sentenceEnglish: "Hello friend, where are you returning to?"
  },
  {
    word: "Whānau",
    type: "noun",
    translation: "Extended family, family group, community.",
    sentenceMaori: "Kia kaha te whānau i roto i ngā mahi.",
    sentenceEnglish: "Let the family stay strong in their endeavors."
  },
  {
    word: "Mārama",
    type: "verb / modifier",
    translation: "To be clear, understand, light, transparent.",
    sentenceMaori: "Kua mārama katoa ngā kōrero.",
    sentenceEnglish: "Everything that was said is now clear."
  }
];

export async function generateMaoriWordImage(): Promise<string> {
  // Pick a random default fallback
  let entry = FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)];

  try {
    // Proxy request through allorigins to bypass browser CORS restrictions
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://maoridictionary.co.nz/')}`;
    const response = await fetch(proxyUrl);
    
    if (response.ok) {
      const data = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');

      // Locate the Word of the Day container
      const wotdBlock = doc.querySelector('.word-of-the-day, #word-of-the-day, .kupu-o-te-ra, [class*="word-of-the-day"]');
      
      if (wotdBlock) {
        const scrapedWord = wotdBlock.querySelector('h3, h2, .word, .kupu')?.textContent?.trim();
        const scrapedTrans = wotdBlock.querySelector('.translation, .definition, p')?.textContent?.trim();
        
        if (scrapedWord && scrapedTrans) {
          entry = {
            word: scrapedWord,
            type: "Kupu o te Rā",
            translation: scrapedTrans,
            sentenceMaori: entry.sentenceMaori,
            sentenceEnglish: entry.sentenceEnglish
          };
        }
      }
    }
  } catch (err) {
    console.warn("Could not scrape live Word of the Day; using fallback word:", err);
  }

  // Render on 80mm Canvas (576px wide)
  const width = 576;
  const height = 520;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  // White Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Decorative Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(15, 15, width - 30, height - 30);

  // Title Header
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 30px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KUPU O TE RĀ', width / 2, 60);
  ctx.font = '16px monospace';
  ctx.fillText('Māori Word of the Day', width / 2, 85);

  // Line Divider
  ctx.beginPath();
  ctx.moveTo(35, 105);
  ctx.lineTo(width - 35, 105);
  ctx.stroke();

  // Word (Large)
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText(entry.word, width / 2, 165);

  // Type / Class
  if (entry.type) {
    ctx.font = 'italic 18px sans-serif';
    ctx.fillText(`(${entry.type})`, width / 2, 195);
  }

  // Definition / Translation
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

/**
 * Text wrapper function for HTML5 Canvas
 */
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
