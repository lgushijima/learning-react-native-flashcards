import {getDecks, addDeck} from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

function actionGetDecks(decks) {
    return {
        type: GET_DECKS,
        decks,
    }
}

function actionAddDecks(deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function handleGetDecks() {
    return dispatch => {
        return getDecks().then(decks => {
            dispatch(actionGetDecks(decks))
        })
    }
}

export function handleAddDecks(name) {
    return dispatch => {
        return addDeck(name).then(deck => {
            dispatch(actionAddDecks(deck))
        })
    }
}
