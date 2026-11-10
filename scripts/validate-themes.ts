/**
 * Validates crossword theme files.
 * Usage: npx tsx scripts/validate-themes.ts src/crossword/themes/ocean-creatures.ts [more files...]
 *        npx tsx scripts/validate-themes.ts            (validates every theme file)
 * When given particular files, it also lists answers that other themes already use.
 */
import { readdirSync } from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import type { Theme } from '../src/crossword/types';

const THEME_DIR = path.resolve(import.meta.dirname, '../src/crossword/themes');
const MIN_ENTRIES = 40;
const MIN_LEN = 3;
const MAX_LEN = 12;
const MAX_CLUE_CHARS = 70;

const normalise = (a: string) => a.replace(/[\s-]/g, '');

/** Problems with a single clue for an answer (shared with scripts/format-themes.ts). */
export function clueProblems(answer: string, clue: string): string[] {
  const out: string[] = [];
  if (!clue || !clue.trim()) return ['empty clue'];
  if (clue.length > MAX_CLUE_CHARS) out.push(`clue is ${clue.length} chars (max ${MAX_CLUE_CHARS}): "${clue}"`);
  if (/\(\d+([,-]\d+)*\)\s*$/.test(clue)) out.push(`clue should not include a letter count – it is added automatically: "${clue}"`);
  const lowerClue = clue.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  for (const word of answer.toLowerCase().split(/[\s-]+/)) {
    if (word.length >= 3 && new RegExp(`\\b${word}`).test(lowerClue)) out.push(`clue gives away the answer word "${word}": "${clue}"`);
  }
  return out;
}

async function loadTheme(file: string): Promise<Theme | undefined> {
  const mod = await import(pathToFileURL(path.resolve(file)).href);
  return mod.default;
}

async function validate(file: string): Promise<string[]> {
  const errors: string[] = [];
  const theme = await loadTheme(file);
  if (!theme) return [`no default export`];

  const expectedId = path.basename(file).replace(/\.ts$/, '');
  if (theme.id !== expectedId) errors.push(`id "${theme.id}" should match file name "${expectedId}"`);
  if (!theme.title?.trim()) errors.push('missing title');
  if (theme.title && theme.title.length > 28) errors.push(`title too long for receipt (${theme.title.length} > 28 chars)`);
  if (!Array.isArray(theme.entries)) return [...errors, 'entries is not an array'];
  if (theme.entries.length < MIN_ENTRIES) errors.push(`only ${theme.entries.length} entries (need ${MIN_ENTRIES}+)`);

  const seen = new Set<string>();
  let short = 0, long = 0;
  theme.entries.forEach((e, i) => {
    const tag = `#${i} ${e.answer}`;
    if (!/^[A-Z][A-Z \-]*[A-Z]$/.test(e.answer)) errors.push(`${tag}: answer must be UPPERCASE A–Z (spaces/hyphens allowed between words)`);
    const n = normalise(e.answer);
    if (n.length < MIN_LEN || n.length > MAX_LEN) errors.push(`${tag}: length ${n.length} outside ${MIN_LEN}-${MAX_LEN}`);
    if (seen.has(n)) errors.push(`${tag}: duplicate answer`);
    seen.add(n);
    if (n.length <= 5) short++;
    if (n.length >= 8) long++;

    for (const kind of ['easy', 'hard'] as const) {
      const list = e[kind];
      if (!Array.isArray(list) || !list.length) { errors.push(`${tag}: ${kind} must be a list of one or more clues`); continue; }
      if (new Set(list.map((c) => c.trim().toLowerCase())).size !== list.length) errors.push(`${tag}: repeated ${kind} clue`);
      for (const c of list) for (const p of clueProblems(e.answer, c)) errors.push(`${tag}: ${kind} ${p}`);
    }
    if (Array.isArray(e.easy) && Array.isArray(e.hard) && e.easy.some((c) => e.hard.includes(c))) errors.push(`${tag}: an easy and a hard clue are identical`);
  });
  if (short < 10) errors.push(`only ${short} short answers (≤5 letters) – need 10+ so grids interlock well`);
  if (long < 6) errors.push(`only ${long} long answers (8+ letters) – need 6+`);
  return errors;
}

/** Answers in `file` that other theme files also use (fine in moderation). */
async function sharedAnswers(file: string): Promise<string[]> {
  const theme = await loadTheme(file);
  if (!theme?.entries) return [];
  const others = new Map<string, string[]>();
  for (const f of readdirSync(THEME_DIR)) {
    if (!f.endsWith('.ts') || f === 'index.ts' || path.resolve(THEME_DIR, f) === path.resolve(file)) continue;
    const t = await loadTheme(path.join(THEME_DIR, f));
    for (const e of t?.entries ?? []) {
      const n = normalise(e.answer);
      others.set(n, [...(others.get(n) ?? []), f.replace(/\.ts$/, '')]);
    }
  }
  return theme.entries.filter((e) => others.has(normalise(e.answer))).map((e) => `${e.answer} (${others.get(normalise(e.answer))!.join(', ')})`);
}

async function main() {
  const named = process.argv.slice(2);
  const files = named.length
    ? named
    : readdirSync(THEME_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts').map((f) => path.join(THEME_DIR, f));
  let bad = 0;
  for (const f of files) {
    const errs = await validate(f);
    if (errs.length) {
      bad++;
      console.log(`✗ ${path.basename(f)}`);
      errs.forEach((e) => console.log(`    ${e}`));
    } else {
      console.log(`✓ ${path.basename(f)}`);
    }
    if (named.length) {
      const shared = await sharedAnswers(f);
      if (shared.length) console.log(`    note: ${shared.length} answers also in other themes: ${shared.join('; ')}`);
    }
  }
  console.log(`\n${files.length - bad}/${files.length} theme files valid`);
  process.exit(bad ? 1 : 0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) main();
