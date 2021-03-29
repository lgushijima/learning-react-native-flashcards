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

export function _saveDeck(deck) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            decks = {
                ...decks,
                [decks.id]: decks,
            }

            res()
        }, 1000)
    })
}

export function _saveCard(deckId, card) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            decks = {
                ...decks,
                [decks.id]: {
                    ...decks[decks.id],
                    cards: {
                        ...decks[decks.id].cards,
                        [card.id]: card,
                    },
                },
            }

            res()
        }, 1000)
    })
}
