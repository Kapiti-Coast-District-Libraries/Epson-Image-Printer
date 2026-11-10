import type { Theme } from '../types';

const theme: Theme = {
  id: 'at-the-supermarket',
  title: 'At the Supermarket',
  entries: [
    {
      answer: 'TILL',
      easy: ['Machine where you pay', 'Register that rings up what you buy', 'Money drawer that slides open at the counter'],
      hard: ['Cash drawer; dig the soil', 'Up ___ now (so far)'],
    },
    {
      answer: 'AISLE',
      easy: ['Walkway between the shelves', 'Numbered passage where the biscuits might be', 'A bride walks down this at a wedding'],
      hard: ['Walkway that sounds like a small island?', 'Plane seat choice: window or ___?'],
    },
    {
      answer: 'SHELF',
      easy: ['Where products sit in rows', 'Flat board on a wall for holding books', 'Ledge inside a cupboard or fridge'],
      hard: ['Left on the ___ (not chosen)', '___ life: how long food keeps'],
    },
    {
      answer: 'MILK',
      easy: ['White drink from the chiller', 'Drink a cow gives', 'What calves and babies drink'],
      hard: ['Splash on the Weet-Bix', 'No use crying over spilt ___'],
    },
    {
      answer: 'BREAD',
      easy: ['Loaf for making sandwiches', 'Toast is made from this', 'Sliced white or wholemeal, in a plastic bag'],
      hard: ['The best thing since sliced ___', 'Dough, after time in the oven?'],
    },
    {
      answer: 'EGGS',
      easy: ['They come in a carton of a dozen', 'Hens lay these', 'Scrambled or poached at breakfast'],
      hard: ['Check none are cracked before buying these', 'Chook\'s contributions to breakfast'],
    },
    {
      answer: 'RICE',
      easy: ['Grains cooked to go with curry', 'Food grown in flooded paddy fields', 'Fried ___ from the Chinese takeaway'],
      hard: ['Sushi staple sold in big bags', 'What Paddy grows?'],
    },
    {
      answer: 'TEA',
      easy: ['Hot drink made with bags', 'Drink brewed from leaves in a pot', 'Green or black hot drink'],
      hard: ['Cuppa; dinner, to some Kiwis', 'Not my cup of ___'],
    },
    {
      answer: 'OATS',
      easy: ['Grains for making porridge', 'Horses love to munch these', 'Main part of muesli'],
      hard: ['Rolled breakfast grains, not dice?', 'Anzac biscuit must-have that gets rolled?'],
    },
    {
      answer: 'SALE',
      easy: ['Time when prices are cut', 'Event with big discounts', 'For ___, as a sign outside a house says'],
      hard: ['Bargain time that sounds like it moves a yacht?', 'Boxing Day rush at the shops'],
    },
    {
      answer: 'LIST',
      easy: ['Note of what to buy', 'Items written one under another, ready to tick off', 'Santa checks it twice'],
      hard: ['Lean over, as a ship; shopping reminder', 'Bucket ___ (things to do one day)'],
    },
    {
      answer: 'CASH',
      easy: ['Notes and coins', 'Money you can hold in your hand', 'What an ATM gives out'],
      hard: ['Ready money in your wallet', '___ cow (a steady money-maker)'],
    },
    {
      answer: 'CARD',
      easy: ['Plastic you tap to pay', 'One of 52 in a pack', 'Eftpos ___, for paying in shops'],
      hard: ['Tap-and-go plastic; birthday greeting', 'Wild ___ (an unpredictable extra entry in a contest)'],
    },
    {
      answer: 'TIN',
      easy: ['Metal can of beans', 'Metal box for biscuits', 'Baking dish for a cake'],
      hard: ['Spaghetti\'s container, or a shiny metal', 'Does exactly what it says on the ___'],
    },
    {
      answer: 'CAN',
      easy: ['Tin of soup', 'Fizzy drinks come in one', 'Watering ___ for the garden'],
      hard: ['Is able to; holds the soup', 'Kick the ___ down the road (put off a problem)'],
    },
    {
      answer: 'JAR',
      easy: ['Glass pot for jam', 'Glass container for honey, with a twist-off lid', 'Cookie ___ you sneak treats from'],
      hard: ['Jolt; peanut butter holder', 'Grate on the nerves; hold the pickles'],
    },
    {
      answer: 'JAM',
      easy: ['Fruity spread for toast', 'Sweet spread on scones with cream', 'Raspberry ___ inside a doughnut'],
      hard: ['Traffic hold-up; berry spread', 'In a ___ (stuck in a tricky spot)'],
    },
    {
      answer: 'HAM',
      easy: ['Sliced meat from the deli', 'Pink meat in a sandwich, from a pig', 'Meat on a pizza with pineapple'],
      hard: ['Over-the-top actor; Christmas glaze job', '___ it up (overact)'],
    },
    {
      answer: 'NUTS',
      easy: ['Peanuts and cashews', 'Squirrels store these for winter', 'Hard-shelled snacks you crack open'],
      hard: ['Crazy; trail-mix favourites', '___ and bolts (the basics)'],
    },
    {
      answer: 'SOAP',
      easy: ['You wash your hands with it', 'Bar that gets slippery in the bath', 'Bubbly stuff for washing'],
      hard: ['TV drama like Shortland Street', 'Bar you can\'t get a drink at?'],
    },
    {
      answer: 'PEAS',
      easy: ['Little green veges, often frozen', 'Green balls that roll off your fork', 'Mushy ___, a British side dish'],
      hard: ['Like two ___ in a pod', 'Pod people, in the vege world?'],
    },
    {
      answer: 'SALT',
      easy: ['White seasoning in a shaker', 'White crystals sprinkled on food', 'Sea water tastes of this'],
      hard: ['Pepper\'s partner; it\'s in the sea', 'Take it with a pinch of ___'],
    },
    {
      answer: 'BEANS',
      easy: ['Baked ones come in a tin', 'Jack swapped a cow for these', 'Coffee is made from these'],
      hard: ['Full of ___ (very lively)', 'Spill the ___ (tell a secret)'],
    },
    {
      answer: 'CHIPS',
      easy: ['Crunchy snack in a packet', 'Hot fried potato sticks', 'Crisps, as Kiwis call them'],
      hard: ['Hot ones come with fish', 'When the ___ are down (in hard times)'],
    },
    {
      answer: 'PASTA',
      easy: ['Spaghetti, penne or macaroni', 'Lasagne and ravioli are kinds of this', 'Food you boil, then drain in a colander'],
      hard: ['Italian staple shaped like bows and shells', 'Penne for your thoughts?'],
    },
    {
      answer: 'PRICE',
      easy: ['How much something costs', 'Number on the tag', 'It goes up when things get dearer'],
      hard: ['What the barcode tells the till', 'Pay the ___ (suffer for a mistake)'],
    },
    {
      answer: 'DELI',
      easy: ['Counter for sliced meats and salads', 'Counter selling olives and salami', 'Shop counter for quiche and coleslaw'],
      hard: ['Counter where cold cuts are sliced to order', 'Where you take a number and wait for salami?'],
    },
    {
      answer: 'FRUIT',
      easy: ['Apples, pears and plums', 'Healthy snack that grows on trees and vines', 'Sweet part of a plant that holds the seeds'],
      hard: ['Reward of hard work, or of a tree', 'Bear ___ (finally pay off)'],
    },
    {
      answer: 'VEGES',
      easy: ['Carrots and broccoli, for short', 'Peas, carrots and pumpkin on your dinner plate, for short', 'Pumpkin and kūmara, for short'],
      hard: ['Kiwi short form for greens and spuds', 'Meat and three ___, a classic Kiwi dinner'],
    },
    {
      answer: 'QUEUE',
      easy: ['Line of people waiting to pay', 'Wait in a line', 'Line of people at the bus stop'],
      hard: ['Line that\'s mostly silent letters?', 'Jump the ___ (push in)'],
    },
    {
      answer: 'DAIRY',
      easy: ['Section for milk, cheese and butter', 'Kind of farm with a milking shed', 'Food made from cow\'s milk'],
      hard: ['Kiwi corner shop; the milk aisle', '___-free (no milk at all)'],
    },
    {
      answer: 'BASKET',
      easy: ['Handheld carrier for a few items', 'Woven carrier for a picnic', 'Little Red Riding Hood carried one'],
      hard: ['Netball hoop; a shopper\'s carry-all', 'Wicker thing you might put all your eggs in'],
    },
    {
      answer: 'CHEESE',
      easy: ['Edam, tasty or mozzarella, for example', 'Mice love it in cartoons', 'Cheddar or brie'],
      hard: ['Say this for the camera!', 'Big ___ (someone important)'],
    },
    {
      answer: 'BAKERY',
      easy: ['Section with fresh bread and buns', 'Shop that sells pies and doughnuts', 'Place where buns and cakes are made'],
      hard: ['Where loaves come out warm', 'Shop that\'s always on a roll?'],
    },
    {
      answer: 'CEREAL',
      easy: ['Breakfast in a box, like cornflakes', 'Crunchy breakfast poured into a bowl', 'Weet-Bix or cornflakes, for example'],
      hard: ['Brekkie that sounds like a TV show in parts?', 'Box that rattles at breakfast'],
    },
    {
      answer: 'PACKET',
      easy: ['Bag of chips or biscuits', 'Small paper bag of seeds', 'Two-minute noodles come in one'],
      hard: ['Small parcel; a lot of money, informally', 'Cost a ___ (be very expensive)'],
    },
    {
      answer: 'CARTON',
      easy: ['Box for milk or eggs', 'Folded cardboard box for juice', 'Big cardboard box for moving house'],
      hard: ['Dozen-egg holder', 'Holder with \'best before\' printed on the side'],
    },
    {
      answer: 'BOTTLE',
      easy: ['Glass or plastic drink container', 'A baby drinks milk from one', 'Message in a ___, washed up on the beach'],
      hard: ['Courage, informally; milk holder', '___ it up (hide your feelings)'],
    },
    {
      answer: 'CHANGE',
      easy: ['Coins you get back after paying', 'Swap one thing for another', 'Get dressed in different clothes'],
      hard: ['Make a difference; coins back from the till', 'A ___ is as good as a holiday'],
    },
    {
      answer: 'TROLLEY',
      easy: ['Wheeled basket you push round the shop', 'Metal cart you push at the supermarket', 'Cart that wheels food along a plane'],
      hard: ['Pusher with one wonky wheel, always?', 'Off your ___ (a bit mad)'],
    },
    {
      answer: 'BANANAS',
      easy: ['Yellow fruit sold in bunches', 'Monkeys love these', 'Long fruits with skins you could slip on'],
      hard: ['Go ___ (get very excited)', 'Crazy, or a bunch at the shop'],
    },
    {
      answer: 'RECEIPT',
      easy: ['Paper slip you get after paying', 'Slip you need to return something', 'Note from a shop listing what you bought'],
      hard: ['Proof of purchase, a bit like this printout!', 'Paper trail from the shop?'],
    },
    {
      answer: 'BARCODE',
      easy: ['Stripy code scanned at the till', 'Black lines printed on a label', 'Lines and numbers on the back of a library book'],
      hard: ['Black-and-white stripes that make a beep', 'Zebra print on every product?'],
    },
    {
      answer: 'SCANNER',
      easy: ['Beeping reader at the checkout', 'Machine that copies a page into a computer', 'Airport machine that checks your bags'],
      hard: ['Self-checkout gadget that reads stripes', 'Reader that only skims?'],
    },
    {
      answer: 'CASHIER',
      easy: ['Person who takes your money at the till', 'Person at the register who says \'Next, please!\'', 'Bank teller, by another name'],
      hard: ['Till operator', 'One who rings you up, without a phone?'],
    },
    {
      answer: 'FREEZER',
      easy: ['Icy cabinet for ice cream and frozen peas', 'Very cold part of the fridge', 'Where ice blocks are made'],
      hard: ['Where fish fingers keep their cool', 'Chest that\'s colder than you\'d think?'],
    },
    {
      answer: 'CHILLER',
      easy: ['Cold section for milk and yoghurt', 'Cold display cabinet for drinks', 'Spooky film that sends shivers down your spine'],
      hard: ['Cool cabinet where the butter waits', 'Thriller that keeps the drinks cold?'],
    },
    {
      answer: 'BUTCHER',
      easy: ['Meat counter worker', 'Shopkeeper who sells chops and mince', 'Tradesperson who cuts lamb chops and makes sausages'],
      hard: ['Sausage seller in a striped apron', 'Mince merchant?'],
    },
    {
      answer: 'PRODUCE',
      easy: ['Fruit and vegetable section', 'Bring out and show, as a ticket', 'Bees ___ honey'],
      hard: ['Make; fresh fruit and veg', 'Farm ___ stalls sell fresh fruit and veg by the roadside'],
    },
    {
      answer: 'YOGHURT',
      easy: ['Creamy dairy snack in a pottle', 'Tangy food made from milk, often fruity', 'Greek ___, thick and plain'],
      hard: ['Pottle with a peel-off lid', 'Lick-the-lid snack?'],
    },
    {
      answer: 'LOLLIES',
      easy: ['Sweets, as Kiwis call them', 'Sweet treats in a party bag', 'Sweets thrown for kids to scramble after'],
      hard: ['Pick \'n\' mix goodies from the dairy that rot your teeth?', 'Sugar-rush providers?'],
    },
    {
      answer: 'CHECKOUT',
      easy: ['Counter where you pay', 'Self-service ___, where you scan things yourself', 'Time to leave a hotel room'],
      hard: ['Have a look at, informally; the shop\'s last stop', 'Final step when buying online'],
    },
    {
      answer: 'SPECIALS',
      easy: ['Discounted items this week', 'Restaurant dishes of the day', 'Things on offer for a short time only'],
      hard: ['Yellow-tag bargains', 'Today\'s ___, chalked on the board'],
    },
    {
      answer: 'SHOPPING',
      easy: ['Going round buying things', 'Window ___ (looking but not buying)', '___ mall, full of stores'],
      hard: ['Retail therapy', 'Spree that empties your wallet'],
    },
    {
      answer: 'SAUSAGES',
      easy: ['Meat links for the barbecue', 'Bangers in a bun', 'Snags you grill on the barbie'],
      hard: ['Snarlers at a sizzle', 'Bangers that don\'t go boom?'],
    },
    {
      answer: 'GROCERIES',
      easy: ['Food and household things you buy', 'Things you unpack into the pantry', 'What gets delivered when you shop online'],
      hard: ['The weekly shop, in a word', 'Pantry fillers'],
    },
    {
      answer: 'BULK BINS',
      easy: ['Scoop-your-own section for nuts and lollies', 'Big see-through containers you scoop from', 'Where you fill paper bags with dried fruit'],
      hard: ['Where you scoop your own scroggin', 'Take as little or as much as you like from these'],
    },
    {
      answer: 'TOOTHPASTE',
      easy: ['Minty stuff squeezed onto a toothbrush', 'Dentists say to use this twice a day', 'Foamy stuff you spit into the sink'],
      hard: ['Tube you squeeze at brushing time', 'Can\'t be put back in the tube, so they say'],
    },
    {
      answer: 'TOMATO SAUCE',
      easy: ['Red stuff squeezed on a pie', 'Red squeeze bottle at a barbecue', 'Sweet red dollop on a burger'],
      hard: ['Kiwi name for ketchup', 'Pie\'s red partner'],
    },
    {
      answer: 'TOILET PAPER',
      easy: ['Rolls sold in big packs for the loo', 'Soft white rolls in the bathroom', 'Wrap someone in this to make a mummy costume'],
      hard: ['What pranksters throw over trees when they \'TP\' a house', 'Roll you\'d hate to run out of?'],
    },
    {
      answer: 'PEANUT BUTTER',
      easy: ['Nutty spread in a jar', 'Brown sandwich spread, smooth or crunchy', 'Goes with jelly in an American sandwich'],
      hard: ['Spread that sticks to the roof of your mouth', 'Spread a dog will lick off its nose for ages'],
    },
  ],
};

export default theme;
