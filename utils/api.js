import {_getDecks, _getCards} from './_DATA.js'

export function getCards(deckId) {
    return _getCards(deckId)
}

export function getDecks() {
    return _getDecks()
}
