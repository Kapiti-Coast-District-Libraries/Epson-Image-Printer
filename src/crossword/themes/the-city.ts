import type { Theme } from '../types';

const theme: Theme = {
  id: 'the-city',
  title: 'In the City',
  entries: [
    {
      answer: 'BUS',
      easy: ['Big vehicle that carries lots of people through town', 'Public transport on wheels, with a driver up front', 'Long road vehicle that runs on a timetable'],
      hard: ['Missed the ___? Better start walking', 'Wheels for the whole class, all at once?'],
    },
    {
      answer: 'TAXI',
      easy: ['Car you hail on the street for a ride', 'Car with a meter that a driver uses for fares', 'Cab you can book by phone to get home'],
      hard: ['Ride that charges you by the mile?', 'Tax you can actually ride in?'],
    },
    {
      answer: 'TRAM',
      easy: ['Electric vehicle that runs on rails down the street', 'Rail car on city streets, with a clanging bell', 'Street-running rail vehicle in a city'],
      hard: ['Hiking, but on steel rails?', 'Rails with a ding-ding attitude?'],
    },
    {
      answer: 'TRAIN',
      easy: ['Long rail vehicle that carries people and goods', 'Carriages on tracks, pulled by an engine', 'Rail service that runs out to the suburbs'],
      hard: ['Chuffs along the tracks with a whistle?', 'Hard to stop once it gets going on the rails?'],
    },
    {
      answer: 'STATION',
      easy: ['Place where trains or buses pick up passengers', 'Busy building where you catch a train', 'Stop on a train line, with a platform and a clock'],
      hard: ['Where trains pull in, and so does the chat?', 'Radio frequency for the DJ?'],
    },
    {
      answer: 'FERRY',
      easy: ['Boat that carries people and cars across water', 'Boat that runs to Waiheke from the city', 'Big boat that sails between two harbour shores'],
      hard: ['Floating car park, going the other way?', 'Fair way to cross the water, if you pay the fare?'],
    },
    {
      answer: 'TERMINAL',
      easy: ['Building at an airport where planes load passengers', 'Airport building with check-in desks and boarding gates', 'Busy building where you board a flight'],
      hard: ['Battery\'s connection point, or a bus line\'s end?', 'Final stop for a flight, or a computer screen?'],
    },
    {
      answer: 'TRAFFIC LIGHT',
      easy: ['Red, orange and green signal at a busy corner', 'Coloured signal that tells cars when to go', 'Set of coloured signals at a busy intersection'],
      hard: ['Three-eyed boss of the intersection?', 'Bright bulbs that never sleep on the job?'],
    },
    {
      answer: 'CROSSING',
      easy: ['Painted stripes where walkers can safely cross the road', 'Place where the lights tell you it is safe to walk', 'Wide white stripes for walkers, where cars must give way'],
      hard: ['Zebra-striped path, minus the zebra?', 'A road to get over, with a little patience?'],
    },
    {
      answer: 'FOOTPATH',
      easy: ['Paved path beside the road for walkers', 'Where Kiwis push prams and walk dogs beside the road', 'Path that is only for feet, not for wheels'],
      hard: ['Strip where your feet are safe from the traffic?', 'Strip of paved path that sets you on the right foot?'],
    },
    {
      answer: 'PEDESTRIAN',
      easy: ['Person walking along the street', 'Someone travelling on foot in the city', 'A walker, as opposed to a driver'],
      hard: ['Walker with no wheels and no ticket?', 'Walker who never gets stuck in traffic?'],
    },
    {
      answer: 'COMMUTE',
      easy: ['Daily trip to and from work', 'Journey to the office and back again', 'Regular trip to a job in the city'],
      hard: ['The daily dash that\'s a bit of a grind?', 'Same route every morning, in the rush hour'],
    },
    {
      answer: 'CAFE',
      easy: ['Small place to sip a flat white and eat a muffin', 'Cosy spot for coffee and cake', 'Place for a hot drink and a sandwich out'],
      hard: ['Where you can find a latte with a side of people-watching?', 'Brew-tiful place to sit and chat?'],
    },
    {
      answer: 'BANK',
      easy: ['Place where you save money and get cash', 'Building where you keep your money safe', 'Place to keep your savings, and borrow for a house'],
      hard: ['Money-maker that\'s always in the red?', 'Ocean\'s edge, or the place for your savings?'],
    },
    {
      answer: 'SHOP',
      easy: ['Place to buy groceries or clothes', 'Store where you pay at the till', 'Little place to buy milk and lollies'],
      hard: ['Talk ___ (chat about work)', 'Corner ___ (a little place for bread and milk)'],
    },
    {
      answer: 'MARKET',
      easy: ['Stalls selling fruit, veges and crafts', 'Weekend stalls where people buy fresh produce', 'Busy open-air place for haggling over the price'],
      hard: ['Flea ___ (bargain-hunter\'s treasure trove)', 'Veggies and bargains, bustling in the open air?'],
    },
    {
      answer: 'LIBRARY',
      easy: ['Place full of books you can borrow for free', 'Building where you can borrow books and DVDs', 'Quiet building with shelves of books'],
      hard: ['Bookworm\'s favourite hangout, with a hush rule?', 'Where you can take a book out, and never go out?'],
    },
    {
      answer: 'MUSEUM',
      easy: ['Building with exhibits of old things and art', 'Place to look at dinosaur bones and treasures', 'Place where you can see old objects behind glass'],
      hard: ['Muse on this: a place full of old stuff?', 'Where old stuff sits in cases, and you\'re not allowed to touch?'],
    },
    {
      answer: 'THEATRE',
      easy: ['Place where you watch a play on stage', 'Building with a stage, seats and a curtain', 'Venue for plays and musicals'],
      hard: ['Where the drama is on the stage, not on the news?', 'Show-off building with a red curtain?'],
    },
    {
      answer: 'CINEMA',
      easy: ['Place to watch a film on a big screen', 'Building with popcorn and a big screen', 'Where you go to see the latest film'],
      hard: ['Where the lights go down and the movie starts?', 'Where you\'ll find the flicks, and a fizzy drink or two?'],
    },
    {
      answer: 'HOSPITAL',
      easy: ['Big building where doctors look after sick people', 'Place with an emergency ward and nurses', 'Building with beds, doctors and lots of corridors'],
      hard: ['Where you go when you have a bad case of bumps?', 'A lot of care under one roof?'],
    },
    {
      answer: 'POST OFFICE',
      easy: ['Place where you buy stamps and send parcels', 'Shop where letters and parcels are sent', 'Building where you send letters and buy stamps'],
      hard: ['Stamp-tastic building for letters and parcels?', 'Letter-writers\' drop-in, with a parcel counter?'],
    },
    {
      answer: 'TOWER',
      easy: ['Tall, narrow building or structure', 'Tall structure with a view over the city', 'Very tall building, like a castle turret'],
      hard: ['Leaning ___ of Pisa', 'Ivory ___ (a place for brainy types)'],
    },
    {
      answer: 'SKYSCRAPER',
      easy: ['Very tall city building with lots of floors', 'Tall office block that touches the clouds', 'Building that is taller than most others around it'],
      hard: ['Tall building that tickles the clouds?', 'Ladder-free way to reach the clouds?'],
    },
    {
      answer: 'APARTMENT',
      easy: ['Home on one floor of a bigger building', 'Flat in a block, often up many stairs', 'Home in a block where you share a lift'],
      hard: ['Place where your floor is someone else\'s ceiling?', 'Home sharing a block, like a slice in a layer cake?'],
    },
    {
      answer: 'PARK',
      easy: ['Green space in town, with grass and swings', 'City green space for dog walks and kicking a ball', 'Patch of green where kids play on the swings'],
      hard: ['Leave your car here, and have a picnic?', 'Spot to ___ your car (and rest your legs)'],
    },
    {
      answer: 'ROAD',
      easy: ['Tarmac strip with cat\'s eyes and white lines down the middle', 'Route for cars that runs between towns', 'Path with a centre line and a speed limit'],
      hard: ['Rules of the ___ (keep left, drive carefully)', 'Hit the ___ (set off on a trip)'],
    },
    {
      answer: 'LANE',
      easy: ['Narrow street between buildings', 'Single strip of a motorway for one line of cars', 'Narrow path, often with a fence on each side'],
      hard: ['Pathway for a pool swimmer, or a car?', 'Memory ___ (a nostalgic stroll)'],
    },
    {
      answer: 'SQUARE',
      easy: ['Open paved space in a town centre', 'Shape with four equal sides', 'Public plaza, often with a statue in the middle'],
      hard: ['Not a bit cool, and not very round?', 'Someone who is a bit too old-fashioned?'],
    },
    {
      answer: 'ALLEY',
      easy: ['Narrow lane running behind buildings', 'Narrow back passage, often with bins', 'Little backstreet between two shops'],
      hard: ['___ cat (scruffy street roamer)', 'Bowling ___ (where the balls roll)'],
    },
    {
      answer: 'STREET',
      easy: ['Road with houses or shops along it', 'Road in a town, with footpaths on both sides', 'Public road lined with buildings'],
      hard: ['Sesame ___ (a famous TV neighbourhood)', 'Pound the ___ (look for work)'],
    },
    {
      answer: 'CROWD',
      easy: ['Large group of people packed together', 'Lots of people gathered at a game', 'Mob of people in a busy street'],
      hard: ['Lots of heads, and no room to move?', 'A rooster\'s call, but with a whole lot of them?'],
    },
    {
      answer: 'TOURIST',
      easy: ['Visitor who takes photos of famous sights', 'Person on holiday who explores a new town', 'Traveller who looks at the sights'],
      hard: ['Snap-happy visitor with a map in hand?', 'Visitor who\'s lost, with a map held upside down?'],
    },
    {
      answer: 'STATUE',
      easy: ['Carved or cast figure of a person, in a square', 'Stone or metal model of someone famous', 'Big figure standing on a plinth'],
      hard: ['Stone-cold citizen who never moves a muscle?', 'Public figure who never gets a word in?'],
    },
    {
      answer: 'FOUNTAIN',
      easy: ['Water that shoots up into the air in a square', 'Splashing water feature in a plaza', 'Jet of water in a pond with coins thrown in'],
      hard: ['A spring with a sense of style?', 'Wishing well with a bit of spray?'],
    },
    {
      answer: 'NEON',
      easy: ['Bright glowing sign, often in a shop window', 'Sign with glowing tubes in pink or blue', 'Gas that lights up in a bright sign'],
      hard: ['Gas that sees the bright lights?', 'Glowing sign with a flashy side?'],
    },
    {
      answer: 'SIGNPOST',
      easy: ['Pole that points the way to towns', 'Post with arrows that show the directions', 'Sign on a stick that tells you where to go'],
      hard: ['Pole that points you in the right direction?', 'Wooden arm that is always pointing the way?'],
    },
    {
      answer: 'BRIDGE',
      easy: ['Structure that carries a road over a river', 'Crossing over water or a valley', 'Span that gets you across the water'],
      hard: ['Way over the water, with no trolls to pay?', 'Card game for four, or a way across the river?'],
    },
    {
      answer: 'HARBOUR',
      easy: ['Sheltered area of water where boats moor', 'Safe bay where ships come into port', 'Calm waters beside the city docks'],
      hard: ['Shelter for ships, or a grudge you keep?', 'Hold on to your secret, in a bay?'],
    },
    {
      answer: 'WHARF',
      easy: ['Harbour structure on piles where ferries pull in', 'Dock by the water where boats are loaded', 'Waterfront platform where Kiwis dangle a fishing line'],
      hard: ['Fish and chips on the ___ at sunset', 'Timber walkway over the sea where the ferry pulls in?'],
    },
    {
      answer: 'SUBURB',
      easy: ['Area of houses on the edge of a city', 'Residential area outside the city centre', 'Neighbourhood a little way from downtown'],
      hard: ['Where the lawns are long and the city is a drive away?', 'Leafy patch of lawns, miles from the bright lights?'],
    },
    {
      answer: 'NIGHTLIFE',
      easy: ['Bars, music and fun in the city after dark', 'What the city gets up to after sunset', 'Evening entertainment, out and about'],
      hard: ['Lights, music and fun after the sun\'s gone home?', 'Owls would know all about this?'],
    },
    {
      answer: 'KERB',
      easy: ['Edge of the footpath where the road begins', 'Road-edge stone, spelt with a K in NZ', 'Raised edge of a footpath'],
      hard: ['Step down from this to cross, after looking both ways?', 'Footpath edge, where careless parkers scrape their tyres?'],
    },
    {
      answer: 'ESCALATOR',
      easy: ['Moving staircase in a shopping centre', 'Stairs that move up or down by themselves', 'Moving steps for going up a department store'],
      hard: ['Stairs that do all the walking for you?', 'Lazy way up the stairs?'],
    },
    {
      answer: 'LIFT',
      easy: ['Box that carries you between floors', 'Kiwi word for an elevator', 'Room that goes up and down a building'],
      hard: ['Up you go, with no steps to climb?', 'Ride that takes the weight off your feet?'],
    },
    {
      answer: 'DAIRY',
      easy: ['Corner store selling milk, bread and lollies', 'Local store open late with ice cream', 'Little neighbourhood store, great for a late-night treat'],
      hard: ['Milky place on the corner?', 'Lolly jar with a fridge full of milk?'],
    },
    {
      answer: 'BENCH',
      easy: ['Long seat in a park for resting', 'Seat outside for two or three people', 'Wooden seat where you can watch people go by'],
      hard: ['Park seat, or where the reserve player waits?', 'Where the judge sits, or a park seat?'],
    },
    {
      answer: 'LETTERBOX',
      easy: ['Box on the street where mail is delivered', 'Metal box where the postie leaves letters', 'Slot in a front fence for your post'],
      hard: ['Box that\'s always waiting for a letter?', 'Where bills and birthday cards end up at home?'],
    },
    {
      answer: 'FIRE ENGINE',
      easy: ['Big red truck that rushes to a blaze', 'Truck with a siren and ladders', 'Red emergency vehicle with a hose on board'],
      hard: ['Red-hot ride, but no flames?', 'Motor with a need for speed and water?'],
    },
    {
      answer: 'AMBULANCE',
      easy: ['White vehicle with flashing lights that takes sick people to hospital', 'Emergency vehicle with a siren and paramedics', 'Fast vehicle that races to the injured'],
      hard: ['Siren song with a stretcher on board?', 'Siren-happy taxi for the very unwell?'],
    },
    {
      answer: 'POLICE',
      easy: ['Officers who keep the peace in a town', 'Force that catches crooks and helps people', 'Officers with blue uniforms and a station'],
      hard: ['Men and women in blue, on the beat?', 'Good guys with badges, in the ___ car?'],
    },
    {
      answer: 'BAKERY',
      easy: ['Shop that sells fresh bread and cakes', 'Place where you buy bread still warm from the oven', 'Shop where the air smells of baking'],
      hard: ['Place where the bread is always rising?', 'Loaf-tastic corner, just down the road?'],
    },
    {
      answer: 'BUILDING',
      easy: ['Structure with walls and a roof, like a school', 'Big structure with lots of windows', 'Office block, school or shopping mall, for example'],
      hard: ['What the builder is always doing?', 'Constructive way to describe a large block?'],
    },
    {
      answer: 'ROUNDABOUT',
      easy: ['Circle in the road where cars go round', 'Traffic circle where drivers take turns', 'Road junction with a circle of traffic'],
      hard: ['Ride that goes round and round, but not at the fair?', 'Traffic that goes in circles on purpose?'],
    },
    {
      answer: 'MOTORWAY',
      easy: ['Big highway where cars travel fast', 'Road with several lanes and no traffic lights', 'Wide fast road that goes between cities'],
      hard: ['Highway with a fast-lane attitude?', 'Road where the speed limit is a serious request?'],
    },
    {
      answer: 'SCOOTER',
      easy: ['Kick-along toy with two wheels and handlebars', 'Two-wheeled ride you push with one foot', 'Ride for kids that folds up tight'],
      hard: ['Kick-start your day with this rolling toy?', 'Ride that needs a push and a good pair of legs?'],
    },
    {
      answer: 'PIGEON',
      easy: ['Grey city bird that loves crumbs and bread', 'Plump bird that coos on window ledges', 'Common city bird that bobs its head as it walks'],
      hard: ['Bird that lives on a pizza budget?', 'Coo-ey, the bird that never leaves town?'],
    },
    {
      answer: 'MAYOR',
      easy: ['Leader of a city council', 'Elected head of a town', 'Person who opens the new bridge with a speech'],
      hard: ['Chief who gets to cut the ribbon?', 'Top cat of the council chamber?'],
    },
  ],
};

export default theme;
