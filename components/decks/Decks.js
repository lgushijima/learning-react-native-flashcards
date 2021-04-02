import React from 'react'
import {View, ScrollView} from 'react-native'
import {useSelector} from 'react-redux'

import {screenStyle} from '../../utils/stylesheet'

import DeckListItem from './DeckListItem'

export default function Decks() {
    const decks = useSelector(state => state.decks)

    return (
        <View style={screenStyle.screenWrapper}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{flex: 1, paddingTop: 10}}>
                {Object.keys(decks).map(deck => (
                    <DeckListItem key={deck} deck={decks[deck]} />
                ))}
            </ScrollView>
        </View>
    )
}
