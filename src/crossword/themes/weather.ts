import type { Theme } from '../types';

const theme: Theme = {
  id: 'weather',
  title: 'Wild Weather',
  entries: [
    {
      answer: 'RAIN',
      easy: ['Water falling from the clouds', 'Drops of water that fill rivers and tanks after a storm', 'Wet weather that gets you reaching for your gumboots'],
      hard: ['Gutter-filler that sounds royal?'],
    },
    {
      answer: 'SNOW',
      easy: ['White flakes that fall in winter', 'Frozen flakes that cover mountains in white', 'Fluffy stuff kids roll into a ball and hurl'],
      hard: ['What skiers hope for on Ruapehu'],
    },
    {
      answer: 'HAIL',
      easy: ['Balls of ice falling from the sky', 'Lumps of frozen rain that rattle on a tin roof', 'Stones of ice that can dent cars in a storm'],
      hard: ['Icy pellets, or flag down a taxi?'],
    },
    {
      answer: 'WIND',
      easy: ['Moving air that blows things around', 'Air moving across the land, you feel it on your face', 'What the sails of a boat need to move it along'],
      hard: ['Turn the key on an old clock'],
    },
    {
      answer: 'FOG',
      easy: ['Thick low cloud that is hard to see through', 'Cloud that sits right on the ground, making driving tricky', 'Damp grey mist that rolls in off the harbour'],
      hard: ['Grey blanket that keeps planes on the ground', 'Lost in the ___ (confused)'],
    },
    {
      answer: 'MIST',
      easy: ['Light, damp haze in the air', 'Tiny droplets of water hanging in the air over hills', 'Cool spray hanging in the air above a waterfall'],
      hard: ['Fine haze that sounds like a near miss?'],
    },
    {
      answer: 'SLEET',
      easy: ['Rain mixed with snow', 'Icy slush falling from the sky', 'Half-frozen wet stuff that stings your face on a winter day'],
      hard: ['Slushy stuff that can\'t decide what to be'],
    },
    {
      answer: 'STORM',
      easy: ['Bad weather with strong wind and rain', 'Fierce, wild weather with bluster and pelting water', 'Weather event that sends people racing indoors'],
      hard: ['___ in a teacup (a fuss over nothing)'],
    },
    {
      answer: 'CLOUD',
      easy: ['Fluffy white or grey shape in the sky', 'Puffy mass of water droplets floating high in the sky', 'Something a bright blue day is missing'],
      hard: ['Aotearoa: land of the long white one', 'Head in the ___s (daydreaming)'],
    },
    {
      answer: 'FROST',
      easy: ['Icy white coating on a cold morning', 'Feathery crystals that settle on the grass on a chilly night', 'Ice-crystal coating on car windscreens, scraped off by drivers'],
      hard: ['Jack ___, who nips at noses'],
    },
    {
      answer: 'GALE',
      easy: ['Very strong wind', 'Storm-force wind that bends trees and rattles shutters', 'Strong, fierce blast of wind at sea, as on a beach'],
      hard: ['Howling wind, or a burst of laughter?'],
    },
    {
      answer: 'SUNNY',
      easy: ['Bright weather with clear skies', 'Fine and bright, with the sky looking happy', 'Weather when you need your sunglasses'],
      hard: ['Cheerful, like a fine summer\'s day'],
    },
    {
      answer: 'DEW',
      easy: ['Water drops on the grass in the morning', 'Tiny beads of moisture that form on blades of grass overnight', 'Wet sparkle on the spider web at sunrise'],
      hard: ['Morning sparkle that sounds like it\'s owed?'],
    },
    {
      answer: 'ICE',
      easy: ['Frozen water', 'Solid water that you put in a drink to chill it', 'Skating surface on a rink, made from frozen water'],
      hard: ['Break the ___'],
    },
    {
      answer: 'GUST',
      easy: ['Sudden short burst of wind', 'Quick puff of wind that makes trees shake', 'Sharp draught of air that whips up your hair'],
      hard: ['Blast that can flip a brolly inside out'],
    },
    {
      answer: 'FLOOD',
      easy: ['When rivers overflow onto the land', 'Water that spreads over a town that\'s usually dry', 'Overflow of water spilling out of a dam or a river bank'],
      hard: ['A ___ of tears (lots of crying)'],
    },
    {
      answer: 'HUMID',
      easy: ['Describes the air in a tropical jungle or steamy bathroom', 'Scientific word for air heavy with water vapour', 'Air full of moisture that makes your hair frizz'],
      hard: ['Muggy, the opposite of crisp'],
    },
    {
      answer: 'SMOG',
      easy: ['Dirty haze of smoke and fog', 'Brown air over a big city from car fumes and factories', 'Poor air quality, often seen in busy cities on still days'],
      hard: ['City haze whose name blends two words'],
    },
    {
      answer: 'CLEAR',
      easy: ['No clouds at all', 'Sky with nothing blocking the stars at night', 'Transparent, like a glass of water'],
      hard: ['Crystal ___: easy to understand'],
    },
    {
      answer: 'HAZE',
      easy: ['Thin mist that blurs the view', 'Dusty or smoky layer that makes distant hills look faded', 'Light grey veil over the mountains on a summer afternoon'],
      hard: ['Heat ___ shimmering above a hot road'],
    },
    {
      answer: 'THUNDER',
      easy: ['Loud rumble after a flash in a storm', 'Booming noise that rolls across the sky after a bright flash', 'Crash of noise you hear right after a bright strike of light'],
      hard: ['Boom that follows a flash'],
    },
    {
      answer: 'LIGHTNING',
      easy: ['Bright flash in a storm', 'Electric zigzag of sparks that flashes across the sky', 'Zigzag streak that can strike a tall tree or a building'],
      hard: ['Bolt from the blue'],
    },
    {
      answer: 'DROUGHT',
      easy: ['Long time with no rain', 'Long period when the ground is cracked and the dams run low', 'Extended dry spell that shrivels crops and dries out the land'],
      hard: ['Dry spell that worries farmers'],
    },
    {
      answer: 'DRIZZLE',
      easy: ['Very light rain', 'Fine, sprinkling wetness that barely soaks your shirt', 'Tiny, gentle sprinkles that make the pavement shiny'],
      hard: ['Pour lightly over a salad'],
    },
    {
      answer: 'BREEZE',
      easy: ['Gentle wind', 'Light, cooling air that makes the washing sway', 'Soft, mild wind that feels nice on a hot day'],
      hard: ['That test was a ___!'],
    },
    {
      answer: 'RAINBOW',
      easy: ['Coloured arc in the sky after a shower', 'Arc of colours formed when sunlight hits water droplets', 'Colour band that looks like a giant arch in the sky'],
      hard: ['Arch of colours with a pot of gold at the end'],
    },
    {
      answer: 'TORNADO',
      easy: ['Spinning funnel of wind', 'Violent, funnel-shaped spinning wind that touches the ground', 'Whirlwind with destructive force, common in Kansas'],
      hard: ['Twister that whisked Dorothy away to Oz'],
    },
    {
      answer: 'CYCLONE',
      easy: ['Spiralling tropical storm in the South Pacific, like Gabrielle', 'Tropical storm with spiralling winds, called a typhoon in Asia', 'Low spinning system of storms, typical of the tropics'],
      hard: ['Ex-tropical ___ (stormy NZ weather warning)'],
    },
    {
      answer: 'BLIZZARD',
      easy: ['Snowstorm with strong winds', 'Blinding storm of white flakes and howling wind', 'Severe winter storm, with visibility close to zero'],
      hard: ['Whiteout that blinds mountain climbers'],
    },
    {
      answer: 'HURRICANE',
      easy: ['Giant spinning tropical storm', 'Tropical storm of the Atlantic with a calm eye at its centre', 'Violent spinning system of winds with a calm eye in its middle'],
      hard: ['Wellington\'s Super Rugby team is the ___s'],
    },
    {
      answer: 'FORECAST',
      easy: ['Prediction of tomorrow\'s weather', 'Weather report on TV, telling you what to expect', 'Meteorologist\'s guess about the sky\'s next move'],
      hard: ['Weather outlook read after the news'],
    },
    {
      answer: 'HUMIDITY',
      easy: ['Amount of water vapour in the air', 'How much moisture hangs in the air, shown as a percentage', 'Sticky, damp feeling that makes sweating hard to avoid'],
      hard: ['\'It\'s not the heat, it\'s the ___\''],
    },
    {
      answer: 'TEMPERATURE',
      easy: ['How hot or cold it is', 'Measure of how warm or cool the air is, in degrees', 'Degrees on a weather map, in Celsius or Fahrenheit'],
      hard: ['Something taken when you feel sick'],
    },
    {
      answer: 'THERMOMETER',
      easy: ['Tool that tells you how hot it is', 'Glass tube with a liquid column that climbs when it warms', 'Gadget with degrees marked on it, used to check a fever'],
      hard: ['Tool that goes under your tongue when you\'re sick'],
    },
    {
      answer: 'RAIN GAUGE',
      easy: ['Collector that measures how wet a day was', 'Container left outside that catches the drops and shows millimetres', 'Weather station tool with a funnel that collects water for measuring'],
      hard: ['Tube in the garden that measures a downpour'],
    },
    {
      answer: 'SOUTHERLY',
      easy: ['Cold wind blowing up from Antarctica', 'Cold wind that sweeps up the NZ coast from the ice', 'Cold change that blows in from polar regions in NZ'],
      hard: ['Chilly blast that sends Wellingtonians indoors'],
    },
    {
      answer: 'HEATWAVE',
      easy: ['Long spell of very hot weather', 'Spell of blazing, sweltering days', 'Scorching spell that sends everyone to the beach'],
      hard: ['Scorcher that lasts for days'],
    },
    {
      answer: 'UMBRELLA',
      easy: ['You hold it over your head in the rain', 'Folding canopy on a stick that keeps you dry', 'Dome of fabric on spokes that springs open at a push'],
      hard: ['Brolly that turns inside out in a gust'],
    },
    {
      answer: 'PUDDLE',
      easy: ['Small pool of water after rain', 'Shallow dip in the road where water sits after wet weather', 'Little lake that forms in a low spot on the lawn'],
      hard: ['Splash zone for gumboots'],
    },
    {
      answer: 'SUNSHINE',
      easy: ['Bright light from the Sun', 'Golden warmth and light that comes down from the sky', 'Light and warmth that makes you want to be outdoors'],
      hard: ['"Cheer up, ___!"'],
    },
    {
      answer: 'OVERCAST',
      easy: ['Covered in grey cloud', 'Sky completely covered in grey, with no blue showing', 'Dull, grey day without a hint of sun'],
      hard: ['Gloomy sky, grey from edge to edge'],
    },
    {
      answer: 'DOWNPOUR',
      easy: ['Very heavy rain', 'Torrential, bucketing wet weather that empties the streets', 'Huge gush of water that sends people running for cover'],
      hard: ['Cloudburst that soaks you in seconds'],
    },
    {
      answer: 'CLIMATE',
      easy: ['Usual weather of a place over many years', 'Typical weather of a region over decades', 'Typical mix of heat and wetness in a region, year in year out'],
      hard: ['Long-term pattern behind day-to-day weather'],
    },
    {
      answer: 'SEASON',
      easy: ['Summer, autumn, winter or spring', 'One of four parts of the year, each with its own weather', 'Stretch of months with its own typical weather, like winter'],
      hard: ['Add salt and pepper'],
    },
    {
      answer: 'PRESSURE',
      easy: ['Push of the air, shown on a weather map', 'Force that air exerts on everything around us', 'Measured in hectopascals on a weather chart'],
      hard: ['High or low on a weather map, or stress at work?'],
    },
    {
      answer: 'SHOWER',
      easy: ['Short burst of rain', 'Brief wet spell that comes and goes in an hour', 'Cubicle in the bathroom where you stand under water and soap'],
      hard: ['Baby ___ (gift party)'],
    },
    {
      answer: 'ICICLE',
      easy: ['Hanging spike of ice', 'Long, pointy stalactite of ice hanging off a roof', 'Sharp, glassy spike that forms as water drips and freezes'],
      hard: ['Frozen drip from the guttering'],
    },
    {
      answer: 'SNOWFLAKE',
      easy: ['Six-sided crystal falling from the sky', 'Tiny, delicate ice crystal, often with six points', 'Feathery white flake you catch on your tongue in winter'],
      hard: ['Crystal with no twin, so they say'],
    },
    {
      answer: 'CHILLY',
      easy: ['Quite cold', 'Cold enough to need a jacket, but not freezing', 'A bit cold, like a winter morning before the sun is up'],
      hard: ['Nippy, and sounds like a hot pepper?', '___ bin (Kiwi cooler for the beach)'],
    },
  ],
};

export default theme;
