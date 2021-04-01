let decks = {
    vthrdm985a262al8qx3do: {
        id: 'vthrdm985a262al8qx3do',
        name: 'React Native',
        cards: {
            loxhs1bqm25b708cmbf3g: {
                id: 'loxhs1bqm25b708cmbf3g',
                question: 'How to coisar?',
                answer: 'Coisando',
            },
            am8ehyc8byjqgar0jgpub9: {
                id: 'am8ehyc8byjqgar0jgpub9',
                question:
                    'Who magafagar os mafagafinhos bom amafagafigador will be?',
                answer: 'Yes',
            },
        },
        lastQuiz: 1616979385642,
    },
    xj352vofupe1dqz9emx13r: {
        id: 'xj352vofupe1dqz9emx13r',
        name: 'English',
        cards: {},
        lastQuiz: 1616878385642,
    },
}

function generateUID() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    )
}

function formatDeck(name) {
    return {
        id: generateUID(),
        name,
        lastQuiz: null,
        cards: {},
    }
}

function formatCard(question, answer) {
    return {
        id: generateUID(),
        question,
        answer,
    }
}

export function _getDecks() {
    return new Promise((res, rej) => {
        setTimeout(() => res({...decks}), 1000)
    })
}

export function _getCards(deckId) {
    return new Promise((res, rej) => {
        setTimeout(() => res(decks[deckId].cards), 1000)
    })
}

export function _saveDeck(name) {
    return new Promise((res, rej) => {
        const formattedDeck = formatDeck(name)
        setTimeout(() => {
            decks = {
                ...decks,
                [formattedDeck.id]: formattedDeck,
            }

            res(formattedDeck)
        }, 1000)
    })
}

export function _saveCard(deckId, question, answer) {
    return new Promise((res, rej) => {
        const formattedCard = formatCard(deckId, question, answer)
        setTimeout(() => {
            decks = {
                ...decks,
                [deckId]: {
                    ...decks[deckId],
                    cards: {
                        ...decks[deckId].cards,
                        [formattedCard.id]: formattedCard,
                    },
                },
            }

            res(formattedCard)
        }, 1000)
    })
}

export function _removeDeck(deckId) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            delete decks[deckId]

            res()
        }, 1000)
    })
}
