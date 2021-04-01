import React, {useEffect} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import AppButton from './AppButton'

import {colors} from '../utils/settings'
import {screenStyle} from '../utils/stylesheet'
import {formatDate} from '../utils/helpers'

import {handleDeleteDeck} from '../actions/decks'

export default function DeckDetail(props) {
    const dispatch = useDispatch()

    const {navigation, route} = props

    const {deckId} = route.params
    const deck = useSelector(state => state.decks[deckId])
    const cards = Object.keys(deck.cards)

    const onAddNewCard = () => {
        const {navigation} = props
        navigation.navigate('NewCard', {deckId: deck.id})
    }

    const onDeleteDeck = () => {
        const {navigation} = props
        dispatch(handleDeleteDeck(deck.id)).then(() => {
            navigation.navigate('Decks')
        })
    }

    const onStartQuiz = () => {
        const {navigation} = props
        navigation.navigate('Quiz')
    }

    return (
        <View style={screenStyle.screenWrapper}>
            <View style={screenStyle.screenContent}>
                <Text style={screenStyle.title}>{deck.name}</Text>

                <Text
                    style={[
                        styles.cardsInfo,
                        {
                            color:
                                cards.length > 0
                                    ? colors.primary
                                    : colors.secondary,
                        },
                    ]}>
                    {cards.length} cards
                </Text>

                {deck.lastQuiz !== null && (
                    <Text style={styles.deckInfo}>
                        Last Quiz: {formatDate(deck.lastQuiz)}
                    </Text>
                )}

                <View style={styles.buttonsWrapper}>
                    <AppButton
                        text={'Add New Card'}
                        onPress={onAddNewCard}
                        style={{marginTop: 10}}
                    />

                    <AppButton
                        text={'Start Quiz'}
                        onPress={onStartQuiz}
                        style={{marginTop: 10, backgroundColor: colors.gray700}}
                    />

                    <TouchableOpacity
                        onPress={onDeleteDeck}
                        style={styles.deleteBtn}>
                        <Text style={styles.deleteText}>Delete this Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    deckInfo: {
        color: colors.primary,
        fontSize: 13,
        color: colors.gray400,
        textAlign: 'center',
    },
    cardsInfo: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    deleteBtn: {
        padding: 10,
        marginTop: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    deleteText: {
        color: '#db5858',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
