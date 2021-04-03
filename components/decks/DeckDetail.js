import React, {useContext, useEffect} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import Icons from 'react-native-vector-icons/FontAwesome5'

import AppButton from '../common/AppButton'
import {useModal} from '../modals/ModalProvider'

import {colors} from '../../utils/settings'
import {screenStyle} from '../../utils/stylesheet'
import {formatDate} from '../../utils/helpers'

import {handleDeleteDeck} from '../../actions/decks'

export default function DeckDetail(props) {
    const {navigation, route} = props
    const {deckId} = route.params

    const deck = useSelector(state => state.decks[deckId])
    const dispatch = useDispatch()
    const {closeModal, showLoading, showConfirm} = useModal()

    const cards = deck ? Object.keys(deck.cards) : null

    useEffect(() => {
        if (deck) {
            navigation.setOptions({
                title: deck.name + ' Deck',
            })
        }
    }, [])

    const onAddNewCard = () => {
        navigation.navigate('NewCard', {deckId: deck.id})
    }

    const onDeleteDeck = () => {
        showConfirm({
            message: 'Do you really want to delete this Deck?',
            onYesPress: () => {
                showLoading('Deleting deck...')

                dispatch(handleDeleteDeck(deck.id)).then(() => {
                    navigation.navigate('Decks')
                    closeModal()
                })
            },
            onNoPress: () => {
                closeModal()
            },
        })
    }

    const onStartQuiz = () => {
        navigation.navigate('Quiz', {deckId: deck.id})
    }

    if (!deck) return null

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
                        <Icons name={'trash'} size={15} color={'#db5858'} />
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
        color: colors.textLight,
        textAlign: 'center',
    },
    cardsInfo: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    deleteBtn: {
        padding: 10,
        marginTop: 60,
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
