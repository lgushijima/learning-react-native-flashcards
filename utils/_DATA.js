import AsyncStorage from '@react-native-community/async-storage'
const STORAGE_KEY = '@flashcard-decks'

// let decks = {
//     '2vthrdm985a262al8qx3do': {
//         id: '2vthrdm985a262al8qx3do',
//         name: 'World War II',
//         cards: {
//             '1loxhs1bqm25b708cmbf3g': {
//                 id: '1loxhs1bqm25b708cmbf3g',
//                 question:
//                     'What two countries were already involved in a military conflict before the beginning of World War II?',
//                 answer: 'Japan and China',
//             },
//             '2am8ehyc8byjqgar0jgpub9': {
//                 id: '2am8ehyc8byjqgar0jgpub9',
//                 question: 'What was the longest battle of World War II?',
//                 answer: 'Battle of the Atlantic',
//             },
//             '3m7de1znrmgmdj8hfybsgi': {
//                 id: '3m7de1znrmgmdj8hfybsgi',
//                 question: 'What was the first Nazi concentration camp?',
//                 answer: 'Dachau',
//             },
//             '4zn1rrkzxit4s81zt4c8hq': {
//                 id: '4zn1rrkzxit4s81zt4c8hq',
//                 question:
//                     'On which beach did the Americans run into a firestorm of resistance during the D-Day landings?',
//                 answer: 'Omaha',
//             },
//             '5chvj3oke09o1mjq9pq1gq5': {
//                 id: '5chvj3oke09o1mjq9pq1gq5',
//                 question: 'What country lost the most lives in World War II?',
//                 answer: 'Soviet Union',
//             },
//             '6m5se0d464wrq04jib7ulu': {
//                 id: '6m5se0d464wrq04jib7ulu',
//                 question:
//                     'What was the name of the B-29 bomber that dropped the first atomic bomb on Hiroshima?',
//                 answer: 'Enola Gay',
//             },
//         },
//         lastQuiz: 1616979385642,
//     },
//     '1xj352vofupe1dqz9emx13r': {
//         id: '1xj352vofupe1dqz9emx13r',
//         name: 'English',
//         cards: {},
//         lastQuiz: null,
//     },
// }

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
        getDataFromStorage().then(decks => {
            setTimeout(() => res({...decks}), 350)
        })
    })
}

export function _getCards(deckId) {
    return new Promise((res, rej) => {
        getDataFromStorage().then(decks => {
            setTimeout(() => res(decks[deckId].cards), 300)
        })
    })
}

export function _saveDeck(name) {
    return new Promise((res, rej) => {
        const formattedDeck = formatDeck(name)
        getDataFromStorage().then(decks => {
            setTimeout(() => {
                decks = {
                    ...decks,
                    [formattedDeck.id]: formattedDeck,
                }

                saveToStorage(decks)

                res(formattedDeck)
            }, 750)
        })
    })
}

export function _saveCard(deckId, question, answer) {
    return new Promise((res, rej) => {
        const formattedCard = formatCard(question, answer)
        getDataFromStorage().then(decks => {
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

                saveToStorage(decks)

                res(formattedCard)
            }, 500)
        })
    })
}

export function _saveQuizLog(deckId) {
    return new Promise((res, rej) => {
        const time = new Date().getTime()
        getDataFromStorage().then(decks => {
            setTimeout(() => {
                decks = {
                    ...decks,
                    [deckId]: {
                        ...decks[deckId],
                        lastQuiz: time,
                    },
                }

                saveToStorage(decks)

                res(time)
            }, 150)
        })
    })
}

export function _removeDeck(deckId) {
    return new Promise((res, rej) => {
        getDataFromStorage().then(decks => {
            setTimeout(() => {
                delete decks[deckId]
                saveToStorage(decks)
                res()
            }, 400)
        })
    })
}

async function saveToStorage(decks) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
}

async function getDataFromStorage() {
    const jsonData = await AsyncStorage.getItem(STORAGE_KEY)
    return jsonData ? JSON.parse(jsonData) : {}
}
