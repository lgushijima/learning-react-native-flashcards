import {
    GET_DECKS,
    ADD_DECK,
    ADD_CARD,
    REMOVE_DECK,
    SAVE_QUIZ_LOG,
} from '../actions/decks'

export default function decks(state = {}, action) {
    switch (action.type) {
        case GET_DECKS: {
            return {
                ...action.decks,
            }
        }
        case ADD_DECK: {
            return {
                ...state,
                [action.deck.id]: action.deck,
            }
        }
        case REMOVE_DECK: {
            let decks = {...state}
            delete decks[action.deckId]
            return decks
        }
        case ADD_CARD: {
            const {deckId, card} = action
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: {
                        ...state[deckId].cards,
                        [card.id]: card,
                    },
                },
            }
        }
        case SAVE_QUIZ_LOG: {
            const {deckId, lastQuiz} = action
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    lastQuiz: lastQuiz,
                },
            }
        }
        default:
            return state
    }
}
