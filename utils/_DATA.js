import AsyncStorage from '@react-native-community/async-storage'
const STORAGE_KEY = 'ushijima:flashcards'

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
        createdAt: new Date().getTime(),
    }
}

function formatCard(question, answer) {
    return {
        id: generateUID(),
        question,
        answer,
        createdAt: new Date().getTime(),
    }
}

export function _getDecks() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            getDataFromStorage().then(decks => {
                res(decks)
            })
        }, 350)
    })
}

export function _getCards(deckId) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            getDataFromStorage().then(decks => {
                res(decks[deckId].cards)
            })
        }, 300)
    })
}

export function _saveDeck(name) {
    return new Promise((res, rej) => {
        const formattedDeck = formatDeck(name)
        setTimeout(() => {
            saveDeck(formattedDeck).then(() => {
                res(formattedDeck)
            })
        }, 750)
    })
}

export function _saveCard(deckId, question, answer) {
    return new Promise((res, rej) => {
        const formattedCard = formatCard(question, answer)
        setTimeout(() => {
            saveCard(deckId, formattedCard).then(() => {
                res(formattedCard)
            })
        }, 500)
    })
}

export function _saveQuizLog(deckId) {
    return new Promise((res, rej) => {
        const time = new Date().getTime()
        setTimeout(() => {
            saveQuizLog(deckId, time).then(() => {
                res(time)
            }, 150)
        })
    })
}

export function _removeDeck(deckId) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            removeData(deckId).then(() => {
                res()
            })
        }, 400)
    })
}

export function _resetData() {
    return new Promise((res, rej) => {
        resetData().then(() => {
            res()
        })
    })
}

export function _addPresetData() {
    return new Promise((res, rej) => {
        getDataFromStorage().then(decks => {
            const data = {
                ...decks,
                ...presetDecks,
            }

            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).then(() => {
                res()
            })
        })
    })
}

function saveDeck(deck) {
    return AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({[deck.id]: deck}),
    )
}

function saveCard(deckId, card) {
    return AsyncStorage.getItem(STORAGE_KEY).then(results => {
        const decks = JSON.parse(results)
        decks[deckId].cards = {
            ...decks[deckId].cards,
            card,
        }

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    })
}

function saveQuizLog(deckId, time) {
    return AsyncStorage.getItem(STORAGE_KEY).then(results => {
        const decks = JSON.parse(results)
        decks[deckId].lastQuiz = time

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    })
}

function getDataFromStorage() {
    return AsyncStorage.getItem(STORAGE_KEY).then(results => {
        return results === null ? {} : JSON.parse(results)
    })
}

function removeData(deckId) {
    return AsyncStorage.getItem(STORAGE_KEY).then(results => {
        const decks = JSON.parse(results)
        decks[deckId] = undefined
        delete decks[deckId]

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    })
}

function resetData() {
    return AsyncStorage.removeItem(STORAGE_KEY)
}

let presetDecks = {
    ['1a']: {
        id: '1a',
        name: 'World War II',
        cards: {
            '11a': {
                id: '11a',
                question:
                    'What two countries were already involved in a military conflict before the beginning of World War II?',
                answer: 'Japan and China',
                createdAt: 1616969385101,
            },
            '12a': {
                id: '12a',
                question: 'What was the longest battle of World War II?',
                answer: 'Battle of the Atlantic',
                createdAt: 1616969385102,
            },
            '13a': {
                id: '13a',
                question: 'What was the first Nazi concentration camp?',
                answer: 'Dachau',
                createdAt: 1616969385103,
            },
            '14a': {
                id: '14a',
                question:
                    'On which beach did the Americans run into a firestorm of resistance during the D-Day landings?',
                answer: 'Omaha',
                createdAt: 1616969385104,
            },
            '15a': {
                id: '15a',
                question: 'What country lost the most lives in World War II?',
                answer: 'Soviet Union',
                createdAt: 1616969385105,
            },
            '16a': {
                id: '16a',
                question:
                    'What was the name of the B-29 bomber that dropped the first atomic bomb on Hiroshima?',
                answer: 'Enola Gay',
                createdAt: 1616969385106,
            },
        },
        lastQuiz: null,
        createdAt: 1616969385100,
    },
    '2a': {
        id: '2a',
        name: 'Do you know Brazil?',
        cards: {
            '21a': {
                id: '21a',
                question: 'In what part of the world is Brazil located?',
                answer: 'South America',
                createdAt: 1616969385201,
            },
            '22a': {
                id: '22a',
                question:
                    'Brazil was discovered by sailors from which country in 1500?',
                answer: 'Portugal',
                createdAt: 1616969385202,
            },
            '23a': {
                id: '33a',
                question: `What is Brazil's official language?`,
                answer: 'Portuguese',
                createdAt: 1616969385203,
            },
            '24a': {
                id: '24a',
                question: 'What city is the capital of Brazil?',
                answer: 'Brasília',
                createdAt: 1616969385204,
            },
            '25a': {
                id: '25a',
                question: 'What is the name of the Brazilian Currency?',
                answer: 'Real',
                createdAt: 1616969385205,
            },
            '26a': {
                id: '26a',
                question:
                    'Football (soccer) is a passion of the Brazilian people. How many times has the country won the FIFA World Cup',
                answer: 'Five',
                createdAt: 1616969385206,
            },
            '27a': {
                id: '27a',
                question:
                    'In what month do the world-famous "Carnaval" festivities happen in Brazil?',
                answer: 'February',
                createdAt: 1616969385207,
            },
            '28a': {
                id: '28a',
                question: 'What is feijoada?',
                answer: 'A stew made of black beans and meat',
                createdAt: 1616969385208,
            },
            '29a': {
                id: '29a',
                question: 'What is the word "carioca" used to describe in Rio?',
                answer: 'Local people',
                createdAt: 1616969385209,
            },
        },
        lastQuiz: null,
        createdAt: 1616969385200,
    },
}
