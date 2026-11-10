import type { Theme } from '../types';

const theme: Theme = {
  id: 'words-and-grammar',
  title: 'Word Nerds',
  entries: [
    {
      answer: 'NOUN',
      easy: ['Naming word, like \'dog\' or \'Wellington\'', 'Word for a thing or a person, like \'cat\' or \'nurse\'', 'Word that names things, like \'kettle\' or \'Auckland\''],
      hard: ['Person, place or thing in grammar', 'Rhymes with \'town\', a naming word?'],
    },
    {
      answer: 'VERB',
      easy: ['Doing word, like \'run\' or \'jump\'', 'Word that changes to \'walked\' when it\'s yesterday', 'Word that tells you what someone does, like \'bake\''],
      hard: ['It might be irregular, like go and went', 'Action hero of the sentence'],
    },
    {
      answer: 'COMMA',
      easy: ['Punctuation for a short pause', 'Mark between items in a list, like \'apples, pears, plums\'', 'Little dot with a tail, sitting below the line'],
      hard: ['Tiny mark that splits up a list', 'Mark that\'s not a coma, just a short pause'],
    },
    {
      answer: 'COLON',
      easy: ['Two dots, one above the other', 'Punctuation that comes before a list or an explanation', 'Punctuation between hours and minutes, like 10:30'],
      hard: ['Two-dot mark; part of your gut', 'Ten ___ thirty, the time on the wall'],
    },
    {
      answer: 'DASH',
      easy: ['Short line used in writing, longer than a hyphen', 'Punctuation like a line, used to add a break in a sentence', 'Sprint, or a quick race over a short distance'],
      hard: ['Rush off', 'Mad ___ to catch the bus before it leaves'],
    },
    {
      answer: 'WORD',
      easy: ['Letters that make a unit of meaning', 'Group of letters with a space either side, like \'cat\'', 'Thing you look up in a dictionary'],
      hard: ['Promise, as in \'you have my ___\'', 'Spread the ___, tell your mates'],
    },
    {
      answer: 'PUN',
      easy: ['Joke using a word with two meanings', 'Silly joke that plays on a word sounding like another', 'Wordplay where \'dough\' sounds like \'doe\''],
      hard: ['Groan-worthy play on words', 'Sorry, that was a bit of a ___ intended'],
    },
    {
      answer: 'TENSE',
      easy: ['Past, present or future, for verbs', 'Verb form that shows when something happened', 'Feeling uptight, like a drum skin'],
      hard: ['Nervous; a verb\'s time zone', 'Sounds like a camp home, but a verb\'s time'],
    },
    {
      answer: 'VOWEL',
      easy: ['A, E, I, O or U', 'Letter that\'s not a consonant, like the \'e\' in \'bed\'', 'Open-mouthed sound letter, like the \'o\' in \'hot\''],
      hard: ['Letter you buy on some quiz shows', 'A-E-I-O-U letter, the five-strong gang every syllable needs?'],
    },
    {
      answer: 'RHYME',
      easy: ['Cat and hat do this', 'Words that sound the same at the end, like \'bell\' and \'shell\'', 'Poem\'s pattern of sounds that match, like \'bee\' and \'tree\''],
      hard: ['Moon does it with June', 'Shakespeare\'s sonnets do it, line after line?'],
    },
    {
      answer: 'IDIOM',
      easy: ['Saying like \'raining cats and dogs\'', 'Phrase where the meaning isn\'t in the words, like \'break a leg\'', 'Figure of speech like \'a piece of cake\', meaning something easy'],
      hard: ['Expression that doesn\'t mean what it says', 'Sounds like a silly person, but it\'s a phrase'],
    },
    {
      answer: 'SLANG',
      easy: ['Casual words like \'sweet as\'', 'Informal words kids use with their mates, like \'heaps\'', 'Chatty everyday words not in the dictionary, like \'arvo\''],
      hard: ['Informal lingo, like \'chur\' or \'sus\'', 'Chat that\'s cool in the playground, not in the school report'],
    },
    {
      answer: 'TYPO',
      easy: ['A mistake when typing', 'Wrong letter on a screen that spellcheck would catch', 'Letters swapped by accident when you type quickly'],
      hard: ['Fat-finger error on a keyboard', 'Oops, a keyboard slip: \'teh\' instead of \'the\''],
    },
    {
      answer: 'ROOT',
      easy: ['___ vegetable (carrot or beetroot, grown underground)', 'Plant part that soaks up water from the ground', 'Core of a word, with prefixes and suffixes stuck on'],
      hard: ['\'Happy\', inside \'unhappiness\'', 'Get to the ___ of the problem'],
    },
    {
      answer: 'PLURAL',
      easy: ['More than one, like \'mice\'', 'Form of a word for lots, like \'cats\' or \'boxes\'', 'Add an \'s\' to a word to show there are many'],
      hard: ['Geese, to goose', 'Two or more of something: the ___ form'],
    },
    {
      answer: 'ADVERB',
      easy: ['Word like \'quickly\' telling how something is done', 'Word that tells you where, when or how often, like \'here\' or \'often\'', 'Word that can describe a verb, like \'slowly\''],
      hard: ['Word often ending in -ly', 'Advertisement for a verb, as the name says'],
    },
    {
      answer: 'HYPHEN',
      easy: ['Short line joining words like \'well-known\'', 'Little joining mark, like the one in \'part-time\'', 'Punctuation that makes \'twenty-one\' from two words'],
      hard: ['Joiner in \'mother-in-law\'', 'Mark that lets \'well\' and \'known\' hold hands'],
    },
    {
      answer: 'PREFIX',
      easy: ['Bit added to the start of a word, like \'un\'', 'Little bit stuck on the front of a word, like \'dis\' or \'mis\'', 'Word part you put in front, like \'anti\' or \'co\''],
      hard: ['\'Re\' or \'pre\', for instance', 'Un- or dis-, stuck out front in a word'],
    },
    {
      answer: 'SUFFIX',
      easy: ['Bit added to the end, like \'-ing\'', 'Little bit tacked on the end, like \'-ed\' or \'-ful\'', 'Word part at the back, like \'-er\' in \'runner\''],
      hard: ['Tail on \'hopeful\' or \'kindness\'', 'Back-end bit that turns \'happy\' into \'happiness\''],
    },
    {
      answer: 'SIMILE',
      easy: ['Comparison using \'like\' or \'as\'', 'Phrase that says something is as brave as a lion', 'Saying like \'as cold as ice\' that compares two things'],
      hard: ['As busy as a bee, say', 'Sounds like a smile, but it\'s a comparison'],
    },
    {
      answer: 'CLICHE',
      easy: ['Overused saying', 'Tired old phrase that everyone has heard too many times', 'Phrase gone boring from repeating, like \'busy as a bee\''],
      hard: ['"Cool as a cucumber" and "quiet as a mouse", for example', 'Last year\'s joke, a stale ___'],
    },
    {
      answer: 'JARGON',
      easy: ['Special words used by experts', 'Technical words that baffle people outside a job', 'Complicated lingo that makes a simple idea sound fancy'],
      hard: ['Shop talk that outsiders don\'t get', 'Gobbledygook from the boardroom, \'circle back\' included'],
    },
    {
      answer: 'PRONOUN',
      easy: ['Word like \'she\', \'it\' or \'they\'', 'Little word like \'we\' or \'us\' used in place of names', 'Word like \'mine\', \'yours\' or \'ours\' that shows who owns something'],
      hard: ['Stand-in for a name', 'Stands in for \'Mrs Brown\', so it\'s \'she\' now'],
    },
    {
      answer: 'ANAGRAM',
      easy: ['Word made by mixing up another\'s letters', 'Word with letters rearranged to make a new one, like \'stop\' to \'pots\'', 'Trick word game: \'dog\' becomes \'god\''],
      hard: ['\'Silent\', made from \'listen\'', 'Rearrange \'dormitory\' and you get \'dirty room\''],
    },
    {
      answer: 'SYNONYM',
      easy: ['Word that means the same as another', 'Word like \'happy\' and \'glad\' that mean the same', 'Word swap that means the same: \'quick\' for \'fast\''],
      hard: ['\'Big\' is one for \'large\'', 'Thesaurus pal: \'say\' for \'speak\''],
    },
    {
      answer: 'ANTONYM',
      easy: ['Word that means the opposite', 'Word with the opposite meaning, like \'up\' and \'down\'', 'Word that means the reverse, like \'early\' and \'late\''],
      hard: ['\'Hot\' to \'cold\'', 'Stop and go: a pair of word opposites'],
    },
    {
      answer: 'ACRONYM',
      easy: ['Word made from first letters, like \'scuba\'', 'Word like \'laser\' or \'NASA\' made from first letters', 'Short form from first letters, said as one word, like \'radar\''],
      hard: ['ANZAC, for example', 'Jumble of capital letters, a short name for a long one'],
    },
    {
      answer: 'PROVERB',
      easy: ['Wise old saying', 'Short, old piece of advice, like \'early bird catches the worm\'', 'Traditional folk saying that teaches a lesson'],
      hard: ['Look before you leap, for one', 'A grandma\'s wisdom in a few words, \'better safe than sorry\''],
    },
    {
      answer: 'ARTICLE',
      easy: ['\'A\', \'an\' or \'the\' in grammar', 'Newspaper piece, or a word like \'the\'', 'Little word that goes before a noun, like \'a\' or \'an\''],
      hard: ['\'The\', e.g.', 'Written piece in the paper, a ___ of news'],
    },
    {
      answer: 'GRAMMAR',
      easy: ['Rules of a language', 'How words fit together to make sense in a sentence', 'Correct way to put words in order, like \'I am\' not \'I is\''],
      hard: ['Rules a stickler insists on', 'Your ___ is showing: a sentence that\'s off'],
    },
    {
      answer: 'CAPITAL',
      easy: ['Big letter at the start of a sentence', 'City where the government sits, like Wellington', 'Upper-case letter, like the \'T\' in \'Tauranga\''],
      hard: ['Wellington, to New Zealand', 'Big money in a business, the ___ investment'],
    },
    {
      answer: 'SYLLABLE',
      easy: ['Beat in a word; \'ba-na-na\' has three', 'Chunk of a word you clap out, like \'ba\' and \'na\' in \'banana\'', 'Each beat in a word, like \'el-e-phant\' with three'],
      hard: ['Haiku unit', 'Word-beat you can count on your hands?'],
    },
    {
      answer: 'METAPHOR',
      easy: ['Saying something IS something else', 'Figure of speech like \'she\'s a superstar\', not literal', 'Describes something as another thing, like \'the world\'s a stage\''],
      hard: ['\'Time is money\', for example', '\'You\'re my sunshine\', with no \'like\' or \'as\''],
    },
    {
      answer: 'SPELLING',
      easy: ['Putting letters in the right order', 'Getting every letter right in a word, like \'necessary\'', 'Skill at a school bee, with every letter in place'],
      hard: ['Bee subject?', 'Word-nerd\'s hobby, getting letters just right'],
    },
    {
      answer: 'SENTENCE',
      easy: ['Group of words ending in a full stop', 'Complete set of words that makes a statement', 'Words with a subject and a verb to make sense'],
      hard: ['Judge\'s ruling; a complete thought', 'Time behind bars, or a line of words in a book'],
    },
    {
      answer: 'ALPHABET',
      easy: ['A to Z', 'Set of 26 letters, in order', 'Song learnt in kindy, with 26 letters'],
      hard: ['ABC, and the rest', 'Things kids learn from A to Z, in a sing-song'],
    },
    {
      answer: 'FULL STOP',
      easy: ['Dot at the end of a sentence', 'Little dot that ends a statement', 'Dot you use after \'Dr\' and \'etc\''],
      hard: ['Period, to Americans', 'The end of the line for a sentence: put a ___'],
    },
    {
      answer: 'BRACKETS',
      easy: ['( ) marks', 'Curved marks used to add an extra thought in a sentence', 'Pair of curved punctuation, like the ones round a footnote'],
      hard: ['Shelf supports', 'Tax ___, or the supports holding up a shelf'],
    },
    {
      answer: 'ASTERISK',
      easy: ['Star-shaped mark *', 'Star-shaped symbol used in a password to hide letters', 'Symbol that looks like a tiny star with five or six spokes'],
      hard: ['Little star pointing to a footnote', 'Star that holds the footnote\'s place'],
    },
    {
      answer: 'ADJECTIVE',
      easy: ['Describing word, like \'red\' or \'tall\'', 'Word placed before a noun, like \'happy\' in \'happy dog\'', 'Word like \'smelly\' or \'slimy\' that tells you more about a thing'],
      hard: ['Word that modifies a noun', 'Shiny, bouncy or sneaky: words that spice up a name'],
    },
    {
      answer: 'CONSONANT',
      easy: ['Any letter that isn\'t a vowel', 'Hard-sounding letter, like the \'k\' in \'kite\'', 'The letter \'d\' in \'dog\' is one of these'],
      hard: ['B, C or D, for instance', 'Letters that are never the star, just sidekicks'],
    },
    {
      answer: 'PARAGRAPH',
      easy: ['Block of sentences on one idea', 'Section of writing that starts a new idea on a new line', 'Mini section of an essay, with its own topic sentence'],
      hard: ['Indented chunk of text', 'Writer\'s block-building unit'],
    },
    {
      answer: 'HOMOPHONE',
      easy: ['Sound-alike word, like \'see\' for \'sea\'', 'Words like \'two\' and \'too\' that sound alike but spell differently', 'Word with a twin that sounds identical, like \'knight\' and \'night\''],
      hard: ['\'Pair\' and \'pear\', for instance', 'Sun and son: a bright family pair'],
    },
    {
      answer: 'PALINDROME',
      easy: ['Word that reads the same backwards, like \'level\'', 'Word or phrase that reads the same both ways, like \'noon\'', '\'Mum\', \'dad\' or \'wow\': they read the same forward and back'],
      hard: ['Racecar or kayak, either way', 'Hannah\'s name, forward and backward'],
    },
    {
      answer: 'APOSTROPHE',
      easy: ['Mark in \'don\'t\' and \'Kiri\'s\'', 'Raised mark that shows letters are missing, like \'can\'t\'', 'Punctuation in \'I\'m\', \'we\'re\' or \'you\'ll\''],
      hard: ['Mark that shows something belongs', 'Greengrocer\'s ___ that spoils the plural'],
    },
    {
      answer: 'QUESTION MARK',
      easy: ['Punctuation at the end of a query', 'Hook-shaped symbol with a dot, ending a query', 'Symbol that goes at the end of \'Are you coming\''],
      hard: ['Curly squiggle meaning \'huh?\'', 'Dotted hook that turns a statement into a puzzle'],
    },
    {
      answer: 'ABBREVIATION',
      easy: ['Shortened word, like \'Dr\' for Doctor', 'Shortened form, like \'Ave\' for \'avenue\'', 'Short form for a long word, like \'Mon\' for \'Monday\''],
      hard: ['Ironically long word for a short form', 'ASAP is an ___, to save time'],
    },
    {
      answer: 'ALLITERATION',
      easy: ['Same starting sound, like \'silly snakes\'', 'Repeated first sounds in a line, like \'big bad bear\'', 'Tongue-twister trick: \'Sally sells sea shells\''],
      hard: ['Peter Piper\'s peppery tongue-twister trick', 'Bossy bears, big bunnies: same first sound, a writer\'s trick'],
    },
    {
      answer: 'ONOMATOPOEIA',
      easy: ['Word that sounds like its noise, like \'buzz\'', 'Words like \'crash\' or \'splat\' that copy the noise they make', 'Comic-book sound words like \'pow\' and \'zap\''],
      hard: ['Splash, bang and sizzle', 'Ka-ching! A word that makes the till sound'],
    },
  ],
};

export default theme;
