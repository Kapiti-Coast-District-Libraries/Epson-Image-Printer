import type { Theme } from '../types';

const theme: Theme = {
  id: 'the-city',
  title: 'In the City',
  entries: [
    {
      answer: 'BUS',
      easy: ['Big vehicle that carries lots of people through town', 'Public transport on wheels, with a driver up front', 'Long road vehicle that runs on a timetable'],
      hard: ['Miss the ___ (lose your chance)', 'Double-decker, perhaps?'],
    },
    {
      answer: 'TAXI',
      easy: ['Car you hail on the street for a ride', 'Car with a meter that a driver uses for fares', 'Cab you can book by phone to get home'],
      hard: ['Cab?', 'Ride with a meter running?'],
    },
    {
      answer: 'TRAM',
      easy: ['Electric vehicle that runs on rails down the street', 'Rail car on city streets, with a clanging bell', 'Street-running rail vehicle in a city'],
      hard: ['Christchurch\'s rail ride through the city?', 'Streetcar, to a Kiwi?'],
    },
    {
      answer: 'TRAIN',
      easy: ['Long rail vehicle that carries people and goods', 'Carriages on tracks, pulled by an engine', 'Rail service that runs out to the suburbs'],
      hard: ['___ of thought', 'Commuter\'s ride on rails?'],
    },
    {
      answer: 'STATION',
      easy: ['Place where trains or buses pick up passengers', 'Busy building where you catch a train', 'Stop on a train line, with a platform and a clock'],
      hard: ['Where you catch a train?', 'Radio channel, or a railway stop?'],
    },
    {
      answer: 'FERRY',
      easy: ['Boat that carries people and cars across water', 'Boat that runs to Waiheke from the city', 'Big boat that sails between two harbour shores'],
      hard: ['Boat across the harbour?', 'Commuter\'s ride over the water?'],
    },
    {
      answer: 'TERMINAL',
      easy: ['Building at an airport where planes load passengers', 'Airport building with check-in desks and boarding gates', 'Busy building where you board a flight'],
      hard: ['End of the line?', 'Bus or airport building?'],
    },
    {
      answer: 'TRAFFIC LIGHT',
      easy: ['Red, orange and green signal at a busy corner', 'Coloured signal that tells cars when to go', 'Set of coloured signals at a busy intersection'],
      hard: ['Red, orange, green signal?', 'It tells drivers when to stop and go?'],
    },
    {
      answer: 'CROSSING',
      easy: ['Painted stripes where walkers can safely cross the road', 'Place where the lights tell you it is safe to walk', 'Wide white stripes for walkers, where cars must give way'],
      hard: ['Zebra ___', 'Where the green man lets you walk?'],
    },
    {
      answer: 'FOOTPATH',
      easy: ['Paved path beside the road for walkers', 'Where Kiwis push prams and walk dogs beside the road', 'Path that is only for feet, not for wheels'],
      hard: ['Sidewalk, to a Kiwi?', 'Where walkers go beside the road?'],
    },
    {
      answer: 'PEDESTRIAN',
      easy: ['Person walking along the street', 'Someone travelling on foot in the city', 'A walker, as opposed to a driver'],
      hard: ['Person on foot?', 'Who the green man is for?'],
    },
    {
      answer: 'COMMUTE',
      easy: ['Daily trip to and from work', 'Journey to the office and back again', 'Regular trip to a job in the city'],
      hard: ['Daily trip to work?', 'Train ride to the office and back?'],
    },
    {
      answer: 'CAFE',
      easy: ['Small place to sip a flat white and eat a muffin', 'Cosy spot for coffee and cake', 'Place for a hot drink and a sandwich out'],
      hard: ['Where flat whites are made?', 'Spot for a coffee and a scone?'],
    },
    {
      answer: 'BANK',
      easy: ['Place where you save money and get cash', 'Building where you keep your money safe', 'Place to keep your savings, and borrow for a house'],
      hard: ['Where money is kept, or the side of a river?', 'Piggy ___'],
    },
    {
      answer: 'SHOP',
      easy: ['Place to buy groceries or clothes', 'Store where you pay at the till', 'Little place to buy milk and lollies'],
      hard: ['Talk ___ (chat about work)', 'Corner ___ (a little place for bread and milk)'],
    },
    {
      answer: 'MARKET',
      easy: ['Stalls selling fruit, veges and crafts', 'Weekend stalls where people buy fresh produce', 'Busy open-air place for haggling over the price'],
      hard: ['Flea ___ (bargain-hunter\'s treasure trove)', 'Saturday stalls of fruit and veg?'],
    },
    {
      answer: 'LIBRARY',
      easy: ['Place full of books you can borrow for free', 'Building where you can borrow books and DVDs', 'Quiet building with shelves of books'],
      hard: ['Where you might be right now?', 'Place to borrow books for free?'],
    },
    {
      answer: 'MUSEUM',
      easy: ['Building with exhibits of old things and art', 'Place to look at dinosaur bones and treasures', 'Place where you can see old objects behind glass'],
      hard: ['Te Papa, for one', 'Building full of treasures from the past?'],
    },
    {
      answer: 'THEATRE',
      easy: ['Place where you watch a play on stage', 'Building with a stage, seats and a curtain', 'Venue for plays and musicals'],
      hard: ['Where plays are staged?', 'Operating ___ (surgeon\'s workplace)'],
    },
    {
      answer: 'CINEMA',
      easy: ['Place to watch a film on a big screen', 'Building with popcorn and a big screen', 'Where you go to see the latest film'],
      hard: ['Where films hit the big screen?', 'The movies?'],
    },
    {
      answer: 'HOSPITAL',
      easy: ['Big building where doctors look after sick people', 'Place with an emergency ward and nurses', 'Building with beds, doctors and lots of corridors'],
      hard: ['Where doctors and nurses work?', 'Ambulance\'s destination?'],
    },
    {
      answer: 'POST OFFICE',
      easy: ['Place where you buy stamps and send parcels', 'Shop where letters and parcels are sent', 'Building where you send letters and buy stamps'],
      hard: ['Where parcels are sent from?', 'Place to buy stamps?'],
    },
    {
      answer: 'TOWER',
      easy: ['Tall, narrow building or structure', 'Tall structure with a view over the city', 'Very tall building, like a castle turret'],
      hard: ['Sky ___ (Auckland landmark)', 'Leaning ___ of Pisa'],
    },
    {
      answer: 'SKYSCRAPER',
      easy: ['Very tall city building with lots of floors', 'Tall office block that touches the clouds', 'Building that is taller than most others around it'],
      hard: ['Building that tickles the clouds?', 'King Kong\'s climbing frame?'],
    },
    {
      answer: 'APARTMENT',
      easy: ['Home on one floor of a bigger building', 'Flat in a block, often up many stairs', 'Home in a block where you share a lift'],
      hard: ['Flat in a tall block?', 'Home with neighbours above and below?'],
    },
    {
      answer: 'PARK',
      easy: ['Green space in town, with grass and swings', 'City green space for dog walks and kicking a ball', 'Patch of green where kids play on the swings'],
      hard: ['Green space in a city, or leave the car?', 'Where you\'d find swings and a duck pond?'],
    },
    {
      answer: 'ROAD',
      easy: ['Tarmac strip with cat\'s eyes and white lines down the middle', 'Route for cars that runs between towns', 'Path with a centre line and a speed limit'],
      hard: ['Rules of the ___ (keep left, drive carefully)', 'Hit the ___ (set off on a trip)'],
    },
    {
      answer: 'LANE',
      easy: ['Narrow street between buildings', 'Single strip of a motorway for one line of cars', 'Narrow path, often with a fence on each side'],
      hard: ['Bowling strip, or a narrow street?', 'Bus ___ (cars keep out)'],
    },
    {
      answer: 'SQUARE',
      easy: ['Open paved space in a town centre', 'Shape with four equal sides', 'Public plaza, often with a statue in the middle'],
      hard: ['Town ___ (open space in the middle of a city)', 'Shape with four equal sides?'],
    },
    {
      answer: 'ALLEY',
      easy: ['Narrow lane running behind buildings', 'Narrow back passage, often with bins', 'Little backstreet between two shops'],
      hard: ['___ cat (scruffy street roamer)', 'Bowling ___ (where the balls roll)'],
    },
    {
      answer: 'STREET',
      easy: ['Road with houses or shops along it', 'Road in a town, with footpaths on both sides', 'Public road lined with buildings'],
      hard: ['Sesame ___', 'Main ___ (where the shops are)'],
    },
    {
      answer: 'CROWD',
      easy: ['Large group of people packed together', 'Lots of people gathered at a game', 'Mob of people in a busy street'],
      hard: ['Three\'s a ___', 'Lots of people in one place?'],
    },
    {
      answer: 'TOURIST',
      easy: ['Visitor who takes photos of famous sights', 'Person on holiday who explores a new town', 'Traveller who looks at the sights'],
      hard: ['Visitor with a camera and a map?', 'Sightseer?'],
    },
    {
      answer: 'STATUE',
      easy: ['Carved or cast figure of a person, in a square', 'Stone or metal model of someone famous', 'Big figure standing on a plinth'],
      hard: ['Bronze figure in a city square?', 'Pigeon\'s favourite perch?'],
    },
    {
      answer: 'FOUNTAIN',
      easy: ['Water that shoots up into the air in a square', 'Splashing water feature in a plaza', 'Jet of water in a pond with coins thrown in'],
      hard: ['Water feature you toss a coin into?', 'Drinking ___ (bubbler in the park)'],
    },
    {
      answer: 'NEON',
      easy: ['Bright glowing sign, often in a shop window', 'Sign with glowing tubes in pink or blue', 'Gas that lights up in a bright sign'],
      hard: ['Glowing gas in bright city signs?', 'Fluorescent colour, or a sign light?'],
    },
    {
      answer: 'SIGNPOST',
      easy: ['Pole that points the way to towns', 'Post with arrows that show the directions', 'Sign on a stick that tells you where to go'],
      hard: ['Pole that points the way?', 'Roadside pointer with place names?'],
    },
    {
      answer: 'BRIDGE',
      easy: ['Structure that carries a road over a river', 'Crossing over water or a valley', 'Span that gets you across the water'],
      hard: ['Auckland\'s Harbour ___', 'Card game, or a river crossing?'],
    },
    {
      answer: 'HARBOUR',
      easy: ['Sheltered area of water where boats moor', 'Safe bay where ships come into port', 'Calm waters beside the city docks'],
      hard: ['Port for ships, or to hold a grudge?', 'Wellington\'s sheltered water?'],
    },
    {
      answer: 'WHARF',
      easy: ['Harbour structure on piles where ferries pull in', 'Dock by the water where boats are loaded', 'Waterfront platform where Kiwis dangle a fishing line'],
      hard: ['Where ferries tie up?', 'Dockside platform?'],
    },
    {
      answer: 'SUBURB',
      easy: ['Area of houses on the edge of a city', 'Residential area outside the city centre', 'Neighbourhood a little way from downtown'],
      hard: ['Neighbourhood outside the city centre?', 'Karori or Remuera, e.g.'],
    },
    {
      answer: 'NIGHTLIFE',
      easy: ['Bars, music and fun in the city after dark', 'What the city gets up to after sunset', 'Evening entertainment, out and about'],
      hard: ['Bars, clubs and shows after dark?', 'What a city has when the sun goes down?'],
    },
    {
      answer: 'KERB',
      easy: ['Edge of the footpath where the road begins', 'Road-edge stone, spelt with a K in NZ', 'Raised edge of a footpath'],
      hard: ['Edge of the footpath?', 'Where you wait before crossing?'],
    },
    {
      answer: 'ESCALATOR',
      easy: ['Moving staircase in a shopping centre', 'Stairs that move up or down by themselves', 'Moving steps for going up a department store'],
      hard: ['Moving staircase?', 'Stairs that carry you up at the mall?'],
    },
    {
      answer: 'LIFT',
      easy: ['Box that carries you between floors', 'Kiwi word for an elevator', 'Room that goes up and down a building'],
      hard: ['Elevator, to a Kiwi?', 'Give me a ___ (a ride)'],
    },
    {
      answer: 'DAIRY',
      easy: ['Corner store selling milk, bread and lollies', 'Local store open late with ice cream', 'Little neighbourhood store, great for a late-night treat'],
      hard: ['Kiwi corner shop?', 'Where you buy milk and a dollar mix?'],
    },
    {
      answer: 'BENCH',
      easy: ['Long seat in a park for resting', 'Seat outside for two or three people', 'Wooden seat where you can watch people go by'],
      hard: ['Park seat?', 'Where the reserves sit?'],
    },
    {
      answer: 'LETTERBOX',
      easy: ['Box on the street where mail is delivered', 'Metal box where the postie leaves letters', 'Slot in a front fence for your post'],
      hard: ['Where the postie leaves the mail?', 'Slot for bills and birthday cards?'],
    },
    {
      answer: 'FIRE ENGINE',
      easy: ['Big red truck that rushes to a blaze', 'Truck with a siren and ladders', 'Red emergency vehicle with a hose on board'],
      hard: ['Big red truck with a ladder?', 'Siren-wailing truck racing to a blaze?'],
    },
    {
      answer: 'AMBULANCE',
      easy: ['White vehicle with flashing lights that takes sick people to hospital', 'Emergency vehicle with a siren and paramedics', 'Fast vehicle that races to the injured'],
      hard: ['Siren-wailing ride to hospital?', 'Paramedics\' van?'],
    },
    {
      answer: 'POLICE',
      easy: ['Officers who keep the peace in a town', 'Force that catches crooks and helps people', 'Officers with blue uniforms and a station'],
      hard: ['The boys and girls in blue?', 'Who you call on 111 for a crime?'],
    },
    {
      answer: 'BAKERY',
      easy: ['Shop that sells fresh bread and cakes', 'Place where you buy bread still warm from the oven', 'Shop where the air smells of baking'],
      hard: ['Where the pies and loaves come from?', 'Shop that smells of fresh bread?'],
    },
    {
      answer: 'BUILDING',
      easy: ['Structure with walls and a roof, like a school', 'Big structure with lots of windows', 'Office block, school or shopping mall, for example'],
      hard: ['Office block or house?', 'What a crane helps with?'],
    },
    {
      answer: 'ROUNDABOUT',
      easy: ['Circle in the road where cars go round', 'Traffic circle where drivers take turns', 'Road junction with a circle of traffic'],
      hard: ['Circle at an intersection?', 'Playground spinner, or a junction?'],
    },
    {
      answer: 'MOTORWAY',
      easy: ['Big highway where cars travel fast', 'Road with several lanes and no traffic lights', 'Wide fast road that goes between cities'],
      hard: ['Fast road with on-ramps?', 'Multi-lane highway out of the city?'],
    },
    {
      answer: 'SCOOTER',
      easy: ['Kick-along toy with two wheels and handlebars', 'Two-wheeled ride you push with one foot', 'Ride for kids that folds up tight'],
      hard: ['Kick-along ride?', 'E-___ (hire ride on city footpaths)'],
    },
    {
      answer: 'PIGEON',
      easy: ['Grey city bird that loves crumbs and bread', 'Plump bird that coos on window ledges', 'Common city bird that bobs its head as it walks'],
      hard: ['City bird after your crumbs?', 'Statue-sitter in the town square?'],
    },
    {
      answer: 'MAYOR',
      easy: ['Leader of a city council', 'Elected head of a town', 'Person who opens the new bridge with a speech'],
      hard: ['Head of the city council?', 'Wearer of the chains at the town hall?'],
    },
  ],
};

export default theme;
