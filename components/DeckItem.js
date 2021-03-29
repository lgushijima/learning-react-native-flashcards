import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {colors} from '../utils/settings'
import {formatDate} from '../utils/helpers'

export default function DeckItem({deck}) {
    const cards = Object.keys(deck.cards)

    return (
        <View style={styles.deckWrapper}>
            <View style={styles.deckLeft}>
                <Text style={styles.deckTitle}>{deck.name}</Text>
                <Text style={styles.deckInfo}>
                    Last Quiz: {formatDate(deck.lastQuiz)}
                </Text>
            </View>

            <Text style={styles.deckCardsInfo}>{cards.length} cards</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    deckWrapper: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        margin: 10,
        marginTop: 5,
        marginBottom: 5,
        borderLeftWidth: 5,
        borderRadius: 10,
        borderColor: colors.primary,
        backgroundColor: colors.primaryLight,
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
