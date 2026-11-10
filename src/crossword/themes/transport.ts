import type { Theme } from '../types';

const theme: Theme = {
  id: 'transport',
  title: 'Getting Around',
  entries: [
    {
      answer: 'CAR',
      easy: ['Vehicle you drive, like a hatchback', 'Family hatchback or sedan, the usual ride to school', 'Four-wheeled motor that families use to get to the beach'],
      hard: ['What usually sleeps in the garage?', 'Traffic jam regular with four wheels and a grumble?'],
    },
    {
      answer: 'BUS',
      easy: ['Big vehicle that carries lots of passengers', 'Long, boxy vehicle on a set route with lots of seats', 'Public ride on wheels that stops at kerbside stops'],
      hard: ['Double-decker, for one', 'Always late, but still gets there?'],
    },
    {
      answer: 'TRAIN',
      easy: ['Runs on rails, pulled by a locomotive', 'Long line of carriages, pulled along the tracks', 'Rail journey with carriages and a whistle'],
      hard: ['Coach a team', 'Lose your ___ of thought, then find it again?'],
    },
    {
      answer: 'TRAM',
      easy: ['Passenger carriage on rails in a city street', 'Old-fashioned street ride, with a pole up to overhead wires', 'Electric ride that runs along tracks in the middle of the street'],
      hard: ['Christchurch heritage ride on rails', 'Ding-ding ride, with a bell for every stop?'],
    },
    {
      answer: 'FERRY',
      easy: ['Boat that carries people across Cook Strait', 'Boat that shuttles people across a river or harbour', 'Big boat that takes travellers and vehicles across a harbour'],
      hard: ['Carry across water', 'Floating shuttle that always gets you across the water?'],
    },
    {
      answer: 'AEROPLANE',
      easy: ['Flying machine with wings', 'Jet or propeller craft that takes you on a holiday in the sky', 'Big flying machine that carries travellers over oceans'],
      hard: ['Open wide, here comes the ___!', 'Flying machine that\'s a real wing-ding?'],
    },
    {
      answer: 'HELICOPTER',
      easy: ['Flying machine with spinning rotor blades', 'Machine that goes straight up and down, with a whirling top', 'Rescue flyer that can land on a boat or a mountain'],
      hard: ['___ parent (one who hovers)', 'Chopper that\'s always in a whirl?'],
    },
    {
      answer: 'BICYCLE',
      easy: ['Two wheels and pedals', 'Human-powered two-wheeler you ride with your legs', 'Pedal-powered ride with a bell and a basket'],
      hard: ['A bike, spelt out in full', 'Two-wheeler that stays upright only while moving?'],
    },
    {
      answer: 'SCOOTER',
      easy: ['Push along with your foot on this', 'Kids\' two-wheeled foot-powered ride with a handlebar', 'Small kick-powered ride with a stand, often used by kids'],
      hard: ['Vespa, for one', 'Foot-powered ride that\'s a bit of a kick?'],
    },
    {
      answer: 'SKATEBOARD',
      easy: ['Wheeled deck for doing tricks at the park', 'Flat thing on four wheels that you ride standing up', 'Plank with wheels, used by teens at the park'],
      hard: ['Ride for an ollie or a kickflip', 'Tony Hawk\'s four-wheeled ride?'],
    },
    {
      answer: 'MOTORBIKE',
      easy: ['Two wheels with an engine', 'Two-wheeled ride with a throttle, for a rider in leathers', 'Two-wheeled ride with a seat and a loud exhaust'],
      hard: ['Harley or dirt scrambler', 'Cool wheels for a leather-jacketed rider?'],
    },
    {
      answer: 'TRUCK',
      easy: ['Big vehicle that carries heavy loads', 'Heavy-duty vehicle with a big cargo area', 'Big lorry hauling goods across the country'],
      hard: ['Tow ___ or dump ___', 'Big hauler with a cab and a lot of attitude?'],
    },
    {
      answer: 'UTE',
      easy: ['Vehicle with an open tray at the back', 'Tradie\'s workhorse, a car with a flatbed at the back', 'Farm vehicle with a load bed behind the front seats'],
      hard: ['Pickup, to Kiwi tradies', 'Workhorse on the job site with a tray full of tools?'],
    },
    {
      answer: 'TAXI',
      easy: ['Car you pay to drive you somewhere', 'Cab you hail on the street, with a meter', 'Hire vehicle that takes you across town for a fare'],
      hard: ['Roll slowly to the runway, as a plane does', 'Hire ride with a meter that\'s always ticking?'],
    },
    {
      answer: 'VAN',
      easy: ['Boxy vehicle for moving furniture', 'Boxy people-carrier with sliding side doors', 'Delivery vehicle that goes door-to-door with parcels'],
      hard: ['Camper ___, for a road trip', 'Boxy ride for movers, or the front of an army?'],
    },
    {
      answer: 'YACHT',
      easy: ['Rich person\'s big, luxurious boat for cruising', 'Fancy sailing vessel with a mast and sails', 'Marina boat with sails, used for fun on the water'],
      hard: ['America\'s Cup racer', 'Boat that\'s a real sail-ebrity?'],
    },
    {
      answer: 'WAKA',
      easy: ['Māori canoe', 'Traditional long canoe, carved and built by Māori', 'Long canoe paddled by a crew, a taonga of Aotearoa'],
      hard: ['Canoe paddled by a big crew at Waitangi', 'Canoe that\'s a real crowd-pleaser at a regatta?'],
    },
    {
      answer: 'AMBULANCE',
      easy: ['Vehicle that rushes sick people to hospital', 'Emergency vehicle with a siren and a red cross', 'Emergency vehicle that carries paramedics and patients'],
      hard: ['Vehicle whose name is written backwards on the front', 'Speedy ride with a wail, and lots of care?'],
    },
    {
      answer: 'FIRE ENGINE',
      easy: ['Red truck with ladders and hoses', 'Big red vehicle that squirts water on burning buildings', 'Emergency vehicle with a tall ladder and a siren'],
      hard: ['Dalmatian\'s favourite ride?', 'Red machine with a hot temper and a long ladder?'],
    },
    {
      answer: 'ROUNDABOUT',
      easy: ['Circle where you give way to the right', 'Junction with a circle in the middle, where you give way', 'Traffic-circle junction where you signal your exit'],
      hard: ['Spinning thing at the playground, or a traffic circle?', 'Dizzying junction that\'s a real whirl of a turn?'],
    },
    {
      answer: 'MOTORWAY',
      easy: ['Fast road with many lanes', 'Big highway where you can speed between cities', 'Divided highway with on-ramps and off-ramps'],
      hard: ['Kiwi freeway', 'Fast lane with no stop signs, for quick trips?'],
    },
    {
      answer: 'BRIDGE',
      easy: ['Crosses over a river', 'Structure that carries traffic over a river or valley', 'Span that links two banks, like the big harbour one in Auckland'],
      hard: ['Card game; Auckland Harbour crossing', 'Dental work that fills a gap?'],
    },
    {
      answer: 'TUNNEL',
      easy: ['Underground passage for cars or trains', 'Passage dug through a hill, or under the sea', 'Long hole through a mountain, lit up inside'],
      hard: ['Burrow through a hill', 'Dark stretch with a light at the end?'],
    },
    {
      answer: 'STATION',
      easy: ['Where trains stop', 'Hub with platforms where people wait for a ride', 'Place where a locomotive pulls in, with a clock and benches'],
      hard: ['Big sheep run, in NZ', 'Where you might wait on a bench, with a clock on the wall?'],
    },
    {
      answer: 'AIRPORT',
      easy: ['Where planes take off and land', 'Big complex with runways, check-in desks and a control tower', 'Place where you check in for a flight and go through security'],
      hard: ['Where baggage carousels spin and jet lag begins?', 'Place with a lot of gates and a lot of goodbyes?'],
    },
    {
      answer: 'TICKET',
      easy: ['Pass you buy to ride', 'Paper or card that proves you paid to get in', 'Stub that gets you through a gate to the show'],
      hard: ['Parking fine; raffle stub', 'Golden ___ (Willy Wonka\'s prize)'],
    },
    {
      answer: 'DRIVER',
      easy: ['Person behind the steering wheel', 'Person who chauffeurs you around, with a licence', 'Person whose licence lets them take the controls of a vehicle'],
      hard: ['Golf club for teeing off', 'Racer with a fast-paced life, pedal to the metal?'],
    },
    {
      answer: 'PILOT',
      easy: ['Person who flies a plane', 'Person in the cockpit who flies the aircraft', 'Flyer who guides a ship in and out of a harbour'],
      hard: ['Trial TV episode', 'Little flame that never goes out, in a gas stove?'],
    },
    {
      answer: 'TIMETABLE',
      easy: ['Chart showing when buses leave', 'List of departures and arrivals, pinned at the stop', 'Guide that tells you when your ride will arrive'],
      hard: ['Schedule that says when the 8:15 leaves', 'Schedule for the ride that\'s always on the dot?'],
    },
    {
      answer: 'SEATBELT',
      easy: ['Click it before the car moves', 'Strap that holds you in place in a car, click it on', 'Strap across your lap and chest, locked in with a buckle'],
      hard: ['What you buckle, front seat or back', 'Strap that keeps you safe, so don\'t leave it loose?'],
    },
    {
      answer: 'WHEEL',
      easy: ['Round thing that turns on a bike', 'Round disc that turns on an axle, carrying a vehicle', 'Circle of metal and rim that makes a bike roll'],
      hard: ['Thing that\'s pointless to reinvent', 'Ferris ___ (big spinning ride at the fair)'],
    },
    {
      answer: 'TYRE',
      easy: ['Rubber ring around a wheel', 'Inflated rubber ring on the outside of a bike rim', 'Ring of rubber that grips the tarmac'],
      hard: ['Rubber ring that can go flat', 'Kiwi spelling of a wheel\'s rubber ring'],
    },
    {
      answer: 'PETROL',
      easy: ['Car fuel that\'s called gas in America', 'Unleaded 91 or 95, at the pump', 'Lighter, more flammable fuel than diesel, for most cars'],
      hard: ['What you fill up with at the servo', 'Liquid that\'s a real gas at the pump?'],
    },
    {
      answer: 'HELMET',
      easy: ['Wear this on your head when biking', 'Hard hat that cyclists and motorcyclists wear', 'Protective headgear, often with a chin strap'],
      hard: ['Safety lid, the law on a bike here', 'Something that\'s a must if you\'re keen to keep your head?'],
    },
    {
      answer: 'ROAD',
      easy: ['Cars drive along this', 'Paved route for vehicles, with lanes and kerbs', 'Strip of tarmac that leads to town, with a centre line'],
      hard: ['___ trip (a long drive for fun)', 'Yellow brick ___, off to see the wizard?'],
    },
    {
      answer: 'CABLE CAR',
      easy: ['Wellington\'s red ride up to Kelburn', 'Hill-climbing ride on a wire, in Wellington', 'Cabin that glides up a steep hill, pulled by a thick steel wire'],
      hard: ['Ride hauled by wire up a steep hill', 'Hill-hugging ride that\'s a real wire-taker?'],
    },
    {
      answer: 'GONDOLA',
      easy: ['Cabin that carries you up a hill on a wire', 'Enclosed cabin on a wire, going up a ski slope', 'Flat-bottomed boat, pushed along with a pole in Venice'],
      hard: ['Venice canal boat', 'Pole-powered boat with a serenade for two?'],
    },
    {
      answer: 'HOVERCRAFT',
      easy: ['Vehicle that floats on a cushion of air', 'Air-cushion boat that can zoom over mud and sand', 'Machine that skims across water on a blast of air'],
      hard: ['Vehicle riding on air over water or land', 'Boat that\'s all air and no anchor?'],
    },
    {
      answer: 'JETBOAT',
      easy: ['Fast boat that spins on a shallow river', 'Speedy river craft powered by a water-jet pump', 'Kiwi river thrill ride, zipping through shallow rapids'],
      hard: ['Speedy boat that does full-circle spins', 'River ride that\'s a real whirl of a thrill?'],
    },
    {
      answer: 'GLIDER',
      easy: ['Plane with no engine', 'Plane with long wings that soars on rising warm air', 'Silent aircraft that you launch with a winch or a tow'],
      hard: ['Silent rider of thermals', 'Plane that\'s a real soar-ing success, with no fuel?'],
    },
    {
      answer: 'BALLOON',
      easy: ['Hot-air ride in a basket', 'Giant, floating bag that drifts with the wind', 'Floating party decoration filled with helium'],
      hard: ['Party decoration; swell up', 'Windbag floating in the sky, with a basket?'],
    },
    {
      answer: 'COMMUTER',
      easy: ['Person travelling to work each day', 'Worker who travels in and out of the city each morning', 'Office worker who lives out of town and travels in each day'],
      hard: ['Rush-hour regular', 'Daily rider who\'s always stuck in a jam?'],
    },
    {
      answer: 'SPEED BUMP',
      easy: ['Hump in the road that slows cars', 'Raised ridge across the road that makes you slow down', 'Ramp-like hump that calms traffic near a school'],
      hard: ['Lump that puts the brakes on boy racers', 'Ridge that gets you to take it easy, sort of?'],
    },
    {
      answer: 'DINGHY',
      easy: ['Small rowing boat', 'Small open sailboat, often used for racing', 'Little inflatable boat that you can blow up'],
      hard: ['Little sailing boat kids learn on, that tips easily?', 'Little boat that\'s always tagging along behind?'],
    },
    {
      answer: 'CANOE',
      easy: ['Light boat moved with a paddle', 'Narrow boat you sit in and paddle, often on a river', 'Light boat moved with one-bladed paddles'],
      hard: ['Paddle your own ___: be independent', 'Open boat that Canadians paddle, kneeling down'],
    },
    {
      answer: 'BRAKES',
      easy: ['Press these to stop', 'Pedals or levers that slow a bike to a halt', 'Pads that clamp down to stop a bike'],
      hard: ['Slows down', 'Pause-button for a bike, with a bit of a squeal?'],
    },
    {
      answer: 'HORN',
      easy: ['Toot this to warn others', 'Loud noisemaker on a boat that blasts a long warning', 'French ___ (coiled brass instrument)'],
      hard: ['Rhino\'s nose spike', 'Unicorn\'s one-of-a-kind feature?'],
    },
    {
      answer: 'PASSENGER',
      easy: ['Person riding but not driving', 'Traveller who pays a fare and gets a seat', 'Traveller who\'s been taken somewhere by someone else'],
      hard: ['Rider in the back seat', 'Rider who\'s just along for the ride?'],
    },
    {
      answer: 'INDICATOR',
      easy: ['Flashing light to show you\'re turning', 'Blinking orange light on the side of a vehicle', 'Lever you flick to tell others which way you\'ll go'],
      hard: ['It winks before you turn', 'Signal that\'s a bit of a flasher?'],
    },
    {
      answer: 'LINER',
      easy: ['Big cruise ship', 'Huge ship that carries holidaymakers across the sea', 'Ocean-going ship with many decks and a pool'],
      hard: ['Ocean giant; bin bag', 'Cruising giant, or a bag that lines the bin?'],
    },
  ],
};

export default theme;
