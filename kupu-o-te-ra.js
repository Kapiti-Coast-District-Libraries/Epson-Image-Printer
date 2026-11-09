// Vercel serverless function: GET /api/kupu-o-te-ra
// Reads today's word from the kupu.maori.nz RSS feed and returns
// { word, translation, examples } for the Epson Image Printer app.

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’',
  ndash: '–', mdash: '—', hellip: '…', copy: '©',
};

function decode(s) {
  // Run twice: the feed double-encodes some entities (e.g. &amp;nbsp;)
  for (let i = 0; i < 2; i++) {
    s = s
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
      .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
  }
  return s;
}

const clean = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  try {
    const r = await fetch('https://kupu.maori.nz/feed.xml', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Epson Image Printer)' },
    });
    if (!r.ok) throw new Error(`Feed returned ${r.status}`);
    const xml = await r.text();

    const item = xml.match(/<item>([\s\S]*?)<\/item>/);
    if (!item) throw new Error('No item found in feed');

    const title = decode((item[1].match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').trim();
    const html = decode((item[1].match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '');

    const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1]);

    // First paragraph is "word: translation"
    const first = clean(paragraphs.shift() || '');
    const colon = first.indexOf(':');
    const word = colon > -1 ? first.slice(0, colon).trim() : title;
    const translation = colon > -1 ? first.slice(colon + 1).trim() : first;

    // Remaining paragraphs: each line (split on <br>) becomes one example line
    const examples = [];
    for (const p of paragraphs) {
      for (const line of p.split(/<br\s*\/?>/i)) {
        const text = clean(line);
        if (text) examples.push(text);
      }
    }

    res.status(200).json({ word: word || title, translation, examples });
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) });
  }
}
