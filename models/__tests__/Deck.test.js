const Card = (suit = Suit.Heart, value = 'A') => ({
    suit,
    value
});

const getRandomArbitrary = (min, max) => Math.round(parseInt(Math.random() * (max - min) + min));


const Deck = () => {
    let deck = [];
    const getCardValue = (v) => {
        switch (v) {
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                return v.toString();
        }
    };
    Object
        .values(Suit)
        .forEach(suit => {
            for (let value = 1; value <= 13; value++) {
                const cardValue = getCardValue(value);
                deck.push(Card(suit, cardValue));
            }
        });
    deck.randomize = () => {
        const newDeck = [];
        while (newDeck.length !== 52) {
            const cardIndex = getRandomArbitrary(0, deck.length - 1);
            const card = deck[cardIndex];
            deck.splice(cardIndex, 1);
            newDeck.push(card);
        }
        return newDeck;
    };
    return deck;
};

const Suit = {
    Clubs: 1,
    Diamonds: 2,
    Heart: 3,
    Spades: 4
};

describe('Model - Deck', () => {
    const expectedValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    test('it should contains all deck default cards', () => {
        const deck = Deck();
        Object.values(Suit).forEach((suit) => {
            const suitCards = deck.filter(dc => dc.suit === suit);
            expect(suitCards.length).toBe(13);
            expect(suitCards.every(sc => expectedValues.includes(sc.value)));
        });
    });
    test('it should randomize correctly all deck cards', () => {
        const deck = Deck();
        const firstCard = deck[0];
        const secondCard = deck[1];
        const thirdCard = deck[2];
        const randomizedDeck = deck.randomize();
        expect(randomizedDeck.length).toBe(52);
        expect(randomizedDeck.indexOf(firstCard)).not.toBe(0);
        expect(randomizedDeck.indexOf(secondCard)).not.toBe(1);
        expect(randomizedDeck.indexOf(thirdCard)).not.toBe(2);
    });
});

describe('Model - Card', () => {
    test('it should receive a suit and value', () => {
        const suit = Suit.Heart;
        const value = '9';

        const card = Card(suit, value);
        expect(card.suit).toBe(suit);
        expect(card.value).toBe(value);
    });

    test('it should throw an exception if no a suit or value was provided', () => {
        const card = Card();
        expect(card.suit).toBe(Suit.Heart);
        expect(card.value).toBe('A');
    });
});
