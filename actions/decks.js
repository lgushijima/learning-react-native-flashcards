import {getDecks} from '../utils/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

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
