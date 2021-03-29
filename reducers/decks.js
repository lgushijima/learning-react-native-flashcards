import {GET_DECKS, ADD_DECK, ADD_CARD} from '../actions/decks'

export default function decks(state = {}, action) {
    switch (action.type) {
        case GET_DECKS: {
            return {
                ...state,
                ...action.decks,
            }
        }
        case ADD_DECK: {
            return {
                ...state,
                [action.deck.id]: action.deck,
            }
        }
        case ADD_CARD: {
            const {deckId, card} = action
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId].cards,
                    [card.id]: card,
                },
            }
        }
        default:
            return state
    }
}
