import type { Theme } from '../types';

const theme: Theme = {
  id: 'greece-and-rome',
  title: 'Greece & Rome',
  entries: [
    {
      answer: 'ZEUS',
      easy: ['King of the Greek gods, who threw lightning', 'Father of many gods, who lived on Mount Olympus', 'Top god whose sacred bird is the eagle'],
      hard: ['Top god with a shocking temper?', 'Dad of the gods, who rains on everyone\'s parade?'],
    },
    {
      answer: 'ATHENA',
      easy: ['Greek goddess of wisdom, with an owl', 'Goddess of weaving, born fully grown from her father\'s head', 'Goddess who gave the first olive tree to a city'],
      hard: ['Wise goddess who gave her name to a capital', 'Brainy goddess who arrived fully dressed for battle?'],
    },
    {
      answer: 'APOLLO',
      easy: ['Greek god of music and light', 'Archer god with a bow, who also drove the sun', 'Sun god, twin brother of the moon goddess Artemis'],
      hard: ['God of music, and the missions that reached the Moon', 'Golden boy of the gods who never misses his mark?'],
    },
    {
      answer: 'POSEIDON',
      easy: ['Greek god of the sea, with a trident', 'Sea god who was also in charge of earthquakes', 'Bearded sea god with a golden palace under the waves'],
      hard: ['Ruler of the waves with a three-pronged fork', 'Earth-shaking god who\'s really rocking the boat?'],
    },
    {
      answer: 'HADES',
      easy: ['Greek god of the underworld', 'Ruler of the dead, whose three-headed dog guards the gates', 'God who owned a cap that made him invisible'],
      hard: ['Gloomy god who lives downstairs?', 'Who\'s the god that\'s always down in the dumps?'],
    },
    {
      answer: 'JUPITER',
      easy: ['Roman king of the gods, and the biggest planet', 'Largest planet, with a famous Great Red Spot', 'Planet with lots of moons, including Europa and Io'],
      hard: ['Giant planet named after the boss god', 'Jovial planet with a big red spot?'],
    },
    {
      answer: 'NEPTUNE',
      easy: ['Roman god of the sea, and a blue planet', 'Ice giant named after the sea god', 'Stormy planet, named after a god of the deep'],
      hard: ['Sea god, and the farthest planet from the Sun', 'Planet that\'s really out at sea?'],
    },
    {
      answer: 'MARS',
      easy: ['Roman god of war, and the red planet', 'Fourth planet from the Sun, with two small moons', 'Dusty planet explored by robot rovers'],
      hard: ['Chocolate bar; fourth planet', 'Red-faced god of war, or just a planet in a huff?'],
    },
    {
      answer: 'VENUS',
      easy: ['Roman goddess of love, and a bright planet', 'Hottest planet in our solar system, wrapped in thick clouds', 'Love goddess said to be born from sea foam'],
      hard: ['Love goddess, often seen as the evening star', 'Planet that\'s a real sweetheart of the night sky?'],
    },
    {
      answer: 'MERCURY',
      easy: ['Speedy messenger god, and the closest planet to the Sun', 'Planet with the shortest year, zooming round the Sun', 'God who wears winged sandals'],
      hard: ['Silver liquid in old thermometers', 'Fast-moving planet that\'s a real quicksilver?'],
    },
    {
      answer: 'OLYMPICS',
      easy: ['Sports games first held in ancient Greece', 'Big sports event that is hosted by a different city every few years', 'Sports festival held every four years, with a torch relay'],
      hard: ['Games with five rings and a flaming torch', 'Games that give you a gold-plated reason to run?'],
    },
    {
      answer: 'ATHENS',
      easy: ['Capital city of Greece', 'Home of the Parthenon, a city in Greece', 'Where the Acropolis rises above the city'],
      hard: ['Greek capital named after a wise goddess', 'Greek city that\'s the capital of big ideas?'],
    },
    {
      answer: 'ROME',
      easy: ['Capital city of Italy and the Roman Empire', 'City of seven hills, on the banks of the Tiber', 'Italian city where the Trevi Fountain splashes'],
      hard: ['It wasn\'t built in a day', 'Italian capital that\'s got its act together, Trevi and all?'],
    },
    {
      answer: 'TOGA',
      easy: ['Long sheet-like robe worn by Romans', 'Robe that senators wore in ancient Rome', 'Roman garment worn over a tunic'],
      hard: ['Bedsheet outfit for a fancy dress party', 'Roman robe that\'s a real wrap-up?'],
    },
    {
      answer: 'GLADIATOR',
      easy: ['Fighter who battled in a Roman arena', 'Armoured fighter who battled in the sand', 'Trained fighter who put on shows in the amphitheatre'],
      hard: ['Arena star, glad to have survived perhaps?', 'Fighter who was really a crowd-pleaser?'],
    },
    {
      answer: 'COLOSSEUM',
      easy: ['Huge ancient stadium in Rome', 'Oval landmark with arches, built by the Romans', 'Famous ancient building where fights were staged for crowds'],
      hard: ['Colossal Roman arena, now a ruin', 'Ancient stadium that\'s been around the block a few times?'],
    },
    {
      answer: 'ARENA',
      easy: ['Big space where crowds watch contests', 'Enclosed space in a stadium where the action happens', 'Ring-shaped sports ground for big crowds'],
      hard: ['Concert venue, for one', 'Sandy showdown spot, or a place for big crowds?'],
    },
    {
      answer: 'EMPEROR',
      easy: ['Ruler of the Roman Empire', 'Biggest penguin, found in the icy Antarctic', 'Ruler at the top of an empire, often crowned'],
      hard: ['Nero or Augustus, e.g.', 'Ruler whose new clothes were the talk of the town?'],
    },
    {
      answer: 'CAESAR',
      easy: ['Julius, the famous Roman leader', 'Roman general who crossed the Rubicon', 'Roman general who was made dictator for life'],
      hard: ['Salad with a Roman ring to it?', 'Veni, vidi, vici, and a salad to go?'],
    },
    {
      answer: 'HERCULES',
      easy: ['Super-strong hero of the myths', 'Hero who did twelve labours, including cleaning a stable', 'Demigod hero with a club and a lion-skin cloak'],
      hard: ['Strongman whose name now means a mighty effort', 'Strongman with a lot of heavy labour on his plate?'],
    },
    {
      answer: 'MEDUSA',
      easy: ['Woman with snakes for hair', 'Gorgon whom the hero Perseus outwitted', 'Snake-haired monster whose gaze turned people to stone'],
      hard: ['Snaky-haired woman who\'d leave you rock solid?', 'Hair-raising woman, but a real stone-cold beauty?'],
    },
    {
      answer: 'CYCLOPS',
      easy: ['Giant with one eye', 'One-eyed giant who lived in a cave, with lots of sheep', 'One-eyed monster that Odysseus outwitted'],
      hard: ['Giant with a single point of view?', 'Giant who\'s always got an eye on you?'],
    },
    {
      answer: 'MINOTAUR',
      easy: ['Half-bull monster in a maze', 'Creature with a bull\'s head that lived under Crete', 'Monster that Theseus faced in the labyrinth'],
      hard: ['Horned monster you\'d meet at a dead end?', 'Bull-headed beast who\'d be a bull in a china shop?'],
    },
    {
      answer: 'PEGASUS',
      easy: ['Winged horse of the Greek myths', 'Winged creature that became a constellation in the night sky', 'Flying steed tamed by the hero Bellerophon'],
      hard: ['Horse that never needed a road?', 'Horse with a flight plan, and no runway?'],
    },
    {
      answer: 'TROJAN HORSE',
      easy: ['Wooden animal full of hidden soldiers', 'Gift left at the gates of Troy, full of soldiers', 'Big wooden gift that the Greeks wheeled into a city'],
      hard: ['Gift you really shouldn\'t accept?', 'Gift with a sneaky agenda, and four hooves?'],
    },
    {
      answer: 'ACHILLES',
      easy: ['Greek hero with a weak heel', 'Hero who fought at Troy', 'Greek warrior whose mother dipped him in a magic river'],
      hard: ['Hero with a sore point at the back of his foot', 'Warrior who sulked in his tent for ages?'],
    },
    {
      answer: 'MARATHON',
      easy: ['Long running race, named after a Greek place', 'Famous 42-kilometre race on foot', 'Long-distance race that\'s 26 miles of running'],
      hard: ['Movie ___ (an all-day watch)', 'Race where you\'ll be running for ages, Greek-style?'],
    },
    {
      answer: 'TEMPLE',
      easy: ['Building where gods were worshipped', 'Sacred building on a hill, like the Parthenon', 'Holy building where people made offerings to a god'],
      hard: ['Holy building; side of the head', 'Holy building; a real pillar of the community?'],
    },
    {
      answer: 'COLUMN',
      easy: ['Tall stone pillar holding up a roof', 'Newspaper article written regularly by one writer', 'Vertical line of boxes in a spreadsheet'],
      hard: ['Pillar; up-and-down line in a table', 'Weekly writing spot, and a pillar of the paper?'],
    },
    {
      answer: 'SHIELD',
      easy: ['Soldier\'s round or square protector', 'Protective plate carried on the arm in battle', 'Emblem on a coat of arms, on the family crest'],
      hard: ['Something to hide behind in a battle', 'Captain America\'s favourite thing to hurl?'],
    },
    {
      answer: 'HELMET',
      easy: ['Metal hat with a crest on top', 'Head guard worn by a rider on a motorbike', 'Warrior\'s headgear with a feathery plume on top'],
      hard: ['Hard hat, ancient or for a bike', 'Hat that keeps your head on, quite literally?'],
    },
    {
      answer: 'SPEAR',
      easy: ['Long pole with a sharp tip', 'Throwing weapon with a pointed end on a long shaft', 'Javelin-like weapon used in old-time fights'],
      hard: ['Asparagus stalk', 'Long pole that really gets to the point?'],
    },
    {
      answer: 'CHARIOT',
      easy: ['Two-wheeled cart pulled by horses', 'Ancient war vehicle with two wheels, drawn by a team', 'Two-wheeled vehicle that raced round the Circus Maximus'],
      hard: ['Racing cart with real horsepower?', 'Cart that was a real wheel deal in ancient times?'],
    },
    {
      answer: 'ROADS',
      easy: ['Long straight routes built by Romans', 'Paved routes that Roman legions marched along', 'Route with lanes and white lines, for cars and buses'],
      hard: ['All ___ lead to Rome, so they say', 'Long paved ways that always lead somewhere?'],
    },
    {
      answer: 'BATHS',
      easy: ['Public pools where Romans washed', 'Tubs that you fill with bubbles and a rubber duck', 'Big tubs of hot water in a spa or public washhouse'],
      hard: ['What kids dodge at bedtime', 'Wet spots with a soap opera going on?'],
    },
    {
      answer: 'MOSAIC',
      easy: ['Picture made of tiny coloured tiles', 'Artwork built from tiny pieces of glass or stone', 'Floor picture made from many small tiles'],
      hard: ['Tile art, put together piece by piece', 'Art that\'s a real tile-ent?'],
    },
    {
      answer: 'VOLCANO',
      easy: ['Mountain that erupted over Pompeii', 'Mountain with a crater that spits out lava', 'Mountain that might blow its top, with smoke and ash'],
      hard: ['Hot-headed mountain?', 'Mountain with a blow-up in its past?'],
    },
    {
      answer: 'POMPEII',
      easy: ['Roman town buried by volcano ash', 'Ancient city ruins near Naples, in Italy', 'Italian ruins where you can walk along old streets'],
      hard: ['Ashy town frozen in time', 'Sleeping-beauty town, tucked under the ash?'],
    },
    {
      answer: 'LATIN',
      easy: ['Language of the ancient Romans', 'Language used for scientific names of animals and plants', 'Language behind words like \'agenda\' and \'data\''],
      hard: ['Language of \'Veni, vidi, vici\'?', 'Dead language with a lot of life in it?'],
    },
    {
      answer: 'NUMERALS',
      easy: ['Roman ___, like I, V and X', 'Number system that writes 4 as IV', 'Letters like M and C that stand for big numbers'],
      hard: ['Clock figures like XII', 'Cryptic-looking digits that make a clever puzzle?'],
    },
    {
      answer: 'ALPHABET',
      easy: ['Set of letters, named after Greek A and B', 'A-to-Z list of letters that we learn at school', 'Letters you sing in a song from kindergarten'],
      hard: ['Alpha plus beta, and the rest', 'Sing it from A to ___, and back to the start?'],
    },
    {
      answer: 'OLIVE',
      easy: ['Small fruit grown for its oil', 'Green or black fruit that goes on pizza', 'Tree with silver-green leaves that grows around the Mediterranean'],
      hard: ['___ branch, offered for peace', 'Pizza topping that\'s great in a peace-loving Greek salad?'],
    },
    {
      answer: 'SOLDIER',
      easy: ['Person who fights in an army', 'Uniformed guard marching in a parade at a palace', 'Member of an army who wears a uniform and marches'],
      hard: ['Toast strip for dipping in egg', 'Unknown ___, honoured with a tomb in Athens'],
    },
    {
      answer: 'THEATRE',
      easy: ['Place where plays are performed', 'Building with a stage, a curtain and rows of seats', 'Venue with a big red velvet curtain, for shows'],
      hard: ['Stage art the Greeks gave us, masks and all', 'Big drama venue, where the stars are on the bill?'],
    },
    {
      answer: 'DEMOCRACY',
      easy: ['People choosing their rulers by voting', 'Government where citizens vote in elections', 'Word from Greek roots meaning people power'],
      hard: ['People power, born in Athens', 'Ruling system where the box you tick decides?'],
    },
    {
      answer: 'EMPIRE',
      easy: ['Lots of lands ruled by one emperor', 'Kingdom that\'s gone big, with lots of conquered lands', 'Vast group of countries ruled from one capital'],
      hard: ['___ State Building', 'Huge realm with a lot of floors to it?'],
    },
    {
      answer: 'WOLF',
      easy: ['Animal said to have raised Rome\'s founders', 'Big bad animal in the story of Little Red Riding Hood', 'Wild pack hunter that howls at the moon'],
      hard: ['Twin-raising animal that howls', 'Big bad fellow in Grandma\'s bed?'],
    },
    {
      answer: 'MARBLE',
      easy: ['Smooth white stone used for statues', 'Stone the Parthenon was built from', 'Stone used for fancy kitchen bench tops and fireplaces'],
      hard: ['Statue stone; glass ball in a game', 'Playground ball of glass, or a rock with a shine?'],
    },
    {
      answer: 'MAZE',
      easy: ['Puzzle of twisting paths', 'Puzzle printed in kids\' activity books, a labyrinth of paths', 'Hedge-lined puzzle in a garden, where you can get lost'],
      hard: ['Monster\'s home full of dead ends', 'Corny field puzzle where you\'ll get lost?'],
    },
    {
      answer: 'MYTH',
      easy: ['Old story about gods and heroes', 'Tale that explains how the world began, told in ancient times', 'Made-up story that people once believed was true'],
      hard: ['Something a fact-checker busts', 'Tall tale that\'s a bit of a fairy-tale fib?'],
    },
  ],
};

export default theme;
