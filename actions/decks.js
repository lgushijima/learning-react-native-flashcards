import {getDecks, addDeck, removeDeck, addCard, saveQuizLog} from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const SAVE_QUIZ_LOG = 'SAVE_QUIZ_LOG'
export const REFRESH = 'REFRESH'

// GET DECKS
function actionGetDecks(decks) {
    return {
        type: GET_DECKS,
        decks,
    }
}
export function handleGetDecks() {
    return dispatch => {
        return getDecks().then(decks => {
            dispatch(actionGetDecks(decks))
        })
    }
}

// ADD DECK
function actionAddDeck(deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}
export function handleAddDecks(name) {
    return dispatch => {
        return addDeck(name).then(deck => {
            dispatch(actionAddDeck(deck))
        })
    }
}

// DELETE DECK
function actionDeleteDeck(deckId) {
    return {
        type: REMOVE_DECK,
        deckId,
    }
}
export function handleDeleteDeck(deckId) {
    return dispatch => {
        return removeDeck(deckId).then(() => {
            dispatch(actionDeleteDeck(deckId))
        })
    }
}

// ADD CARD
function actionAddCard(deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card,
    }
}

export function handleAddCard(deckId, question, answer) {
    return dispatch => {
        return addCard(deckId, question, answer).then(card => {
            dispatch(actionAddCard(deckId, card))
        })
    }
}

// SAVE QUIZ LOG
function actionSaveQuizLog(deckId, lastQuiz) {
    return {
        type: SAVE_QUIZ_LOG,
        deckId,
        lastQuiz,
    }
}

export function handleSaveQuizLog(deckId) {
    return dispatch => {
        return saveQuizLog(deckId).then(lastQuiz => {
            dispatch(actionSaveQuizLog(deckId, lastQuiz))
        })
    }
}
