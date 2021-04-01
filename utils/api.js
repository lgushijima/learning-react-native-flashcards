import {
    _getDecks,
    _getCards,
    _saveDeck,
    _saveCard,
    _removeDeck,
} from './_DATA.js'

export function getCards(deckId) {
    return _getCards(deckId)
}

export function getDecks() {
    return _getDecks()
}

export function addDeck(name) {
    return _saveDeck(name)
}

export function removeDeck(id) {
    return _removeDeck(id)
}

export function addCard(deckId, question, answer) {
    return _saveCard(deckId, question, answer)
}
