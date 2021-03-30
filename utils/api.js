import {_getDecks, _getCards, _saveDeck, _saveCard} from './_DATA.js'

export function getCards(deckId) {
    return _getCards(deckId)
}

export function getDecks() {
    return _getDecks()
}

export function addDeck(name) {
    return _saveDeck(name)
}
