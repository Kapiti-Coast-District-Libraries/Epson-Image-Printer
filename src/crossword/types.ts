/**
 * A single word in a theme's word bank.
 *
 * `answer` may contain spaces or hyphens for multi-word answers (e.g. "SEA LION");
 * these are stripped in the grid and shown as an enumeration like (3,4) after the clue.
 * Letters must be plain A–Z (no macrons) – put macrons in the clue text if wanted.
 */
export interface ClueEntry {
  answer: string;
  /**
   * Plain everyday descriptions – kids should get most of these. Each wording takes a
   * different angle on the answer; they take turns each time the theme comes round,
   * so regulars meet a new clue even when a word repeats.
   */
  easy: string[];
  /**
   * Playful wordings for trickier days: a pun, double meaning or sideways hint built on
   * everyday knowledge. Never more obscure than the easy clues – nothing to look up.
   */
  hard: string[];
}

export interface Theme {
  /** kebab-case id, matches the file name. */
  id: string;
  /** Title printed on the receipt, e.g. "Birds of Aotearoa". */
  title: string;
  entries: ClueEntry[];
}
