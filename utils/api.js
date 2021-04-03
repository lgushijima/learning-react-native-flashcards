import {
    _getDecks,
    _getCards,
    _saveDeck,
    _saveCard,
    _removeDeck,
    _saveQuizLog,
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

export function removeDeck(deckId) {
    return _removeDeck(deckId)
}

export function addCard(deckId, question, answer) {
    return _saveCard(deckId, question, answer)
}

export function saveQuizLog(deckId) {
    return _saveQuizLog(deckId)
}
