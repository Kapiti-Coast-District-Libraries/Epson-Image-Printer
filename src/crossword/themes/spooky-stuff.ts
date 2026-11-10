import type { Theme } from '../types';

const theme: Theme = {
  id: 'spooky-stuff',
  title: 'Spooky Stuff',
  entries: [
    {
      answer: 'GHOST',
      easy: ['Pale spirit that floats and wails', 'Floaty spirit that haunts old houses', 'Pale figure drifting in a sheet'],
      hard: ['Sheet with eyes that floats about?', 'Hard-to-catch spirit that gives you a fright?'],
    },
    {
      answer: 'BAT',
      easy: ['Winged creature that flies at night', 'Nocturnal mammal that uses echoes', 'Flying mammal, not a bird'],
      hard: ['Upside-down fellow in a cave?', 'Cricket gear, or a night flier?'],
    },
    {
      answer: 'OWL',
      easy: ['Night bird with big round eyes', 'Bird that hoots in the night', 'Wise-looking bird that hunts mice at night'],
      hard: ['Night bird that is a wise guy?', 'Silent night flier with a face like a satellite dish?'],
    },
    {
      answer: 'BOO',
      easy: ['Spooky shout to give someone a fright', 'Ghostly sound that makes you jump', 'Halloween shout, a short and sudden noise'],
      hard: ['Ghostly greeting that makes the sleepover squeal?', 'Three-letter scare, with a wiggle of the sheet?'],
    },
    {
      answer: 'WITCH',
      easy: ['Cackling character in a pointy hat', 'Spellcaster who stirs a bubbling pot', 'Pointy-hatted spellcaster in stories'],
      hard: ['Pointy-hat wearer who is always in a stew?', 'Hex-ing pal who is a bit of a wicked cook?'],
    },
    {
      answer: 'BROOM',
      easy: ['Sweeping tool with bristles', 'Witch\'s flying vehicle in fairy tales', 'Long-handled sweeper, good for flying'],
      hard: ['Sweeper with a secret sky-ride?', 'What Quidditch players ride, and cleaners sweep with?'],
    },
    {
      answer: 'CAPE',
      easy: ['Cloak tied at the neck, like a superhero', 'Superhero\'s flowing back garment, or a headland?', 'Sleeveless cloak, like Dracula wears'],
      hard: ['Dracula\'s ___, in a fancy-dress shop?', 'Dramatic swish of fabric, as a hero flies?'],
    },
    {
      answer: 'MASK',
      easy: ['Face covering for a costume', 'Something you wear over your eyes at a party', 'Scary face worn for dressing up'],
      hard: ['Face hider at a fancy party?', 'Dress-up face-changer?'],
    },
    {
      answer: 'TRICK',
      easy: ['Prank played to fool someone', 'Magic act that fools the eye', 'What a dog learns when it learns to roll over'],
      hard: ['Halloween\'s sneaky option at the door?', 'Sly fool-around, the other half of a choice?'],
    },
    {
      answer: 'TREAT',
      easy: ['Sweet goodie handed out at Halloween', 'Yummy snack, a special bite', 'Something sweet you get at the door'],
      hard: ['Trick or ___, shouted at a Halloween door', 'Something yummy that you did not have to earn?'],
    },
    {
      answer: 'CANDY',
      easy: ['Sweets, or lollies, in a bag', 'Chewy or sour sugar bits', 'Sugary bits in a spooky bag'],
      hard: ['Something sweet that gets sorted by kids on the floor?', 'Sweet stash for a midnight feast?'],
    },
    {
      answer: 'FANGS',
      easy: ['Long pointy teeth, like a vampire\'s', 'Sharp teeth of a wolf or snake', 'Long pointy teeth in a costume'],
      hard: ['Pointy chompers, in a fake smile?', 'Dress-up teeth, a bit of plastic?'],
    },
    {
      answer: 'SPOOKY',
      easy: ['Like a Halloween party full of ghosts and cobwebs', 'Scary and ___: the skeletons in a Halloween song', 'Halloween adjective that rhymes with "kooky"'],
      hard: ['Word for a ghost-train ride that\'s chilling but fun?', 'Frightful fun, with a wobbly wail?'],
    },
    {
      answer: 'CRYPT',
      easy: ['Underground chamber for coffins', 'Stone burial room in a church', 'Vault under a church'],
      hard: ['Grave spot, but more of a cellar?', 'Spooky basement in a church, where coffins sleep?'],
    },
    {
      answer: 'MUMMY',
      easy: ['Wrapped-up body from ancient Egypt', 'Bandaged figure from an old pyramid tomb', 'Pharaoh-era body wrapped in linen'],
      hard: ['Dressed for Halloween in bandages, from head to toe?', 'Bandaged-up parent, in a spooky tale?'],
    },
    {
      answer: 'HAT',
      easy: ['Tall pointy headwear, often black', 'Brimmed headwear you put on your head', 'Headwear that is tall and pointy'],
      hard: ['Witch\'s headgear, the worst for a bad hair day?', 'Thing you tip to say hello?'],
    },
    {
      answer: 'IMP',
      easy: ['Little mischievous devil', 'Tiny naughty sprite', 'Cheeky little mischief-maker'],
      hard: ['Little pest with horns and a tail?', 'Mischief-maker that is small and sly?'],
    },
    {
      answer: 'RAVEN',
      easy: ['Large black bird that croaks', 'Glossy black crow-like bird', 'Black bird that says \'nevermore\''],
      hard: ['Black bird with a job guarding a famous London tower?', 'Poe\'s feathered friend?'],
    },
    {
      answer: 'EERIE',
      easy: ['Strange and spooky, creepy', 'Mysteriously unsettling, like a fog-bound lane', 'What a ghost story sounds like in the dark'],
      hard: ['Creepy as a tingle up your back?', 'Spooky and creaky, in a whisper?'],
    },
    {
      answer: 'OGRE',
      easy: ['Huge, ugly monster in a fairy tale', 'Giant grump in a story like Shrek', 'Hulking giant that loves a good swamp'],
      hard: ['A loveable monster with green skin and an onion-y smell?', 'Fairy-tale monster that\'s a bit of a grumpy boss?'],
    },
    {
      answer: 'TOAD',
      easy: ['Amphibian blamed for giving people warts, in old stories', 'Warty frog-like creature', 'Croaker that hops on land'],
      hard: ['Warty fellow in a spooky pot?', 'Hopper that\'s not a frog, you say?'],
    },
    {
      answer: 'COBWEB',
      easy: ['Dusty old web in a corner', 'Fluffy old web strung across a ceiling', 'Silky web gathering dust in the attic'],
      hard: ['Ceiling decoration that has never been dusted?', 'Silky hammock that a spider leaves behind?'],
    },
    {
      answer: 'GRAVEYARD',
      easy: ['Cemetery where ghosts might wander', 'Burial ground in a spooky story', 'Place of headstones and graves'],
      hard: ['Spooky spot for resting in peace?', 'Ghosts\' neighbourhood, with headstones?'],
    },
    {
      answer: 'TOMBSTONE',
      easy: ['Arizona\'s "town too tough to die"', 'Wild West film of 1993 starring Kurt Russell', 'Marker named after a crypt, standing in a cemetery'],
      hard: ['Wild West town of the O.K. Corral gunfight', 'Cemetery\'s upright slab, named for a burial vault?'],
    },
    {
      answer: 'SCARECROW',
      easy: ['Straw man on a stick that scares crows', 'Figure in a field, stuffed with straw', 'Straw figure on a pole in a field'],
      hard: ['Field guard in a hat, with a grin of straw?', 'Straw man who is a bit of a fright?'],
    },
    {
      answer: 'WEREWOLF',
      easy: ['Monster that turns into a wolf at night', 'Wolf-like person in old movies', 'Monster that changes shape under the moon'],
      hard: ['Hairy shape-shifter who is a man some nights?', 'Moon-howling fellow who needs a shave on full moon?'],
    },
    {
      answer: 'BLACK CAT',
      easy: ['Sleek dark pet with a bushy tail', 'Dark pet that is said to bring bad luck', 'Dark feline with a yellow-eyed stare'],
      hard: ['Sneaky feline in a dark cloak?', 'Unlucky pet that crosses your path?'],
    },
    {
      answer: 'FULL MOON',
      easy: ['Night when the sky lamp is a complete circle', 'Lunar disc that looks round and bright', 'Night sky with a round, glowing disc all lit up'],
      hard: ['Night when wolves love to sing?', 'The sky\'s roundest spotlight, once a month?'],
    },
    {
      answer: 'MIDNIGHT',
      easy: ['Twelve o\'clock at night', 'Dead of night, the middle of the night', 'Time when the clock strikes twelve at night'],
      hard: ['Cinderella\'s coach-turning hour?', 'Hour when things go bump in the night?'],
    },
    {
      answer: 'HALLOWEEN',
      easy: ['Spooky October night full of sweets and fun', 'Festival on the 31st of October', 'Night of dressing up and going door to door'],
      hard: ['Night when all the creepy critters come out?', 'Night a gourd wears a grinning face?'],
    },
    {
      answer: 'SKELETON',
      easy: ['Bony frame that holds up your body', 'Set of bones inside a body', 'Bony figure with no skin'],
      hard: ['Closet occupant that rattles its bones?', 'Bones with no body to hold them?'],
    },
    {
      answer: 'CAULDRON',
      easy: ['Big metal pot for bubbling brews', 'Huge pot that sits on a fire', 'Pot for a witch to stir'],
      hard: ['Stirring pot for a spooky stew?', 'Pot that is always on the boil?'],
    },
    {
      answer: 'PUMPKIN',
      easy: ['Big orange gourd that is carved into a face', 'Round orange veg, often carved', 'Orange squash with a stalk'],
      hard: ['Turned into a coach, once upon a time?', 'Glowing face on a doorstep, made from a squash?'],
    },
    {
      answer: 'LANTERN',
      easy: ['Light with a glass case, carried at night', 'Carry-light that flickers in the dark', 'Lamp you carry on a stick'],
      hard: ['Jack-o\'-___', 'Glowing gourd, or a light to carry?'],
    },
    {
      answer: 'SPIDER',
      easy: ['Eight-legged creepy-crawly that spins silk', 'Arachnid that spins a web in a corner', 'Eight-legged creature, not an insect'],
      hard: ['Eight-legged party guest that loves webs?', 'Itsy-bitsy climber up the water spout?'],
    },
    {
      answer: 'GOBLIN',
      easy: ['Mischievous little creature in folk tales', 'Grumpy pointy-eared creature in stories', 'Little green creature in fairy tales'],
      hard: ['Little monster with a grubby grin?', 'Gobbling creature, or a goblet fan?'],
    },
    {
      answer: 'MONSTER',
      easy: ['Big scary creature from a story', 'Frankenstein\'s creation, for one', 'Huge creature that frightens people in films'],
      hard: ['Cookie ___, the fluffy blue biscuit fan?', 'What\'s under the bed when the light goes out?'],
    },
    {
      answer: 'SHADOW',
      easy: ['Dark shape cast by a body in the light', 'Dark outline on a wall', 'Shape made when light is blocked'],
      hard: ['Dark follower that copies your every move?', 'Spooky outline that is never far away?'],
    },
    {
      answer: 'SCREAM',
      easy: ['What you do on a roller-coaster\'s big drop', 'Cry out in fright, in a haunted house', 'Munch\'s famous painting of a figure holding its face'],
      hard: ['Ice-cream sounds that shout?', 'Loud cry from a horror movie?'],
    },
    {
      answer: 'HOWL',
      easy: ['Long, sad cry of a wolf', 'Loud wail a wolf makes at the moon', 'Long cry, like a dog at the moon'],
      hard: ['Wolf\'s big moan, a wild call?', 'Sound a dog makes when the siren wails?'],
    },
    {
      answer: 'SPIRIT',
      easy: ['Ghostly soul that floats about', 'Part of a person that lives on after death', 'Ethereal figure that drifts around'],
      hard: ['Ghostly soul with a lively mood?', 'Ghost, or the zest you show for the team?'],
    },
    {
      answer: 'SHIVER',
      easy: ['Quick trembling from cold or fear', 'Shake all over when you are chilly', 'Tremble with a sudden chill'],
      hard: ['Pirate\'s "Aye, ___ me timbers!"', 'Chilly wobble from a bedtime story?'],
    },
    {
      answer: 'SPELL',
      easy: ['Magic words a witch chants', 'Magic charm, like a curse', 'Words that work magic, in fairy tales'],
      hard: ['Witch\'s chant that\'s cast with a wand?', 'Something a sorcerer casts, in a story?'],
    },
    {
      answer: 'POTION',
      easy: ['Magic drink a witch brews', 'Liquid in a bottle that works magic', 'Magic brew, bubbling in a pot'],
      hard: ['Witch\'s cuppa, but not for tea?', 'Mixed-up magic in a flask, with a fizz?'],
    },
    {
      answer: 'MAGIC',
      easy: ['Wizard\'s special power', 'Spell-casting, wand-waving power', 'Mysterious power that turns frogs into princes'],
      hard: ['Something wizards have up their sleeves?', 'Abracadabra, the word that makes things appear?'],
    },
    {
      answer: 'WIZARD',
      easy: ['Spell-caster with a long beard', 'Magician with a pointy hat and wand', 'Powerful spellcaster in a story'],
      hard: ['Spell-caster who\'s a bit of a whizz?', 'Bearded fellow who might have a staff and a secret?'],
    },
    {
      answer: 'GOOSEBUMPS',
      easy: ['Tiny bumps on your skin when scared', 'Bumps that rise on your arms when you shiver', 'Prickly skin from a spooky story'],
      hard: ['Spooky bumps, but not on a bird?', 'Skin\'s way of saying \'brrr\'?'],
    },
    {
      answer: 'CARVE',
      easy: ['Cut a face into a pumpkin', 'Cut shapes out of wood or stone', 'Slice a roast at the dinner table'],
      hard: ['Scoop and ___ a jack-o-lantern', 'What you do to a turkey, and a pumpkin too?'],
    },
    {
      answer: 'CHOCOLATE',
      easy: ['Sweet brown treat made from cocoa beans', 'Brown sweet that melts in your mouth', 'Brown bar that melts on a hot day'],
      hard: ['Willy Wonka\'s speciality?', 'Melts in your mouth, and in your hands?'],
    },
    {
      answer: 'TOFFEE',
      easy: ['Chewy caramel sweet', 'Gooey brown sweet that sticks to your teeth', 'Sticky, buttery sweet'],
      hard: ['Sticky sweet on a stick at the fair?', 'Spooky sweet that\'s crunchy and makes your jaw ache?'],
    },
    {
      answer: 'APPLE',
      easy: ['Red or green fruit that grows on trees', 'Crunchy fruit that floats in a bucket', 'Fruit that might be a teacher\'s gift'],
      hard: ['Bob for these at a party?', 'Fruit that gets a sticky, shiny coat at the fair?'],
    },
    {
      answer: 'COSTUME',
      easy: ['Outfit you dress up in', 'Fancy dress outfit for a party', 'Outfit that turns you into someone else'],
      hard: ['Fancy-dress fit you wear to be a pirate or a princess?', 'Dress-up getup for a fright night?'],
    },
    {
      answer: 'BANDAGES',
      easy: ['Strips of cloth wrapped around a cut', 'Wrap for a sore knee or elbow', 'Cloth strips for a wound'],
      hard: ['What a first aider reaches for, and a mummy wears?', 'Dressing-up strips that stop a cut?'],
    },
    {
      answer: 'CREEPY',
      easy: ['Word that rhymes with "sleepy", for a scary feeling', 'Making your skin crawl, like a spider on your neck', 'Like a basement at night, with strange noises'],
      hard: ['Scary, but with a sinister grin?', 'Like a clown at a dark fairground at midnight?'],
    },
    {
      answer: 'VAMPIRE',
      easy: ['Dracula is one, a night-time count', 'Creature of the night who avoids sunshine', 'Night creature with a pale face and pointy teeth'],
      hard: ['Night-time visitor who wants a snack?', 'Garlic-fearing night creature who sleeps in a coffin?'],
    },
    {
      answer: 'ZOMBIE',
      easy: ['Slow-walking undead creature in films', 'Creature that shuffles along with arms out', 'Creature that\'s undead, slow and a film favourite'],
      hard: ['Shuffle-walking, Thriller-dancing pal?', 'Undead wanderer who\'s always late for school?'],
    },
  ],
};

export default theme;
