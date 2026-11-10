import type { Theme } from '../types';

const theme: Theme = {
  id: 'fishing',
  title: 'Gone Fishing',
  entries: [
    {
      answer: 'ROD',
      easy: ['Long thin pole you hold while you fish', 'Slender pole with a reel on one end', 'Pole that bends when a big fish pulls'],
      hard: ['Spare the ___, spoil the child', 'Pole you hold, or a famous rocker\'s first name?'],
    },
    {
      answer: 'REEL',
      easy: ['Winding gadget on the handle of a rod', 'Drum on a rod that winds the line in', 'Spinning drum that takes in the catch'],
      hard: ['Film strip, or a fishing winder?', 'Scottish dance, or a line winder?'],
    },
    {
      answer: 'FISHING LINE',
      easy: ['Thin, strong thread you dangle in the water', 'Monofilament cord that tugs when a fish bites', 'Clear cord that connects your hook to the rod'],
      hard: ['What an angler hopes won\'t snap when the big one bites?', 'Thread that keeps you left hanging?'],
    },
    {
      answer: 'HOOK',
      easy: ['Bent metal point that fish swallow', 'Curved barb on the end of your cord', 'Sharp curved metal that catches a fish by the mouth'],
      hard: ['Catchy tune that sticks in your head?', 'Captain ___ (pirate with a metal hand)'],
    },
    {
      answer: 'BAIT',
      easy: ['Tasty morsel put on a hook to tempt a fish', 'Snack on a hook that\'s meant to fool a fish', 'Pilchards or worms, put on a hook to tempt a fish'],
      hard: ['___ and switch (a sneaky trick)', 'Tempting offer used to lure in customers?'],
    },
    {
      answer: 'LURE',
      easy: ['Fake fish shaped like a minnow, used to tempt a predator', 'Shiny artificial fish that snares a big catch', 'What you flick out to fool a hungry fish'],
      hard: ['Charm offensive aimed at a hungry fish?', 'Sweet-talk a fish into a shiny trap?'],
    },
    {
      answer: 'SINKER',
      easy: ['Lead weight that pulls the bait under the water', 'Weight that stops your bait from floating off', 'Heavy clip that takes the line down to the bottom'],
      hard: ['Dropping to the depths, a real downer?', 'Hook, line and ___ (the angler\'s trio)'],
    },
    {
      answer: 'FLOAT',
      easy: ['Bobbing bit on the line that shows when a fish nibbles', 'Round bit of plastic that stays on the surface', 'Bright buoy on the line that dips when a fish is near'],
      hard: ['Drink with ice cream in it, or a bobbing thing?', 'Gentle drifter, going nowhere fast?'],
    },
    {
      answer: 'LANDING NET',
      easy: ['Hoop on a long pole, used to scoop a big fish out', 'Scoop that helps stop a big one getting away', 'Long-handled scoop for lifting a fish from the water'],
      hard: ['Where the big one finally lands?', 'Big scoop, for a bigger catch?'],
    },
    {
      answer: 'TACKLE BOX',
      easy: ['Storage case with hooks, weights and spare gear', 'Handy case that snaps shut on your gear', 'Crate of tools and spare gear for a day at the lake'],
      hard: ['Toolbox with a fishy twist?', 'Anglers toolkit, with a clasp and a lid?'],
    },
    {
      answer: 'BUCKET',
      easy: ['Round pail used to carry the catch', 'Container with a handle for holding fish and water', 'Plastic pail that a kid might fill at the rock pool'],
      hard: ['Pail, or a hat style that shares its name?', 'Dreams-to-tick-off ___ list'],
    },
    {
      answer: 'SPOOL',
      easy: ['Drum-shaped holder that the line is wound around', 'Cylinder that line winds onto inside the reel', 'Thread holder you find in a sewing box'],
      hard: ['Sounds like a spoon with a bit of thread?', 'Bobbin\'s cousin, found inside a reel?'],
    },
    {
      answer: 'CAST',
      easy: ['Throw the line out over the water', 'Fling your line out across the lake', 'Hurl your line out with a flick of the wrist'],
      hard: ['Fishing throw, or a theatre company?', 'Plaster ___ (arm wear)'],
    },
    {
      answer: 'WADERS',
      easy: ['Long rubber trousers that keep you dry in the river', 'Waterproof leggings that reach up to your chest', 'Boot-and-trouser combo for standing in the stream'],
      hard: ['Birds at the shore, or fishing gear?', 'Rubber overalls for fishers who\'d rather not get wet feet?'],
    },
    {
      answer: 'FISHERMAN',
      easy: ['Person who catches fish for a living', 'Person in a boat, hauling in the day\'s catch', 'Someone who sits by the river all day with a rod'],
      hard: ['Hooked on the job?', 'Tall-tale teller who has the biggest catch?'],
    },
    {
      answer: 'SPEARGUN',
      easy: ['Underwater gadget that fires a pointed bolt at fish', 'Diver\'s gadget you cock before you go down', 'Underwater shooter with a rubber band and a spike'],
      hard: ['Shoots fish, but never a bang?', 'Underwater weapon with a fishy target?'],
    },
    {
      answer: 'EARTHWORM',
      easy: ['Long pink creature that lives in the soil and wriggles', 'Garden helper that makes the soil richer', 'Wriggly creature that is a favourite bait for big fish'],
      hard: ['Down-to-earth creature, wriggling in the dirt?', 'Gardener\'s best friend, with no legs?'],
    },
    {
      answer: 'PRAWN',
      easy: ['Pink sea creature with ten legs, a tasty barbecue treat', 'Crustacean with long feelers and a tail you peel', 'Curled-up pink seafood, peeled before eating'],
      hard: ['Barbie guest with ten legs and a pink jacket?', '___ cocktail (retro starter)'],
    },
    {
      answer: 'JIG',
      easy: ['Up-and-down movement used to catch fish', 'Lead-headed lure you bounce along the bottom', 'Lively Irish dance, or a fishy bounce?'],
      hard: ['The ___ is up (the game\'s over)', 'Fishing move that is all bounce and no bite?'],
    },
    {
      answer: 'BITE',
      easy: ['Moment a fish grabs the hook', 'Mouthful you take out of a sandwich', 'The nip a puppy gives your shoelace'],
      hard: ['A quick snack, or a fish\'s grab?', 'Wind with a ___ (chilly edge)'],
    },
    {
      answer: 'NIBBLE',
      easy: ['Gentle little bite, the sort a small fish gives', 'Tiny taste, or a small tug on the line', 'What a mouse does to a cracker, bit by bit'],
      hard: ['Little bit to eat, or a fish trying it on?', 'Snack-sized bite that\'s gone in a flash?'],
    },
    {
      answer: 'STRIKE',
      easy: ['Quick jerk of the rod to set the hook', 'Ten skittles down in one go at the bowling alley', 'Scratch of a match on the box'],
      hard: ['Lightning ___ (sudden hit from the sky)', 'Go on ___ (refuse to work)'],
    },
    {
      answer: 'SNAPPER',
      easy: ['Red fish that\'s a favourite catch in New Zealand', 'Fish with a nippy mouth, named for its jaws', 'Popular NZ fish with big red-pink scales'],
      hard: ['Quick chomp of a fish, with a camera click?', 'Cracking fish that is a famous Kiwi catch?'],
    },
    {
      answer: 'KAHAWAI',
      easy: ['Silver NZ sea fish with dark stripes on its back', 'Hard-fighting NZ fish, good for smoking', 'Fish called \'Australian salmon\' across the Tasman'],
      hard: ['Stripy silver fish with a Māori name?', 'Silver scrapper with a Māori name and dark racing stripes?'],
    },
    {
      answer: 'BLUE COD',
      easy: ['Mottled NZ rock fish, popular on the dinner plate', 'Rock-dwelling South Island fish, often fried in batter', 'Fish from cold southern waters, a Kiwi favourite'],
      hard: ['Fish that\'s a rock star down south?', 'Sad-sounding southern fish that\'s a favourite with chips?'],
    },
    {
      answer: 'TREVALLY',
      easy: ['Silver fish with a forked tail from warm northern waters', 'Silver fish known as araara in te reo Māori', 'Fighting fish that lives off the rocks and wharves'],
      hard: ['Trev\'s ally in the sea?', 'Rhymes with \'gravelly\', and swims in northern waters?'],
    },
    {
      answer: 'FLOUNDER',
      easy: ['Flat fish with both eyes on one side of its head', 'Sandy-coloured flatfish that lies on the sea floor', 'Fish that looks like a flat pancake on the seabed'],
      hard: ['Struggle awkwardly, or a flat fish?', 'Thrash about like a fish with flat feet?'],
    },
    {
      answer: 'GURNARD',
      easy: ['Spiky-headed fish with fan-like fins on its sides', 'Reddish sea fish with wing-like fins and a bony head', 'Grumbling fish with a spiky head'],
      hard: ['Spiky and grumpy, the sea\'s ultimate moaner?', 'Fish with a grumpy face and fancy fins?'],
    },
    {
      answer: 'TUNA',
      easy: ['Big sea fish sold in tins for sandwiches', 'Fast, big-finned fish, often caught for sushi', 'Ocean fish with meat that\'s red when raw'],
      hard: ['Fish that\'s a cat\'s favourite?', 'Sandwich filler that sounds like \'tuner\' without the R?'],
    },
    {
      answer: 'KINGFISH',
      easy: ['Big, fast NZ sea fish that loves warm waters', 'Large silver fish with a yellow tail, hunted in the sea', 'Hard-fighting yellowtail chased by anglers in Northland'],
      hard: ['Royal fish with a crown, sort of?', 'Monarch of the waves with a yellow tail?'],
    },
    {
      answer: 'SALMON',
      easy: ['Pink fish that swims upstream to spawn', 'Fish that gets its pink from the food it eats', 'Fish with pink flesh, often smoked on a bagel'],
      hard: ['Pink-ish fish that loves a good jumper?', 'Smoked fish at the brunch table?'],
    },
    {
      answer: 'TROUT',
      easy: ['Sporting river fish that anglers chase', 'Freshwater fish famous in Taupō\'s clear lakes', 'Speckled fish that loves cold, clear rivers'],
      hard: ['Speckled favourite of the fly-fisher?', 'Brown or rainbow, and a fishy dinner treat?'],
    },
    {
      answer: 'BREAM',
      easy: ['Silver-grey fish related to snapper, often caught in harbours', 'Silver fish that rhymes with \'dream\' and \'cream\'', 'Sea fish caught from the rocks at the beach'],
      hard: ['The cream of the crop, but a silvery sea fish?', 'Fishy dream, or a Kiwi sea fish?'],
    },
    {
      answer: 'PERCH',
      easy: ['Striped freshwater fish with a spiky back fin', 'Bar in a birdcage where the budgie sits', 'Stripy fish that lives in lakes and slow rivers'],
      hard: ['Sit like a bird on a ___ (rest a while)', 'A bird\'s landing spot, or a fishy snack?'],
    },
    {
      answer: 'SQUID',
      easy: ['Ten-armed sea creature, often fried as calamari', 'Sea creature that squirts ink when it is scared', 'Soft-bodied sea animal with tentacles and jet-propelled moves'],
      hard: ['Rings on the menu, but not from a bell?', 'Octopus\'s cousin with two extra limbs?'],
    },
    {
      answer: 'MULLET',
      easy: ['Silver, scaly fish that feeds in shallow harbours', 'Grey fish that jumps in harbours and is good on the grill', 'Grey fish that\'s a favourite for a beach barbecue'],
      hard: ['Business at the front, party at the back?', 'Silver fish, or an eighties haircut?'],
    },
    {
      answer: 'PIER',
      easy: ['Long wooden walkway built out over the water', 'Seaside walkway with rides and a fish and chip shop', 'Walkway reaching out from the shore for fishing'],
      hard: ['Sounds like a juicy fruit, but built on posts?', 'Sounds like a close look, but built into the sea?'],
    },
    {
      answer: 'WHARF',
      easy: ['Long pier where trawlers unload their catch and cranes lift crates', 'Working dock where ships load and unload', 'Harbour edge where the fishing boats are loaded with ice'],
      hard: ['Dog\'s bark at the harbour?', 'Harbour edge with cranes and cargo ships?'],
    },
    {
      answer: 'JETTY',
      easy: ['Walkway built out into the water for boats', 'Little wooden landing where a rowing boat is tied up', 'Short, sturdy dock where you can dangle your legs'],
      hard: ['Pier\'s little cousin, where the dinghy ties up?', 'Bombing platform for summer kids, poking into the water?'],
    },
    {
      answer: 'RIVER',
      easy: ['Long stream of fresh water flowing into the sea', 'Wide, flowing water that kayakers paddle down to the sea', 'Waikato, Clutha or Whanganui, for example'],
      hard: ['Cry me a ___ (show a lot of sadness)', 'Has a mouth and a bed but never eats or sleeps?'],
    },
    {
      answer: 'LAKE',
      easy: ['Large body of still water surrounded by land', 'Big inland body of water, like Taupō', 'Pond\'s bigger cousin, where you might row a boat'],
      hard: ['Pink pigment, or a big pond?', 'Swan ___ (famous ballet)'],
    },
    {
      answer: 'STREAM',
      easy: ['Small, narrow river that flows through a valley', 'Trickling water running through the bush', 'Little waterway where kids float paper boats'],
      hard: ['Live ___ (watch on the telly)', 'Watch online without downloading, or a small brook?'],
    },
    {
      answer: 'ESTUARY',
      easy: ['Wide, slow-moving bit of river near the sea', 'Tidal river mouth where fresh and salt water mix', 'Where a river spills into the sea, wide and muddy'],
      hard: ['Where a river gets to say a big hello to the sea?', 'Where rivers go to meet the tide?'],
    },
    {
      answer: 'CATCH',
      easy: ['Haul of fish pulled from the water', 'Fish you proudly show off on the dock', 'What the fisherman brings home in the bucket'],
      hard: ['Cricket fielder\'s job, or an angler\'s haul?', 'Play ___ with a ball at the park?'],
    },
    {
      answer: 'KEEPER',
      easy: ['Fish big enough and legal to take home', 'Angler\'s word for the fish that\'s big enough to bag', 'Fish large enough to keep for the table'],
      hard: ['Goal ___ (last line of defence)', 'Zoo ___ (animal carer)'],
    },
    {
      answer: 'SCALES',
      easy: ['Small, flat plates covering a fish\'s body', 'Thin overlapping plates that protect a fish', 'What you\'d weigh your catch on at home'],
      hard: ['Kitchen ___ (weighs your flour)', 'Music ladder, or fish armour?'],
    },
    {
      answer: 'FILLET',
      easy: ['Boneless piece of fish, ready to cook', 'Cut of fish you\'d find at the fishmonger\'s counter', 'Skinless, boneless cut of fish'],
      hard: ['Fish cut that is the boss of the pan?', 'Sea steak with no tail or head?'],
    },
    {
      answer: 'GILLS',
      easy: ['Feathery breathing organs on the sides of a fish', 'Slits behind a fish\'s head where it breathes', 'What a fish breathes through, though it\'s not a lung'],
      hard: ['Quarter-pint measure, or fish breathing holes?', 'Breath of fresh air for fish?'],
    },
    {
      answer: 'TROPHY',
      easy: ['Shiny cup for winning a competition', 'Medal\'s bigger cousin, handed to the champ', 'Prize that sits on the mantelpiece after a win'],
      hard: ['Mounted fish on the wall, a real ___ fish?', 'Pride of the fishing club\'s shelf?'],
    },
    {
      answer: 'ANGLER',
      easy: ['Person who fishes with a rod for fun', 'Someone who loves a quiet morning on the water', 'Fisher who\'s happy to wait all day for a nibble'],
      hard: ['Someone always looking for an angle?', 'Hook-and-line fan with a tale of the one that got away'],
    },
    {
      answer: 'SEAFOOD',
      easy: ['Edible creatures from the ocean, like fish and shellfish', 'Ocean food that is served with lemon and chips', 'Plate of prawns and oysters at a harbourside café'],
      hard: ['Dinner that came from the deep blue?', 'A dinner from the ocean with no fins at all?'],
    },
    {
      answer: 'SHOAL',
      easy: ['Large group of fish swimming together', 'Shiny swarm that darts through the shallows', 'Dense group of fish that flash silver together'],
      hard: ['Sandbank hazard for the boat?', 'Cheeky crowd of fish, but not a deep one?'],
    },
    {
      answer: 'SCHOOL',
      easy: ['Group of fish swimming together in formation', 'Bunch of fish that stay together, like kids on a trip', 'Huge group of fish that dart about together'],
      hard: ['Fishy classroom, all in one row?', 'Teacher\'s pet, or fish that swim in a bunch?'],
    },
    {
      answer: 'SPAWN',
      easy: ['Eggs that fish lay in their thousands', 'Clumps of jelly-coated eggs that hatch in the shallows', 'Eggs of a fish or frog, left to hatch in the river'],
      hard: ['Give rise to, or lay eggs in water?', 'Hatch a big idea, or lay a lot of eggs?'],
    },
    {
      answer: 'BOAT',
      easy: ['Vessel you use to fish on the water', 'Sailor\'s ride, with a mast and a sail', 'Watercraft that fishers use to reach the spot'],
      hard: ['Gravy ___ (sauce holder)', 'Rock the ___ (make trouble)'],
    },
  ],
};

export default theme;
