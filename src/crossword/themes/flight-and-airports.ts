import type { Theme } from '../types';

const theme: Theme = {
  id: 'flight-and-airports',
  title: 'Up in the Air',
  entries: [
    {
      answer: 'PLANE',
      easy: ['Flying machine with wings and engines', 'Aircraft that carries passengers across the sky', 'Thing you board to fly far away'],
      hard: ['Carpenter\'s smoother, or a ride in the sky?', 'Level thing for smoothing wood, or a flying machine?'],
    },
    {
      answer: 'HELICOPTER',
      easy: ['Aircraft with a big spinning blade on top', 'Flying machine that can hover on the spot', 'Aircraft with rotor blades that takes off straight up'],
      hard: ['Whirlybird with a pad on the ground?', 'Chopper, to its mates?'],
    },
    {
      answer: 'GLIDER',
      easy: ['Plane with no motor that floats on the air', 'Engine-free aircraft towed into the sky before it drifts down', 'Sailplane that floats on warm air'],
      hard: ['Smooth operator in the sky, no motor?', 'Smooth mover, on ice or in the air, no motor required?'],
    },
    {
      answer: 'BALLOON',
      easy: ['Bright bag filled with hot air or gas that floats up', 'Round flyer with a basket that drifts on the breeze', 'Party decoration that floats when you blow it up'],
      hard: ['Full of hot air, and ready to float?', 'Rises with hot air, and pops with a pin?'],
    },
    {
      answer: 'BLIMP',
      easy: ['Airship with a soft gas bag and a little cabin', 'Long, floating airship with no hard frame', 'Cigar-shaped airship that drifts over sports grounds'],
      hard: ['Floating advert hovering over the big game?', 'Airship that\'s a bit of a softie?'],
    },
    {
      answer: 'ZEPPELIN',
      easy: ['Giant rigid airship from long ago', 'Famous German airship, named after its inventor', 'Cigar-shaped airship with a metal frame'],
      hard: ['Led ___, the rock band', 'Huge airship with a firm skeleton?'],
    },
    {
      answer: 'KITE',
      easy: ['Toy made of paper and sticks that flies on a string', 'Toy you fly on a windy beach', 'Flier held on a long string in the breeze'],
      hard: ['Paper bird with a long tail on a string?', 'Windy-day toy that really gets a lift?'],
    },
    {
      answer: 'PARACHUTE',
      easy: ['Large canopy that slows a skydiver down', 'Silky umbrella for jumping out of planes', 'Big fabric canopy that opens on a jump'],
      hard: ['Brolly for jumpers?', 'Pack that gets you down in one piece?'],
    },
    {
      answer: 'ROCKET',
      easy: ['Vehicle that blasts off into space', 'Firework that whooshes up into the sky', 'Missile-shaped craft that launches from a pad'],
      hard: ['Peppery leaf in a salad, or a space ship?', 'Shot up like a ___ (very fast)'],
    },
    {
      answer: 'JETPACK',
      easy: ['Backpack that shoots you through the air', 'Rocket-powered pack strapped on your back', 'Backpack with jets, the kind a superhero might wear'],
      hard: ['Backpack that\'s got a bit of go?', 'Rucksack with ambitions to fly to the moon?'],
    },
    {
      answer: 'DRONE',
      easy: ['Remote-controlled flying gadget with rotors', 'Small flying machine you steer from the ground', 'Buzzy flying robot with a camera'],
      hard: ['Male bee that never makes honey?', 'Buzz that never stings?'],
    },
    {
      answer: 'BUTTERFLY',
      easy: ['Insect with bright wings that flutters among flowers', 'Colourful bug that starts life as a caterpillar', 'Pretty insect that sips nectar through a curly tongue'],
      hard: ['Pool stroke with arms that flap?', 'Nervous flutter in the tummy?'],
    },
    {
      answer: 'DRAGONFLY',
      easy: ['Insect with long, see-through wings and big eyes', 'Shimmery insect that hovers over ponds', 'Fast flying insect with a long thin body'],
      hard: ['Little dragon, big on the pond?', 'Bug with a fiery name but no fire?'],
    },
    {
      answer: 'BAT',
      easy: ['Flying mammal that uses echoes to find its way', 'Furry animal that sleeps upside down in caves', 'Night flyer that is the only mammal that truly flies'],
      hard: ['Cricketer\'s stick, or a bit of a flapper?', 'Hangs around head-down, and flies by night?'],
    },
    {
      answer: 'EAGLE',
      easy: ['Huge bird of prey with a hooked beak', 'Majestic bird with sharp eyesight, gliding high', 'Bald bird of prey that hunts fish from above'],
      hard: ['Golf score of two under par?', 'Sky king, but with a beak instead of a nose?'],
    },
    {
      answer: 'JUMBO JET',
      easy: ['Huge wide-bodied plane with a hump on top', 'Giant passenger plane with four big engines', 'Massive plane made famous by its hump'],
      hard: ['Elephant-sized aeroplane?', 'Heavyweight champ of the skies?'],
    },
    {
      answer: 'AIRLINER',
      easy: ['Big passenger aircraft that flies between cities', 'Commercial plane that carries lots of travellers', 'Plane run by an airline, full of holidaymakers'],
      hard: ['Liner in the sky, not on the ocean?', 'Winged vessel that serves meals and gives safety demos?'],
    },
    {
      answer: 'AIRPORT',
      easy: ['Place where planes take off and land', 'Busy site with terminals, runways and planes', 'Hub where flights come and go'],
      hard: ['A port in the sky, not on the sea?', 'Sky-high harbour for jet-setters?'],
    },
    {
      answer: 'RUNWAY',
      easy: ['Long strip of tarmac where planes take off', 'Strip of pavement where planes speed up to lift off', 'Smooth airstrip that\'s been painted with white numbers'],
      hard: ['Catwalk for planes, not for models?', 'Fashion-show catwalk, or the strip where jets accelerate?'],
    },
    {
      answer: 'TERMINAL',
      easy: ['Building where passengers check in and board planes', 'Big building with gates and check-in desks', 'Where you wait in the big hall before the trip'],
      hard: ['Final word, or a building with gates?', 'Last stop at the end of the line?'],
    },
    {
      answer: 'HANGAR',
      easy: ['Big shed where aeroplanes are stored and fixed', 'Huge building that houses aircraft', 'Large shed on an airfield for parking planes'],
      hard: ['Sounds like a coat holder, but for planes?', 'Shed that hangs about all day?'],
    },
    {
      answer: 'TAXI',
      easy: ['Slow crawl a plane makes before flying off', 'Car for hire that you flag down on the street', 'Cab ride across town, paid by the meter'],
      hard: ['Cab warming up on the runway before take-off?', 'Plane\'s version of a cab ride along the runway?'],
    },
    {
      answer: 'CONTROL TOWER',
      easy: ['Tall building where air traffic is directed', 'Glass-topped building where staff watch the planes', 'Tall building with windows all round, keeping planes apart'],
      hard: ['Boss of the sky, with the best view in the house?', 'Air traffic watchers perched high in glass?'],
    },
    {
      answer: 'BOARDING PASS',
      easy: ['Paper or phone card with your seat number on it', 'Little card that gets you aboard', 'Ticket slip that lets you walk onto the plane'],
      hard: ['Permission to walk the gangway?', 'Gangway slip with your seat number on it?'],
    },
    {
      answer: 'LUGGAGE',
      easy: ['Bags and cases you pack for a trip', 'Suitcases you hand over before you fly', 'Bags that sometimes go missing on a trip'],
      hard: ['Heavy stuff you\'d rather not carry round?', 'Baggage with a bit of carry-on?'],
    },
    {
      answer: 'CHECK IN',
      easy: ['Desk where you hand over your bags before a flight', 'Hotel process of getting your room key', 'Process of getting your seat before boarding'],
      hard: ['Register and drop off your bags, before you fly?', 'Get the tag on your bag, then wave goodbye?'],
    },
    {
      answer: 'CUSTOMS',
      easy: ['Border desk where officers check your bags', 'Government desk where you declare goods you bring in', 'Border area where your luggage gets searched'],
      hard: ['Old habits, or a border check?', 'Where you say you have nothing to declare?'],
    },
    {
      answer: 'PASSPORT',
      easy: ['Booklet that proves who you are when travelling overseas', 'Official travel document with your photo in it', 'What you show when you go through border control'],
      hard: ['Key to the world, in a little book?', 'Book full of stamps for your travels?'],
    },
    {
      answer: 'TICKET',
      easy: ['Proof you have paid for a seat on a flight', 'Pass for a concert, match or movie', 'Little slip of paper that gets you a seat on a bus'],
      hard: ['Golden ___ (prize in a chocolate bar story)', 'Parking fine, but a pass to the skies?'],
    },
    {
      answer: 'TROLLEY',
      easy: ['Wheeled cart for hauling heavy bags', 'Cart you push round the supermarket', 'Cart with wheels for stacking your cases'],
      hard: ['Shopping cart that has taken a holiday?', 'Bag wagon with a mind of its own?'],
    },
    {
      answer: 'GATE',
      easy: ['Swing-open part of a paddock fence', 'Place you wait before boarding the plane', 'Number on the board that tells you where to go'],
      hard: ['Golden ___ (famous San Francisco bridge)', 'Keeper of the way out, up front?'],
    },
    {
      answer: 'DEPARTURES',
      easy: ['Board that lists when planes leave', 'Half of the airport for flights taking off', 'Flights that are going away, not arriving'],
      hard: ['Goodbyes at the airport?', 'Half of the airport that\'s always leaving?'],
    },
    {
      answer: 'ARRIVALS',
      easy: ['Board that shows which flights have landed', 'Part of the airport where people come out with bags', 'Flights that have just touched down'],
      hard: ['Opposite of departures, where hugs await at the airport', 'Half of the airport where the bags come round?'],
    },
    {
      answer: 'AISLE',
      easy: ['Gap down the middle of a plane between seats', 'Walkway down the middle of a bus or plane', 'Path between rows of seats, like in a cinema'],
      hard: ['Walk down the ___ (get married)', 'Sounds like a small island, but it\'s a walkway between seats?'],
    },
    {
      answer: 'PILOT',
      easy: ['Person who flies the plane', 'Captain in the cockpit who flies the aircraft', 'Someone trained to fly planes, sitting up front'],
      hard: ['Test episode, or a plane captain?', 'Little fish that tags along with sharks?'],
    },
    {
      answer: 'COCKPIT',
      easy: ['Front section of a plane where the captain sits', 'Flight deck at the front of an aircraft', 'Room with controls and dials for flying the plane'],
      hard: ['Where the big buttons live, up front?', 'Captain\'s little dashboard room?'],
    },
    {
      answer: 'ENGINE',
      easy: ['Machine that powers a plane or car', 'Big motor that pushes a jet forward', 'Power unit under the wing of a plane'],
      hard: ['The Little ___ That Could', 'Thomas the Tank ___'],
    },
    {
      answer: 'SUITCASE',
      easy: ['Hard-shell case on wheels for holding clothes', 'Bag you pack for your holiday', 'Case that goes on every holiday, packed with socks and togs'],
      hard: ['Case you\'d pack for a trip, not one you\'d take to court?', 'Wardrobe you can wheel round the airport?'],
    },
    {
      answer: 'PASSENGER',
      easy: ['Person who travels in a car, bus, or plane without driving', 'Someone who rides in a plane seat', 'Traveller who is not in charge of the vehicle'],
      hard: ['Someone with a free seat in the sky?', 'Along for the ride, with no wheel to hold?'],
    },
    {
      answer: 'OXYGEN MASK',
      easy: ['Breathing gear that drops from the ceiling in an emergency', 'Breathing kit that feeds you air if the cabin loses pressure', 'Gear that hangs above your seat on a plane'],
      hard: ['Put yours on first, before helping a child?', 'Something to breathe easy with, up high?'],
    },
    {
      answer: 'RADAR',
      easy: ['Device that uses radio waves to spot aircraft', 'Screen that shows where the planes are', 'Tracker that spots storms and ships on a glowing screen'],
      hard: ['Plane-spotting device whose name reads the same backwards?', 'Spy in the sky, with radio waves?'],
    },
    {
      answer: 'SEAT BELT',
      easy: ['Strap that keeps you stuck in place in a car or plane', 'Strap you buckle up when you sit in a car', 'Safety strap that goes across your lap'],
      hard: ['Strap you fasten when the captain says so?', 'Strap that keeps you sitting pretty?'],
    },
    {
      answer: 'TAKEOFF',
      easy: ['Moment a plane leaves the ground and climbs', 'Start of a flight, when the wheels lift off', 'Launch of a plane into the sky'],
      hard: ['Imitation of a famous person, or a plane\'s launch?', 'Up, up and away, the first step of a flight?'],
    },
    {
      answer: 'LANDING',
      easy: ['Touching down on the runway at the end of a flight', 'Final bump when a plane returns to the ground', 'Coming down to earth when the wheels touch'],
      hard: ['Stair ___ (step between floors)', 'Bad ___ (a rough arrival)'],
    },
    {
      answer: 'ALTITUDE',
      easy: ['How high something is above sea level', 'Height above the ground, measured in metres', 'Height a plane cruises at, shown on the dials'],
      hard: ['Attitude, but with more height?', 'Thin-air measure for climbers and pilots?'],
    },
    {
      answer: 'TURBULENCE',
      easy: ['Bumpy patch of air that shakes a plane', 'Wobbly, shaky ride when a plane hits rough air', 'Bumps in the sky that make your drink slosh'],
      hard: ['Storm in a teacup, but up in the air?', 'Plane-sized shake-up in the sky?'],
    },
    {
      answer: 'JET LAG',
      easy: ['Tired feeling after crossing lots of time zones', 'Sleepy, muddled feeling after a trip overseas', 'Body clock out of whack after flying far away'],
      hard: ['Tired body, but the clocks say bedtime?', 'Yawning at lunch, while it\'s still breakfast back home?'],
    },
    {
      answer: 'WING',
      easy: ['Flat part on each side of a plane that gives lift', 'Part of a bird that lets it fly', 'Wide part of a plane that keeps it in the air'],
      hard: ['Take ___ (fly away)', 'Chicken ___ at the party?'],
    },
    {
      answer: 'MOTH',
      easy: ['Night-flying insect that looks like a dull butterfly', 'Insect that gets drawn to the porch light', 'Fluttering insect that nibbles your jumper'],
      hard: ['Drawn to the light, but a flutter in the dark?', 'Wardrobe wrecker with a flutter?'],
    },
    {
      answer: 'TAIL',
      easy: ['Back end of a plane, with the fin on top', 'Rear section of an aircraft or a bird', 'Fluffy back end of a dog or cat'],
      hard: ['Follow a suspect, as a detective would?', 'Heads or ___?'],
    },
    {
      answer: 'FLIGHT',
      easy: ['Trip through the air from the ground to the ground', 'Journey on a plane from one city to another', 'Trip up in the sky, with a seat and a snack'],
      hard: ['Climb a ___ of stairs (go up some steps)', 'Daydream, or a ___ of fancy?'],
    },
    {
      answer: 'AIRSHOW',
      easy: ['Show where planes loop the loop and dip their wings', 'Day out where pilots fly for the crowd', 'Event with stunt jets roaring overhead'],
      hard: ['Stunts up high, with a crowd below?', 'Stealing the show, but with wings?'],
    },
    {
      answer: 'SOAR',
      easy: ['Glide high up in the sky with wings wide', 'Rise up high on the wind, like an eagle', 'Fly high without flapping'],
      hard: ['Prices ___ (go really high)', 'Your heart might ___ when you hear good news?'],
    },
    {
      answer: 'HOVER',
      easy: ['Stay still in the air, like a helicopter', 'What a drone does when it holds its spot in the sky', 'Stay put in the air, wings buzzing like a hummingbird'],
      hard: ['Hang around, stuck in the air?', 'Hang about, with no runway?'],
    },
    {
      answer: 'SKY',
      easy: ['What\'s above us, blue on a sunny day', 'Blue space above the clouds', 'Where birds and planes fly'],
      hard: ['Blue ___ thinking (a bright idea)', 'The limit\'s the ___'],
    },
    {
      answer: 'AIRSHIP',
      easy: ['Large gas-filled craft that floats with a cabin underneath', 'Huge floating aircraft that drifts over the crowd at a game', 'Floating flyer filled with gas, steered by a motor'],
      hard: ['Ship in the air, but not on the sea?', 'Boat with its head in the clouds?'],
    },
    {
      answer: 'PROPELLER',
      easy: ['Spinning blades that pull or push an aircraft through the air', 'Rotating blades at the front of a small plane', 'Fan on the nose of a small plane'],
      hard: ['Little twirler that gives a plane get-up-and-go?', 'Whirly-gig that\'s a bit of a pushy character?'],
    },
    {
      answer: 'WASP',
      easy: ['Yellow-and-black flying insect with a painful sting', 'Striped insect with a sting that buzzes around picnics', 'Flying stinger that loves your jam'],
      hard: ['Bee\'s bad-tempered cousin?', 'Summer barbie gatecrasher with a sting?'],
    },
  ],
};

export default theme;
