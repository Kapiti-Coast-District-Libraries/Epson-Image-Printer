import type { Theme } from '../types';

const theme: Theme = {
  id: 'recycling-and-the-planet',
  title: 'Caring for the Planet',
  entries: [
    {
      answer: 'RECYCLE',
      easy: ['Turn old bottles and cans into something new', 'Put rubbish in the right bin so it can be made again', 'Make old things into new things again'],
      hard: ['Give a bottle a second life?', 'What the yellow-lidded bin is for?'],
    },
    {
      answer: 'BIN',
      easy: ['Container for rubbish or recycling', 'Wheelie ___ for the rubbish', 'Container you put your rubbish in for collection'],
      hard: ['Wheelie ___', 'Where rubbish goes?'],
    },
    {
      answer: 'GLASS',
      easy: ['Material that bottles and jars are made from', 'See-through material for windows and jars', 'Clear stuff that can be melted down and made again'],
      hard: ['Half-full or half-empty?', 'Bottle-bank material?'],
    },
    {
      answer: 'JAR',
      easy: ['Round glass container with a lid, for jam', 'Glass pot with a screw-top lid', 'Container that often holds jam or pickles'],
      hard: ['Jam holder you can wash and use again?', 'Glass container with a screw-top lid?'],
    },
    {
      answer: 'TOTE',
      easy: ['Reusable bag for shopping', 'Shoulder-strap bag, big enough for groceries', 'Bag you take to the shops instead of a single-use one'],
      hard: ['Reusable shopping bag?', 'Carry-all that replaced the plastic bag?'],
    },
    {
      answer: 'BOTTLE',
      easy: ['Container for drinks, often glass or plastic', 'Drinks container you can refill', 'Long-necked container for water or juice'],
      hard: ['Message in a ___', 'Drink container you can fill again and again?'],
    },
    {
      answer: 'PLASTIC',
      easy: ['Lightweight material that many toys are made from', 'Stuff that shopping bags are made from, and that lasts for ages', 'Man-made material that can be moulded into shapes'],
      hard: ['What a turtle might mistake for a jellyfish?', 'Material of milk bottles and toys?'],
    },
    {
      answer: 'TIN CAN',
      easy: ['Metal food container often full of beans', 'Steel food holder with a label', 'Metal container you might open with a key'],
      hard: ['Baked beans\' container?', 'Rinse it, squash it, put it out for collection?'],
    },
    {
      answer: 'ALUMINIUM',
      easy: ['Light, silvery metal used for foil and drink tins', 'Shiny silver metal that can be recycled again and again', 'Lightweight metal in aeroplanes and bikes'],
      hard: ['Drink-can metal?', 'Foil\'s shiny metal?'],
    },
    {
      answer: 'CARDBOARD',
      easy: ['Thick, stiff paper used for boxes', 'Packing material for boxes and cereal packets', 'What you flatten before it goes out with the bin'],
      hard: ['What boxes are made of?', 'Flatten it before it goes out for collection?'],
    },
    {
      answer: 'NEWSPAPER',
      easy: ['Printed daily news, brought to your door', 'Morning read with the funnies, best with breakfast', 'Paper full of the day\'s headlines'],
      hard: ['Yesterday\'s headlines, tomorrow\'s fish-and-chip wrap?', 'Daily read that\'s easy to pulp and make again?'],
    },
    {
      answer: 'KERBSIDE',
      easy: ['Beside the road, where the rubbish is collected', 'Edge of the footpath where bins are put out', 'Collection service that picks up your bin from the curb'],
      hard: ['Where the bins wait on collection day?', '___ collection (rubbish pick-up from the street)'],
    },
    {
      answer: 'REUSE',
      easy: ['Give something a second life instead of binning it', 'Give an old jar or bag a new job', 'Keep using a jar or bag again and again'],
      hard: ['Use again?', 'Reduce, ___, recycle'],
    },
    {
      answer: 'REFILL',
      easy: ['Put water back in a bottle you\'ve already emptied', 'Top up a drink container from the tap or a shop', 'Put more of the same stuff into a container'],
      hard: ['Top up your drink bottle?', 'Fill again, at the tap or the bulk bins?'],
    },
    {
      answer: 'REDUCE',
      easy: ['Use less of something, like packaging', 'Cut down the amount you use', 'Make your rubbish pile smaller'],
      hard: ['___, reuse, recycle', 'Cut down on?'],
    },
    {
      answer: 'REPAIR',
      easy: ['Fix something so it works again', 'Mend a broken item instead of throwing it out', 'Patch up a torn jacket or a broken chair'],
      hard: ['Fix, don\'t throw away?', '___ café (where volunteers mend broken things)'],
    },
    {
      answer: 'COMPOST',
      easy: ['Rotted scraps and leaves that feed the garden', 'Crumbly, rich mix of rotting food and garden waste', 'Rich, dark mix that plants love'],
      hard: ['Black gold from kitchen scraps?', 'Heap where peelings turn to soil?'],
    },
    {
      answer: 'EARTHWORM',
      easy: ['Wriggly garden creature that turns the ground over', 'Pink, wriggly creature that helps gardens grow', 'Long, wriggly creature that lives underground'],
      hard: ['Wriggly worker of the compost heap?', 'Soil-maker with no legs?'],
    },
    {
      answer: 'SCRAPS',
      easy: ['Leftover bits of food for the compost', 'Leftover food that is not thrown away', 'Bits of food left over from dinner'],
      hard: ['Leftovers for the worm farm?', 'Bits of food headed for the compost?'],
    },
    {
      answer: 'PEELINGS',
      easy: ['Skins taken off potatoes or apples before cooking', 'Skins cut off a carrot before it goes in the pot', 'Thin skins that come off fruit and veges'],
      hard: ['Potato skins for the compost?', 'What\'s left after you prepare the carrots?'],
    },
    {
      answer: 'MULCH',
      easy: ['Layer of bark or straw spread on garden beds', 'Garden covering that keeps moisture in the ground', 'Layer of bark on garden beds to keep plants happy'],
      hard: ['Blanket of bark on the garden?', 'Layer that keeps weeds down and water in?'],
    },
    {
      answer: 'SOIL',
      easy: ['Dark, crumbly earth where plants grow', 'Dirt that plants grow in, full of worms', 'Dirt you dig in when you plant something new'],
      hard: ['What worms make from scraps?', 'Dirt, or make dirty?'],
    },
    {
      answer: 'LANDFILL',
      easy: ['Huge hole in the ground where rubbish is buried', 'Place where rubbish goes when it cannot be recycled', 'Big rubbish pit where waste gets buried'],
      hard: ['The tip, officially?', 'Where rubbish goes if nobody sorts it?'],
    },
    {
      answer: 'SEEDLING',
      easy: ['Baby plant that has just come up from a seed', 'Young plant, just starting to grow', 'Tiny new plant, grown from seed'],
      hard: ['Baby tree ready for planting day?', 'Tiny plant in a pot?'],
    },
    {
      answer: 'TREE',
      easy: ['Tall plant with a trunk and branches', 'Big plant that gives shade and a home to birds', 'Woody plant that might have a swing hanging from it'],
      hard: ['Planting one helps the planet?', 'Family ___ (chart of your ancestors)'],
    },
    {
      answer: 'PLANT',
      easy: ['Green living thing that grows in soil', 'Living green thing that makes its own food from sunlight', 'Green thing with roots, stems and leaves'],
      hard: ['___ a tree for the future', 'Factory, or something green in a pot?'],
    },
    {
      answer: 'BUSHLAND',
      easy: ['Native bush area that birds call home', 'Natural area of scrub and trees, left wild', 'Wild, untouched bush where native birds live'],
      hard: ['Native forest worth protecting?', 'Wild green country where birds nest?'],
    },
    {
      answer: 'SOLAR',
      easy: ['Powered by the sun, like panels on roofs', 'Panels on the roof that turn sunshine into power', 'Free energy from the sun, collected on a roof'],
      hard: ['___ panels (roof-top power makers)', 'Powered by the sun?'],
    },
    {
      answer: 'ENERGY',
      easy: ['Power that lets things move, heat or glow', 'The ability to do work, like electricity does', 'What your body needs to run, play and think'],
      hard: ['Save it by turning off the lights?', 'Power, or get-up-and-go?'],
    },
    {
      answer: 'SWITCH',
      easy: ['Button on a wall that turns the lights on and off', 'Button you flick to turn a light on', 'Lever you flip to turn power on or off'],
      hard: ['Flick it off when you leave the room?', 'Swap?'],
    },
    {
      answer: 'LIGHT',
      easy: ['Brightness that lets you see', 'Sunshine or lamp glow, the opposite of dark', 'Something a bulb gives off, and a lamp too'],
      hard: ['Turn it off to save power?', 'As ___ as a feather'],
    },
    {
      answer: 'TURBINE',
      easy: ['Machine with blades that turns moving air into power', 'Huge fan-like machine on a hill that makes electricity', 'Blade-spinning machine that makes power from water or air'],
      hard: ['Giant spinner on a wind farm?', 'Blades that turn a breeze into electricity?'],
    },
    {
      answer: 'WIND',
      easy: ['Moving air that blows the leaves around', 'Air on the move, like a breeze', 'Gust of moving air outside'],
      hard: ['What turns the turbines?', 'Free power on a breezy day?'],
    },
    {
      answer: 'POWER',
      easy: ['Energy that runs the lights and fridge', 'Electricity that comes through the wires to your house', 'Energy that lets machines work'],
      hard: ['___ cut (when the lights go out)', 'Electricity?'],
    },
    {
      answer: 'BULB',
      easy: ['Glass globe that makes light when it is plugged in', 'Glass light globe that glows in a lamp', 'Glass light that gets hot when it is switched on'],
      hard: ['LED one saves electricity?', 'Tulip starter, or lamp part?'],
    },
    {
      answer: 'INSULATE',
      easy: ['Wrap a house in material so it keeps warm', 'Keep heat in a house with ceiling and wall padding', 'Make a house cosy by sealing gaps and adding padding'],
      hard: ['Wrap a house up warm?', 'What Pink Batts do for a cold ceiling'],
    },
    {
      answer: 'HEAT PUMP',
      easy: ['Machine that moves warmth into a room, using electricity', 'Efficient electric warmer that moves warmth rather than making it', 'Home warmer that works like a fridge in reverse'],
      hard: ['Wall unit that warms the lounge?', 'Winter warmer with a remote control?'],
    },
    {
      answer: 'UNPLUG',
      easy: ['Pull the plug on a device when you are not using it', 'Disconnect a charger once the phone is full', 'Pull a plug out of the wall to save power'],
      hard: ['Pull it out of the wall to save power?', 'Disconnect the charger?'],
    },
    {
      answer: 'DRAUGHT',
      easy: ['Cold air coming in through a gap under a door', 'Cold breeze that sneaks through the cracks in a house', 'Chilly air from a gap in the window'],
      hard: ['Cold air sneaking under the door?', 'What a door snake stops?'],
    },
    {
      answer: 'SHOWER',
      easy: ['Quick wash under spray instead of a bath', 'Spray of warm water you stand under to get clean', 'Quick clean-up under the spray in the bathroom'],
      hard: ['Quick wash that saves water?', 'Four-minute wash, or light rain?'],
    },
    {
      answer: 'TAP',
      easy: ['Fitting that lets water out of a sink', 'Sink fitting you turn to get water', 'Water outlet you turn on in the kitchen'],
      hard: ['Turn it off while you brush your teeth?', 'Dripping one wastes litres?'],
    },
    {
      answer: 'WATER',
      easy: ['Clear liquid that we drink and wash with', 'Clear liquid that falls as rain', 'Clear liquid that fills rivers and lakes'],
      hard: ['Don\'t waste a drop of it?', 'What a tank collects from the roof?'],
    },
    {
      answer: 'RAIN TANK',
      easy: ['Storage barrel that collects water from the roof', 'Big barrel on the side of a house, catching roof run-off', 'Big barrel that saves roof run-off for the garden'],
      hard: ['Roof-water storage for the garden?', 'Barrel that catches a downpour?'],
    },
    {
      answer: 'DRIP',
      easy: ['Drop of water falling slowly from a tap', 'Slow, steady leak from a tap', 'Water falling slowly, drop by drop'],
      hard: ['Plink, plink from a leaky tap?', 'One drop at a time?'],
    },
    {
      answer: 'LEAK',
      easy: ['Hole that lets water escape from a pipe', 'Crack in a pipe that lets water drip out', 'Escape of water from a tap or a roof'],
      hard: ['Hole in the hose?', 'Drip, or let a secret out?'],
    },
    {
      answer: 'BUCKET',
      easy: ['Round container with a handle, for carrying water', 'Water pail for washing the car', 'Kids\' sandpit toy with a handle and a spade'],
      hard: ['A drop in the ___', 'Catch shower water in one for the garden?'],
    },
    {
      answer: 'BEACH',
      easy: ['Sandy place where the sea meets the land', 'Sandy shore where you swim and build castles', 'Stretch of sand beside the sea'],
      hard: ['___ clean-up (rubbish hunt on the sand)', 'Where plastic washes up?'],
    },
    {
      answer: 'PLANET',
      easy: ['Huge round world that moves around a star', 'Big world we live on, one of eight in our star system', 'Round world that orbits the sun'],
      hard: ['Earth, for one?', '\'There is no ___ B\', say the signs'],
    },
    {
      answer: 'NATURE',
      easy: ['Plants, animals and landscapes that are not made by people', 'Wild world of plants and animals', 'Plants, animals and rocks in the wild'],
      hard: ['Mother ___', 'The great outdoors?'],
    },
    {
      answer: 'GREEN',
      easy: ['Colour of grass and leaves', 'Colour that means go on traffic lights', 'Colour of a leaf, and an eco-friendly thing'],
      hard: ['Eco-friendly, colour-wise?', '___ with envy'],
    },
    {
      answer: 'LITTER',
      easy: ['Rubbish dropped on the ground where it should not be', 'Rubbish left lying around in public places', 'Rubbish that blows around the park'],
      hard: ['Rubbish dropped on the ground?', 'Be a tidy Kiwi: don\'t ___'],
    },
    {
      answer: 'CLEANUP',
      easy: ['Day when people pick up rubbish from the beach or park', 'Clearing up rubbish in a park or on a beach', 'Tidy-up of a park with rubbish bags'],
      hard: ['Rubbish-collecting working bee?', 'Tidy-up of a beach or stream?'],
    },
    {
      answer: 'VOLUNTEER',
      easy: ['Person who helps out without being paid', 'Helper who gives time for free', 'Someone who offers to help without pay'],
      hard: ['Helper who works for free?', 'Person at a planting day, giving up their Saturday?'],
    },
    {
      answer: 'COMMUNITY',
      easy: ['Group of people who live together in one place', 'Group that works together, like a neighbourhood', 'Neighbourhood group that helps each other out'],
      hard: ['___ garden (shared vege patch)', 'Everyone in your neighbourhood?'],
    },
    {
      answer: 'OCEAN',
      easy: ['Huge body of salty water, with waves and fish', 'Big salty water body, home to whales', 'Vast salty water that is home to fish and whales'],
      hard: ['Where plastic shouldn\'t end up?', 'Home of whales and far too much rubbish?'],
    },
    {
      answer: 'HABITAT',
      easy: ['Natural home of a plant or animal', 'Home environment for wildlife, like a forest or a pond', 'Place where an animal naturally lives'],
      hard: ['Animal\'s natural home?', 'What a forest is to a kiwi?'],
    },
  ],
};

export default theme;
