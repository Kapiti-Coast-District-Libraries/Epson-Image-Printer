# Daily Crossword

Key **6** prints today's crossword. Everything is generated on the device: no internet needed.

## How it works

- **Same puzzle for everyone each day.** The date picks the theme and the difficulty, and seeds the layout.
- **Theme rotation.** Every theme is used once before any theme repeats, so each one comes round about every 3–4 months, with a different set of words and a different grid each time.
- **Difficulty by weekday.**

  | Level | Days | Clues |
  |---|---|---|
  | Easy | Mon, Tue, Sat | All plain clues |
  | Medium | Sun, Wed, Thu | About a third playful clues |
  | Tricky | Fri | About half playful clues |

- **Word rotation.** Each time a theme comes round it favours a different part of its word list, so the whole bank gets used and repeat visits feel fresh.
- **Clue rotation.** Each answer has several wordings that take turns, one per visit, so when a word does come back regulars get a clue they haven't seen.
- **Cross-theme memory.** Many answers live in more than one theme (OWL, MAP, GOLD). The generator steers away from answers that were probably in a puzzle in the last 30 days, whatever the theme.
- **Repair pass.** After building, the best grids are polished: words hanging on by a single crossing are swapped for words that cross two or more others.
- **Fair clueing.** Playful clues only go on answers that are at least half crossed by other words, so a stuck solver always has letters to lean on.
- **Bonus word.** Circled squares unscramble to an extra theme word. Its answer is printed on the next day's receipt, along with yesterday's solved grid.
- **Prepared in advance.** The app builds the day's puzzle in the background, so the button prints straight away.

## Adding or editing a theme

1. Copy an existing file in `themes/` (for example `pets.ts`) to `themes/<new-id>.ts`. Change the `id` to match the file name, and give it a title of 28 characters or fewer.
2. Write **at least 40 entries; 55–65 is better**. Mix the lengths: lots of 3–5 letter words (these make the grid interlock), plus some long ones of 8–12 letters.
3. Each entry has an answer and two lists of clues:
   - **`answer`**: capitals A–Z only, no macrons. Spaces are fine for two-word answers like `"SEA LION"`, which prints as (3,4).
   - **`easy`**: plain, direct clues that a 9-year-old could get. Aim for 3.
   - **`hard`**: playful clues (a pun, a fill-in-the-blank `___`, an "e.g."), but never more obscure than the easy ones. If the clue is a pun, end it with `?`. Aim for 2.
   - **Every clue:** takes a different angle from the others for that answer, never uses the answer word, and is 70 characters or fewer.
4. Run the checks:

```bash
npx tsx scripts/validate-themes.ts
```

```bash
npx tsx scripts/build-theme-index.ts
```

```bash
npx tsx scripts/test-crossword.ts 730
```

To tidy theme files into the standard layout, or merge extra wordings from a JSON file (see the comment at the top of the script):

```bash
npx tsx scripts/format-themes.ts
```

To preview a single day's puzzle in the terminal:

```bash
npx tsx scripts/test-crossword.ts 1 --show 2027-03-05
```

`scripts/analyse-crossword.ts` reports quality numbers: how many letters are crossed, square size, how often playful clues are used, and how often a regular would meet an answer (or the exact same clue) again.

**Note:** adding, removing or editing themes changes the puzzles for future dates. Past receipts are unaffected, but "yesterday's answers" on the first day after an update may not match a receipt printed before the update.
