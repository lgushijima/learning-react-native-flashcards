import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/core'

import {colors} from '../../utils/settings'
import {formatDate} from '../../utils/helpers'

export default function DeckListItem({deck}) {
    const cards = Object.keys(deck.cards)
    const navigation = useNavigation()

    const onCardClick = deck => {
        navigation.navigate('DeckDetail', {deckId: deck.id})
    }

    return (
        <TouchableOpacity
            onPress={() => {
                onCardClick(deck)
            }}>
            <View style={styles.deckWrapper}>
                <View style={styles.deckLeft}>
                    <Text style={styles.deckTitle}>{deck.name}</Text>
                    {deck.lastQuiz !== null && (
                        <Text style={styles.deckInfo}>
                            Last Quiz: {formatDate(deck.lastQuiz)}
                        </Text>
                    )}
                </View>

                <Text
                    style={[
                        styles.deckCardsInfo,
                        {
                            color:
                                cards.length > 0
                                    ? colors.primary
                                    : colors.secondary,
                        },
                    ]}>
                    {cards.length} cards
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    deckWrapper: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        marginTop: 5,
        marginBottom: 5,
        borderLeftWidth: 5,
        borderRadius: 10,
        borderColor: colors.primary,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deckLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    deckTitle: {
        color: colors.primary,
        fontSize: 16,
    },
    deckInfo: {
        color: colors.primary,
        fontSize: 13,
        color: colors.gray400,
    },
    deckCardsInfo: {color: colors.primary},
})
