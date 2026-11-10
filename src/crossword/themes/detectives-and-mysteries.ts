import type { Theme } from '../types';

const theme: Theme = {
  id: 'detectives-and-mysteries',
  title: 'Whodunnit?',
  entries: [
    {
      answer: 'DETECTIVE',
      easy: ['Person who solves mysteries', 'Person who works out whodunnit', 'Plain-clothes officer who cracks cases'],
      hard: ['Private eye, e.g.', 'Poirot or Miss Marple, by trade'],
    },
    {
      answer: 'CLUE',
      easy: ['Hint that helps solve a mystery', 'Little hint pointing the way', 'A dropped glove at the scene, maybe'],
      hard: ['Each line in this crossword is one', 'Haven\'t got a ___ (no idea at all)'],
    },
    {
      answer: 'SUSPECT',
      easy: ['Person who might have done it', 'Person brought in for questioning', 'Have doubts about'],
      hard: ['Number one ___', 'Round up the usual ___s!'],
    },
    {
      answer: 'ALIBI',
      easy: ['Proof you were somewhere else', 'Excuse that shows you couldn\'t have done it', 'Story someone else must back up to clear your name'],
      hard: ['"I was home all night," for example', 'Cast-iron excuse?'],
    },
    {
      answer: 'MOTIVE',
      easy: ['Reason someone did the crime', 'Why someone did something', 'Reason behind a sneaky act'],
      hard: ['The why in a whodunnit', 'Ulterior ___ (a hidden reason)'],
    },
    {
      answer: 'EVIDENCE',
      easy: ['Things that prove what happened', 'Facts shown in court', 'What a lawyer shows the judge to prove a point'],
      hard: ['Proof bagged up at the scene', 'Exhibit A, for one'],
    },
    {
      answer: 'FINGERPRINT',
      easy: ['Swirly mark only you can leave when you touch glass', 'Pattern no two people share, left when you touch things', 'Mark that officers dust for with powder'],
      hard: ['Whorls and loops that give you away', 'Signature you leave without a pen?'],
    },
    {
      answer: 'LENS',
      easy: ['Glass in a magnifying glass', 'Curved glass in spectacles', 'Clear disc some people wear in their eye instead of glasses'],
      hard: ['Telephoto or zoom, e.g.'],
    },
    {
      answer: 'SLEUTH',
      easy: ['Another word for a detective', 'Nancy Drew or the Hardy Boys, for example', 'Someone who loves finding out whodunnit'],
      hard: ['Snoop who sniffs out the truth'],
    },
    {
      answer: 'SHERLOCK',
      easy: ['First name of the world\'s most famous detective', 'First name of the pipe-smoking genius of Baker Street', 'Enola\'s clever big brother, in the films'],
      hard: ['Holmes, to his friends'],
    },
    {
      answer: 'HOLMES',
      easy: ['Famous detective with a pipe and a funny hat', 'Violin-playing genius in a deerstalker hat', 'Enola\'s surname, in the films about her'],
      hard: ['Baker Street sleuth who sounds right at home?', 'Conan Doyle\'s genius of Baker Street'],
    },
    {
      answer: 'WATSON',
      easy: ['Doctor friend of Sherlock Holmes', 'Holmes\'s loyal sidekick and flatmate', 'Doctor who shares 221B Baker Street'],
      hard: ['Doctor told it was "elementary"', 'Emma who played Hermione'],
    },
    {
      answer: 'ELEMENTARY',
      easy: ['Very simple, as in "___, my dear Watson"', 'Very easy and basic', 'Kind of school for little kids in America'],
      hard: ['Basic, like the first lessons you learn', 'Easy-peasy, in Baker Street'],
    },
    {
      answer: 'MAGNIFIER',
      easy: ['Glass that makes small things look big', 'Hand-held glass for reading tiny print', 'Tool that makes a bug look huge'],
      hard: ['Sherlock Holmes\'s trusty glass for spotting tiny clues', 'Big-picture tool for tiny details?'],
    },
    {
      answer: 'INSPECTOR',
      easy: ['Police rank above sergeant', 'Person whose job is checking things carefully', 'Ticket ___ on the train'],
      hard: ['Rank for Gadget, the cartoon detective', 'Clouseau of The Pink Panther, for one'],
    },
    {
      answer: 'POLICE',
      easy: ['People who keep law and order', 'Force with cars that flash red and blue lights', 'Officers who catch criminals and keep the peace'],
      hard: ['The long arm of the law'],
    },
    {
      answer: 'MYSTERY',
      easy: ['Puzzle that needs solving', 'Something nobody can explain', 'Kind of book where you guess whodunnit'],
      hard: ['Whodunnit, e.g.', 'Scooby-Doo\'s van, the ___ Machine'],
    },
    {
      answer: 'HUNCH',
      easy: ['Feeling you have without proof', 'A guess you can\'t quite explain', 'Detective\'s feeling about a suspect, with no proof yet'],
      hard: ['Gut feeling?', 'Play a ___ (go with your gut)'],
    },
    {
      answer: 'WITNESS',
      easy: ['Person who saw what happened', 'See something happen', 'Person who swears to tell the truth in court'],
      hard: ['Eyes on the scene, called to court', '___ box, a courtroom stand'],
    },
    {
      answer: 'CULPRIT',
      easy: ['Person who did the crime', 'Person to blame', 'The one who broke the vase'],
      hard: ['Guilty party unmasked at the end', 'Answer to \'Whodunnit?\''],
    },
    {
      answer: 'THIEF',
      easy: ['Person who steals things', 'Pickpocket, for example', 'Person who takes what isn\'t theirs'],
      hard: ['Light-fingered villain', 'Like a ___ in the night (sneakily)'],
    },
    {
      answer: 'BURGLAR',
      easy: ['Robber who breaks into houses', 'Crook who might climb through a window at night', 'Reason to fit an alarm to your house'],
      hard: ['Night-time cat with a swag bag?', 'Uninvited guest who leaves with the telly?'],
    },
    {
      answer: 'ROBBER',
      easy: ['Crook who holds up a bank', 'Person who steals, maybe wearing a mask', 'Crook who shouts \'Hand over the money!\''],
      hard: ['One chased by cops in a playground game'],
    },
    {
      answer: 'HEIST',
      easy: ['Big daring robbery', 'Big planned theft by a gang', 'Film plot where a gang cracks a vault'],
      hard: ['Bank job in a caper film', 'Ocean\'s Eleven caper'],
    },
    {
      answer: 'DIAMOND',
      easy: ['Sparkling jewel that might be stolen', 'Hardest gem, clear and sparkly', 'Shape like a square standing on its corner'],
      hard: ['Card suit that\'s a jewel thief\'s dream', 'A girl\'s best friend, in the song'],
    },
    {
      answer: 'SAFE',
      easy: ['Strong metal box with a lock', 'Out of danger', 'Steel box with a combination dial'],
      hard: ['___ and sound', 'Play it ___ (take no risks)'],
    },
    {
      answer: 'KEY',
      easy: ['It opens a lock', 'Button you press when typing', 'List explaining the symbols on a map'],
      hard: ['Lock opener, or a piano note?', 'Low-___ (quiet and relaxed)'],
    },
    {
      answer: 'FOOTPRINT',
      easy: ['Mark left by a shoe in mud', 'Mark your bare sole leaves on wet sand', 'Shape a boot leaves in snow'],
      hard: ['Muddy trace by a flowerbed', 'Carbon ___ (your mark on the climate)'],
    },
    {
      answer: 'TRAIL',
      easy: ['Track of clues to follow', 'Path through the bush', 'Be losing in a game'],
      hard: ['It can go cold in a tricky case', 'Paper ___ (records that give you away)'],
    },
    {
      answer: 'DISGUISE',
      easy: ['Costume to hide who you are', 'Change how you look so no one knows you', 'Hide what something really is'],
      hard: ['Fake moustache and dark glasses', 'A blessing in ___'],
    },
    {
      answer: 'CODE',
      easy: ['Secret writing', 'Numbers you tap in to unlock a door', 'Instructions a computer follows'],
      hard: ['Morse ___', 'Dress ___ (rules on what to wear)'],
    },
    {
      answer: 'NOTEBOOK',
      easy: ['Little book a detective writes clues in', 'Book of blank pages for writing', 'Place for your homework or doodles'],
      hard: ['Spiral-bound place for jottings'],
    },
    {
      answer: 'BUTLER',
      easy: ['Servant who often gets blamed in mysteries', 'Servant who opens the door in a fancy house', 'Head servant who serves the drinks'],
      hard: ['He did it, in the old joke', 'Alfred\'s job at Wayne Manor'],
    },
    {
      answer: 'CRIME',
      easy: ['Something against the law', 'Wrongdoing punished by the courts', 'Shoplifting is one'],
      hard: ['Library genre full of whodunnits', 'Partners in ___ (best mates in mischief)'],
    },
    {
      answer: 'ARREST',
      easy: ['Take someone into police custody', 'What officers do when they catch a crook', 'Nab and take down to the station'],
      hard: ['Collar a crook', 'Under ___ (held by the police)'],
    },
    {
      answer: 'HANDCUFFS',
      easy: ['Metal rings that lock a prisoner\'s wrists', 'Things a magician escapes from', 'Pair of locking rings joined by a short chain'],
      hard: ['Bracelets nobody wants to wear?', 'Restraints you\'d rather not try on?'],
    },
    {
      answer: 'JAIL',
      easy: ['Prison', 'Building with bars on the windows', 'Lock up'],
      hard: ['Board game corner you\'d rather just visit', 'The clink or the slammer'],
    },
    {
      answer: 'JURY',
      easy: ['Twelve people who decide guilty or not', 'Group in a court who decide the verdict', 'Panel judging a show or prize'],
      hard: ['Trial by ___ (twelve ordinary citizens decide)', 'Hung ___ (one that can\'t agree)'],
    },
    {
      answer: 'GUILTY',
      easy: ['Opposite of innocent', 'Being the one who did it', 'Feeling bad about something you did'],
      hard: ['How you feel after eating the last biscuit', '___ pleasure (a naughty little treat)'],
    },
    {
      answer: 'CONFESS',
      easy: ['Admit that you did it', 'Own up', 'Say sorry and tell the truth'],
      hard: ['Come clean', 'Spill the beans about yourself'],
    },
    {
      answer: 'SOLVE',
      easy: ['Work out the answer', 'Figure out a riddle', 'Do a sum and get the answer'],
      hard: ['Crack the case', 'What you\'re doing to this grid'],
    },
    {
      answer: 'BLOODHOUND',
      easy: ['Dog with a great nose for tracking', 'Dog with long ears and a wrinkly face', 'Big floppy-eared dog used to find lost people'],
      hard: ['Droopy-eared sniffer on the trail', 'Nose for trouble, on four legs?'],
    },
    {
      answer: 'DNA',
      easy: ['Tiny code found in a hair or a drop of spit', 'Stuff in your cells passed down from your parents', 'What genes are made of'],
      hard: ['Double-helix evidence', 'It\'s in your genes?'],
    },
    {
      answer: 'SPY',
      easy: ['Secret agent', 'Catch sight of', 'James Bond, for one'],
      hard: ['I ___ with my little eye', 'Undercover mole'],
    },
    {
      answer: 'PUZZLE',
      easy: ['Problem to work out', 'Brain-teaser like a sudoku', 'Jigsaw, crossword and sudoku are all this kind of challenge'],
      hard: ['Jigsaw or crossword?', 'Rubik\'s Cube, e.g.'],
    },
    {
      answer: 'SECRET',
      easy: ['Something hidden from others', 'Something you promise not to tell', 'Hidden, like a ___ door'],
      hard: ['Hush-hush thing, best kept', 'Top ___ (classified)'],
    },
    {
      answer: 'MISSING',
      easy: ['Lost and can\'t be found', 'Not where it should be', 'Wishing someone who\'s away was here'],
      hard: ['Like the last jigsaw piece, always?', 'Like one sock after the wash?'],
    },
    {
      answer: 'INVESTIGATE',
      easy: ['Look into something carefully', 'Check out a strange noise, say', 'Try to work out what really happened'],
      hard: ['Dig into the facts', 'Get to the bottom of'],
    },
  ],
};

export default theme;
