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
        resetData().then(() => {
            saveDeck(presetDecks).then(() => {
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
    return AsyncStorage.setItem(STORAGE_KEY, null)
}

let presetDecks = {
    '2vthrdm985a262al8qx3do': {
        id: '2vthrdm985a262al8qx3do',
        name: 'World War II',
        cards: {
            '1loxhs1bqm25b708cmbf3g': {
                id: '1loxhs1bqm25b708cmbf3g',
                question:
                    'What two countries were already involved in a military conflict before the beginning of World War II?',
                answer: 'Japan and China',
                createdAt: 1616969385642,
            },
            '2am8ehyc8byjqgar0jgpub9': {
                id: '2am8ehyc8byjqgar0jgpub9',
                question: 'What was the longest battle of World War II?',
                answer: 'Battle of the Atlantic',
                createdAt: 1616969385642,
            },
            '3m7de1znrmgmdj8hfybsgi': {
                id: '3m7de1znrmgmdj8hfybsgi',
                question: 'What was the first Nazi concentration camp?',
                answer: 'Dachau',
                createdAt: 1616969385642,
            },
            '4zn1rrkzxit4s81zt4c8hq': {
                id: '4zn1rrkzxit4s81zt4c8hq',
                question:
                    'On which beach did the Americans run into a firestorm of resistance during the D-Day landings?',
                answer: 'Omaha',
                createdAt: 1616969385642,
            },
            '5chvj3oke09o1mjq9pq1gq5': {
                id: '5chvj3oke09o1mjq9pq1gq5',
                question: 'What country lost the most lives in World War II?',
                answer: 'Soviet Union',
                createdAt: 1616969385642,
            },
            '6m5se0d464wrq04jib7ulu': {
                id: '6m5se0d464wrq04jib7ulu',
                question:
                    'What was the name of the B-29 bomber that dropped the first atomic bomb on Hiroshima?',
                answer: 'Enola Gay',
                createdAt: 1616969385642,
            },
        },
        lastQuiz: 1616979385642,
        createdAt: 1616969385642,
    },
}
