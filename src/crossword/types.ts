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
   * Plain everyday description that a 9–10-year-old gets without looking anything up.
   * Normally just one, the clearest; if there are several they take turns.
   */
  easy: string[];
  /**
   * Optional playful wording for trickier days: a well-known saying with a blank, or a
   * simple double meaning. May be empty – most answers only need the plain clue.
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
