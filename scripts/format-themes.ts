/**
 * Rewrites theme files in the standard layout (and merges extra clue wordings).
 *
 *   npx tsx scripts/format-themes.ts                    reformat every theme file
 *   npx tsx scripts/format-themes.ts --merge extra.json add wordings from a JSON file
 *   npx tsx scripts/format-themes.ts --merge extra.json --dry   only report problems
 *
 * extra.json looks like:
 *   { "theme": "birds-of-aotearoa",
 *     "clues": { "KIWI": { "easy": ["…"], "hard": ["…"] }, … },
 *     "replace": [{ "answer": "KIWI", "kind": "easy", "old": "…", "new": "…" }] }
 * New wordings are appended after the existing ones (duplicates are skipped);
 * "replace" (optional) swaps an existing wording for a better one.
 */
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { clueProblems } from './validate-themes';

const THEME_DIR = path.resolve(import.meta.dirname, '../src/crossword/themes');

interface Loose { answer: string; easy: string | string[]; hard: string | string[] }
const list = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const q = (s: string) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

export function serialise(theme: { id: string; title: string; entries: Loose[] }): string {
  const entries = theme.entries.map((e) => [
    '    {',
    `      answer: ${q(e.answer)},`,
    `      easy: [${list(e.easy).map(q).join(', ')}],`,
    `      hard: [${list(e.hard).map(q).join(', ')}],`,
    '    },',
  ].join('\n'));
  return `import type { Theme } from '../types';

const theme: Theme = {
  id: ${q(theme.id)},
  title: ${q(theme.title)},
  entries: [
${entries.join('\n')}
  ],
};

export default theme;
`;
}

async function load(id: string) {
  const file = path.join(THEME_DIR, `${id}.ts`);
  const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
  return { file, theme: mod.default as { id: string; title: string; entries: Loose[] } };
}

async function main() {
  const args = process.argv.slice(2);
  const mergeAt = args.indexOf('--merge');
  const dry = args.includes('--dry');
  if (mergeAt >= 0) {
    const extra = JSON.parse(readFileSync(args[mergeAt + 1], 'utf8')) as {
      theme: string;
      clues: Record<string, { easy?: string | string[]; hard?: string | string[] }>;
      replace?: { answer: string; kind: 'easy' | 'hard'; old: string; new: string }[];
    };
    const { file, theme } = await load(extra.theme);
    const problems: string[] = [];
    const byAnswer = new Map(theme.entries.map((e) => [e.answer, e]));
    extra.clues ??= {};
    for (const answer of Object.keys(extra.clues)) if (!byAnswer.has(answer)) problems.push(`${answer}: not an answer in ${extra.theme}`);
    let added = 0;
    for (const r of extra.replace ?? []) {
      const e = byAnswer.get(r.answer);
      const have = e ? list(e[r.kind]) : [];
      const at = have.indexOf(r.old);
      if (!e || at < 0) { problems.push(`replace ${r.answer} ${r.kind}: no existing clue "${r.old}"`); continue; }
      clueProblems(r.answer, r.new).forEach((p) => problems.push(`${r.answer} ${r.kind}: ${p}`));
      have[at] = r.new.trim();
      e[r.kind] = have;
    }
    for (const e of theme.entries) {
      const more = extra.clues[e.answer];
      if (!more) { if (Object.keys(extra.clues ?? {}).length) problems.push(`${e.answer}: no new wordings given`); continue; }
      for (const kind of ['easy', 'hard'] as const) {
        const have = list(e[kind]);
        for (const c of list(more[kind])) {
          const clue = c.trim();
          if (!clue || have.some((h) => h.toLowerCase() === clue.toLowerCase())) { problems.push(`${e.answer} ${kind}: repeats an existing clue "${clue}"`); continue; }
          clueProblems(e.answer, clue).forEach((p) => problems.push(`${e.answer} ${kind}: ${p}`));
          have.push(clue);
          added++;
        }
        e[kind] = have;
      }
    }
    problems.forEach((p) => console.log(`  ! ${p}`));
    if (!dry) writeFileSync(file, serialise(theme));
    console.log(`${dry ? 'Would add' : 'Added'} ${added} wordings to ${extra.theme}, ${problems.length} problems`);
    return;
  }
  const ids = readdirSync(THEME_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts').map((f) => f.replace(/\.ts$/, ''));
  for (const id of ids) {
    const { file, theme } = await load(id);
    writeFileSync(file, serialise(theme));
  }
  console.log(`Formatted ${ids.length} theme files`);
}

main();
