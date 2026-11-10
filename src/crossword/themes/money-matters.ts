import type { Theme } from '../types';

const theme: Theme = {
  id: 'money-matters',
  title: 'Money Matters',
  entries: [
    {
      answer: 'POCKET MONEY',
      easy: ['Cash kids get from their parents each week', 'Weekly cash for little treats, a set amount', 'Spending cash for kids, often a few dollars a week'],
      hard: ['Weekly pay for doing your chores?', 'Kid\'s allowance?'],
    },
    {
      answer: 'PIGGY BANK',
      easy: ['Jar shaped like a pig, for coins', 'Clay pot that holds coins for later', 'Little pot with a slot for your coins'],
      hard: ['Pink saver with a slot in its back?', 'Coin keeper you might have to smash?'],
    },
    {
      answer: 'SAVINGS',
      easy: ['Money you put aside for later', 'Cash you keep rather than spend', 'What you build up by not spending everything'],
      hard: ['Money kept for a rainy day?', 'What a nest egg is made of?'],
    },
    {
      answer: 'COINS',
      easy: ['Round metal money', 'Small metal pieces of money, like a 20c', 'Round, shiny money that jingles in your pocket'],
      hard: ['Heads-or-tails tossers?', 'What jingles in a pocket?'],
    },
    {
      answer: 'CENT',
      easy: ['One-hundredth of a dollar', 'Small coin, a hundred to a dollar', 'Tiny coin worth a fraction of a dollar'],
      hard: ['Hundredth of a dollar, said like \'sent\'?', 'Fifty ___ (half a dollar)'],
    },
    {
      answer: 'DOLLAR',
      easy: ['Main money of New Zealand', 'Coin or note worth 100 cents', 'Currency used in New Zealand and the USA'],
      hard: ['A buck, in slang?', 'You can bet your bottom one?'],
    },
    {
      answer: 'PENNY',
      easy: ['Small, copper-coloured coin', 'Coin you might find in a fountain for a wish', 'Tiny coin that is easy to lose down the couch'],
      hard: ['A ___ for your thoughts', 'The ___ drops (it finally makes sense)'],
    },
    {
      answer: 'CHANGE',
      easy: ['Coins given back when you pay too much', 'Small coins you get back at the shop', 'Loose coins that jingle in your pocket'],
      hard: ['Coins back from the till, or get into other clothes?', 'A ___ is as good as a holiday'],
    },
    {
      answer: 'WALLET',
      easy: ['Small folding holder for cash and cards', 'Little pouch that holds your cards', 'Pocket case for your notes and coins'],
      hard: ['Pocket home for cards and notes?', 'What a pickpocket is after?'],
    },
    {
      answer: 'PURSE',
      easy: ['Small bag for coins and notes', 'Bag with a clasp top for your coins', 'Little bag you carry your change in'],
      hard: ['Coin holder in a handbag?', 'Hold the ___ strings (control the money)'],
    },
    {
      answer: 'SHOPPING',
      easy: ['Buying things at a store', 'Going out to buy food and clothes', 'Visiting the stores with a list'],
      hard: ['Retail therapy?', '___ list (milk, bread, eggs...)'],
    },
    {
      answer: 'TROLLEY',
      easy: ['Wheeled cart you push around the big food store', 'Metal cart for groceries, with a wobbly wheel', 'Basket on wheels for your food'],
      hard: ['Supermarket cart with one wonky wheel?', 'Off your ___ (a bit mad)'],
    },
    {
      answer: 'BASKET',
      easy: ['Woven container for carrying shopping or eggs', 'Little carrier you hold on the crook of your arm', 'What Red Riding Hood carried goodies to Grandma in'],
      hard: ['Don\'t put all your eggs in one ___', 'Hand-held carrier for a quick shop?'],
    },
    {
      answer: 'BARGAIN',
      easy: ['Something bought for much less than it is worth', 'Good deal, cheap and cheerful', 'Great value at the shops'],
      hard: ['A real steal?', 'Into the ___ (as an extra)'],
    },
    {
      answer: 'DISCOUNT',
      easy: ['Take-off from the usual price', 'Less money to pay because of a special offer', 'Marked-down price on a jumper'],
      hard: ['Money off?', 'Ten per cent off, e.g.'],
    },
    {
      answer: 'SALE',
      easy: ['Time when shops cut their prices', 'Cheap-price event at the shop', 'Event with signs in the window and lower prices'],
      hard: ['Boxing Day event at the shops?', 'For ___ (sign outside a house)'],
    },
    {
      answer: 'PRICE TAG',
      easy: ['Little label showing what something costs', 'Ticket on a shop item with the cost', 'Dangling sticker that says how much'],
      hard: ['Label that tells you the damage?', 'What you check before falling in love with a jacket?'],
    },
    {
      answer: 'RECEIPT',
      easy: ['Printed slip that shows what you bought', 'Paper proof of a purchase from the shop', 'Proof-of-purchase slip you keep in case you must take it back'],
      hard: ['Proof you paid, a bit like this printout?', 'Slip the till prints?'],
    },
    {
      answer: 'TILL',
      easy: ['Cash register at the shop', 'Machine at the counter that holds the money', 'Drawer in the shop where the cash is kept'],
      hard: ['Cash drawer at the counter?', 'Up ___ now (so far)'],
    },
    {
      answer: 'CASHIER',
      easy: ['Person who takes your money at the shop', 'Shop worker who scans your groceries and says thanks', 'Worker who rings up your purchases'],
      hard: ['Checkout operator?', 'Person who asks \'Cash or card?\''],
    },
    {
      answer: 'SUPERMARKET',
      easy: ['Big shop selling food and household things', 'Large food store with a car park out front', 'Huge shop where you fill up on groceries'],
      hard: ['Where the weekly shop happens?', 'Big store of aisles and trolleys?'],
    },
    {
      answer: 'LOLLIES',
      easy: ['Sweets on a stick or in a bag, NZ-style', 'Kiwi word for sweets handed out at a party', 'Pineapple chunks and jelly snakes, in Kiwi talk'],
      hard: ['Sweets, to a Kiwi?', 'What a dollar mixture is a bag of?'],
    },
    {
      answer: 'BUY',
      easy: ['Pay money to get something', 'Purchase something from a shop', 'Get something by paying for it'],
      hard: ['___ one, get one free', 'Opposite of sell?'],
    },
    {
      answer: 'SELL',
      easy: ['Give something away for money', 'Hand over goods in exchange for cash', 'Offer something for money, like a stall'],
      hard: ['Buy low, ___ high', 'What a shopkeeper does?'],
    },
    {
      answer: 'SPEND',
      easy: ['Use up your money', 'Pay out cash for things you want', 'Use your pocket money on sweets'],
      hard: ['What you do with pocket money at the dairy?', 'Opposite of save?'],
    },
    {
      answer: 'EARN',
      easy: ['Get paid for your work or chores', 'Make money by doing a job', 'Collect pay for doing a good day of work'],
      hard: ['Get paid for a job?', 'What chores help you do with pocket money?'],
    },
    {
      answer: 'PAYDAY',
      easy: ['When wages land in the bank', 'Time when the boss hands over the cash', 'Fortnightly moment of joy in the account'],
      hard: ['Best day of the fortnight for a worker?', 'When wages arrive?'],
    },
    {
      answer: 'BUDGET',
      easy: ['Plan of how much to spend', 'Plan for money coming in and going out', 'Plan that stops you spending too much'],
      hard: ['Spending plan?', 'The Government announces one every year'],
    },
    {
      answer: 'COUPON',
      easy: ['Piece of paper that gives you a discount', 'Money-off voucher to cut a price', 'Small printed slip that gets you a deal'],
      hard: ['Money-off voucher?', 'Clip-out slip for a cheaper price?'],
    },
    {
      answer: 'REFUND',
      easy: ['Money given back after you return something', 'Cash back when a shop takes goods back', 'Getting your money back after a return'],
      hard: ['Money back for a faulty toaster?', 'What you ask for with a receipt?'],
    },
    {
      answer: 'BILL',
      easy: ['Piece of paper that shows what you owe', 'Restaurant\'s list of what you ate', 'Paper that asks you to pay for power or water'],
      hard: ['Foot the ___ (pay up)', 'Duck\'s beak, or what the waiter brings?'],
    },
    {
      answer: 'COST',
      easy: ['How much something is priced at', 'Price of something you want to buy', 'The amount you pay for a thing'],
      hard: ['Price to pay?', 'It might be \'an arm and a leg\'?'],
    },
    {
      answer: 'VALUE',
      easy: ['Good ___ for money', 'Worth of something, in money or meaning', 'Face ___: what\'s printed on a banknote or coin'],
      hard: ['Face ___ (how things first appear)', 'What something is worth?'],
    },
    {
      answer: 'TOTAL',
      easy: ['Full amount when you add it all up', 'Sum at the bottom of the bill', 'Everything added together'],
      hard: ['Grand ___ at the bottom of the bill', 'All added up?'],
    },
    {
      answer: 'FORTUNE',
      easy: ['Huge amount of money', 'Heaps of money, like a billionaire has', 'Lot of cash, the kind that makes you rich'],
      hard: ['___ cookie (biscuit with a message)', 'Cost a ___ (be very expensive)'],
    },
    {
      answer: 'JACKPOT',
      easy: ['Big prize that someone wins in a lottery', 'Top prize that grows and grows', 'Biggest prize at the end of a game show'],
      hard: ['Lotto\'s top prize?', 'Hit the ___ (strike it lucky)'],
    },
    {
      answer: 'BARTER',
      easy: ['Swapping one thing for another, without money', 'Trade goods instead of paying with cash', 'Swap your toys for a friend\'s toys, no money'],
      hard: ['Swap goods with no money involved?', 'Trade a sandwich for a biscuit, say?'],
    },
    {
      answer: 'CARD',
      easy: ['Plastic you tap to pay for things', 'Plastic that holds your details and makes payments', 'Stiff piece of paper with a message inside'],
      hard: ['Tap-and-go plastic?', 'Birthday greeting, or a way to pay?'],
    },
    {
      answer: 'DOSH',
      easy: ['Money, in slang', 'Cash, in British and NZ talk', 'Slang for money; rhymes with posh'],
      hard: ['Money, in slang that rhymes with \'posh\'?', 'Cash, casually?'],
    },
    {
      answer: 'TREASURE',
      easy: ['Gold, jewels or other valuable things', 'Pirate\'s hidden loot', 'Buried stash of gold coins'],
      hard: ['What X marks on a pirate map?', 'Chest contents?'],
    },
    {
      answer: 'TIP',
      easy: ['Extra money you give a waiter for good service', 'Little bonus for a helpful server', 'Extra cash to thank someone who served you'],
      hard: ['Extra for the waiter?', 'Rubbish dump, or a helpful hint?'],
    },
    {
      answer: 'AISLE',
      easy: ['Path between the rows of stuff in a store', 'Walkway down the middle of a shop', 'Row you walk down to find the cereal'],
      hard: ['Supermarket lane?', 'Walk down the ___ (get married)'],
    },
    {
      answer: 'LABEL',
      easy: ['Sticker that names or prices an item', 'Tag stuck on a jar to show what is inside', 'Printed sticker on a box with the details'],
      hard: ['Sticker on a jar?', 'Designer ___ (fancy brand)'],
    },
    {
      answer: 'SHELF',
      easy: ['Flat board on a wall for holding things', 'Ledge where the cans sit in the pantry', 'Board that holds your books and stuff'],
      hard: ['Where tins wait to be bought?', '___ life (how long food keeps)'],
    },
    {
      answer: 'KIWI',
      easy: ['NZ bird that cannot fly', 'Flightless bird on the $1 coin', 'Egg-laying bird with a long beak, found in New Zealand'],
      hard: ['Bird on the one-dollar coin?', 'NZ dollar, to money traders?'],
    },
    {
      answer: 'CHECKOUT',
      easy: ['Where you pay for your shopping', 'Till where you pay at the shop', 'Counter where your shopping gets scanned'],
      hard: ['Where the beeping happens at the supermarket?', 'Self-___ (scan it yourself)'],
    },
    {
      answer: 'QUEUE',
      easy: ['Line of people waiting their turn', 'Line at the shop, waiting to pay', 'Wait your turn in a long line'],
      hard: ['Line that\'s mostly silent letters?', 'Jump the ___ (push in)'],
    },
    {
      answer: 'GROCERIES',
      easy: ['Food and household bits from a shop', 'Food and drink bought for the week', 'Things you buy for the fridge and pantry'],
      hard: ['The weekly shop?', 'Bags of food in the boot?'],
    },
    {
      answer: 'CHARITY',
      easy: ['Giving money or goods to help people in need', 'Good cause that collects donations', 'Helping others, with money or time'],
      hard: ['___ begins at home, they say', 'Good cause with a collection tin?'],
    },
    {
      answer: 'WISHLIST',
      easy: ['Birthday hopes jotted down for the family to see', 'What you write for Santa, naming each toy you hope for', 'Items saved on a shopping site, to buy one day'],
      hard: ['What you\'d love for your birthday, written down?', 'Letter to Santa, basically?'],
    },
    {
      answer: 'NOTES',
      easy: ['Paper money that comes in different colours', 'Kiwi word for paper money', 'Fives, tens and twenties in your wallet'],
      hard: ['Paper money?', 'Fives, tens and twenties, or music on a page?'],
    },
    {
      answer: 'DEPOSIT',
      easy: ['Put money into a bank account', 'Some cash paid up front to hold something', 'Sum paid upfront to reserve a campervan'],
      hard: ['Money down to hold something?', 'Pay into the bank?'],
    },
    {
      answer: 'DEAL',
      easy: ['Agreement you shake hands on', 'Good offer at a good price', 'Arrangement between two people, with a price'],
      hard: ['It\'s a ___! (said with a handshake)', 'Hand out the cards?'],
    },
    {
      answer: 'TRADE',
      easy: ['Swap goods or services with someone', 'Job that needs tools, like a plumber', 'Exchange one thing for another'],
      hard: ['Swap?', 'Plumbing or building, e.g.'],
    },
    {
      answer: 'HAGGLE',
      easy: ['Argue over the price to get a better deal', 'Bargain hard over the cost', 'Ask for a lower price with a friendly argument'],
      hard: ['Bargain at a market stall?', 'Argue the price down?'],
    },
    {
      answer: 'FIVER',
      easy: ['Five-dollar note', 'A note worth five', 'Five-dollar note in your wallet'],
      hard: ['Sir Ed\'s note, in slang?', '$5, casually?'],
    },
    {
      answer: 'RICHES',
      easy: ['Lots and lots of money', 'Huge pile of cash and gold', 'Great wealth, the kind that buys a castle'],
      hard: ['Rags to ___', 'Great wealth?'],
    },
  ],
};

export default theme;
