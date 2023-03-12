// appearance
const SHAPES = ['hearts','diamonds','clubs','spades'];
const VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

// my virtual deck
const DECK = [];

//created here
for (let i = 0; i < SHAPES.length; i++) {
    for (let j = 0; j < VALUES.length; j++) {
        const CARD = {shape: SHAPES[i], value: VALUES[j]};
        DECK.push(CARD);
    }
}

//test my virtual deck
// console.log(DECK[14]);

//shuffle (Fisher-Yates shuffle algorithim)
function shuffleDeck() {
    for (let i = DECK.length - 1; i > 0; i--){
        const J = Math.floor(Math.random() * (i + 1));
        [DECK[i], DECK[J]] = [DECK[J], DECK[i]];
    }
}

//shuffle test
// shuffleDeck();
// console.log(DECK[14].value);

//draw cards
function drawCards(numCards) {
    const DRAWN_CARDS = [];
    for (let i = 0; i < numCards; i++) {
        const DRAWN_CARD = DECK.shift();
         DRAWN_CARDS.push(DRAWN_CARD);
    }
    return DRAWN_CARDS;
}

//test
// const MY_HAND = drawCards(2);
// console.log(MY_HAND);
// console.log(DECK.length);

//create card UI
function createCardUI(deck) {
    //whole card element
    const CARD_EL = document.createElement('div');

    // differentiating black and red cards
    if (deck.shape == 'clubs' || deck.shape == 'spades') {
        CARD_EL.classList.add('cardred');
    } else {
        CARD_EL.classList.add('cardblack');
    }
    
    //card top
    const TOP_EL = document.createElement('div');
    TOP_EL.classList.add('card-top');

    //card top value
    const VALUE_EL = document.createElement('div');
    VALUE_EL.classList.add('card-value');
    VALUE_EL.textContent = deck.value;

    //card top shape
    const SHAPE_EL = document.createElement('div');
    SHAPE_EL.classList.add('card-shape');
    SHAPE_EL.textContent = getShapeSymbol(deck.shape);

    //creating card top
    TOP_EL.appendChild(VALUE_EL);
    TOP_EL.appendChild(SHAPE_EL);
    CARD_EL.appendChild(TOP_EL);

    //card middle
    const MID_EL = document.createElement('div');
    MID_EL.classList.add('card-middle');

    // card middle shape
    const SHAPE_MID_EL = document.createElement('div');
    SHAPE_MID_EL.classList.add('card-midshape');
    SHAPE_MID_EL.textContent = getShapeSymbol(deck.shape);

    // creating card middle
    MID_EL.appendChild(SHAPE_MID_EL);
    CARD_EL.appendChild(MID_EL);

    //card bottom
    const BOTTOM_EL = document.createElement('div');
    BOTTOM_EL.classList.add('card-bottom');

    //card bottom value
    const BOTTOM_VALUE_EL = document.createElement('div');
    BOTTOM_VALUE_EL.classList.add('card-value');
    BOTTOM_VALUE_EL.textContent = deck.value;

    //card bottom shape
    const BOTTOM_SHAPE_EL = document.createElement('div');
    BOTTOM_SHAPE_EL.classList.add('card-shape');
    BOTTOM_SHAPE_EL.textContent = getShapeSymbol(deck.shape);

    //creating card bottom
    BOTTOM_EL.appendChild(BOTTOM_SHAPE_EL);
    BOTTOM_EL.appendChild(BOTTOM_VALUE_EL);
    CARD_EL.appendChild(BOTTOM_EL);

    return CARD_EL;
}

function getShapeSymbol(shape) {
    switch (shape) {
        case 'hearts':
            return `\u2665`;
        case 'diamonds':
            return `\u2666`;
        case 'clubs':
            return `\u2663`;
        case 'spades':
            return `\u2660`;
        default:
            return '';
    }
}

// html test container
// const CONTAINER_EL = document.getElementById('card-container');

// test create single card
// shuffleDeck();
// CONTAINER_EL.appendChild(createCardUI(DECK.shift()));

//create multiple cards
function createCardsUI(deck) {
    const CARDS = deck.map((card, index) => {
        const CARD = createCardUI(card);

        CARD.classList.add(`card-${index}`);

        CARD.setAttribute('draggable', true);

        CARD.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', index);
        });

        return CARD;
    });

    return CARDS;
}

//test create multiple card
// createCardsUI(drawCards(7)).forEach(card => {
//     CONTAINER_EL.appendChild(card);
// });



//gameplay starts here

const RACK = document.querySelector('.rack');
const MAIN = document.querySelector('.main');
const MARKET = document.querySelector('.market');

//making main card a drop zone
MAIN.addEventListener('drop', e => {
    const INDEX = e.dataTransfer.getData('text/plain');
    const CARD = document.querySelector(`.card-${INDEX}`);
    console.log(INDEX);
    
    // CARD.parentNode.removeChild(CARD);
    // MAIN.appendChild(CARD);
});

MAIN.addEventListener('dragover', e => {
    e.preventDefault();
});

//making rack a drop zone
RACK.addEventListener('drop', e => {
    const INDEX = e.dataTransfer.getData('text/plain');
    const CARD = document.querySelector(`.card-${INDEX}`);
    console.log(INDEX);

    // CARD.parentNode.removeChild(CARD);
    // RACK.appendChild(CARD);
});

RACK.addEventListener('dragover', e => {
    e.preventDefault();
});

shuffleDeck();
const MARKETLIST = createCardsUI(drawCards(52));
const RACKLIST = [];
const MAINLIST = [];















