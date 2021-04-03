import React from 'react'
import {View, ScrollView} from 'react-native'
import {useSelector} from 'react-redux'

import DeckListItem from './DeckListItem'
import NoRecords from '../common/NoRecords'

import {screenStyle} from '../../utils/stylesheet'

export default function Decks() {
    const decks = useSelector(state => state.decks)
    const list = Object.keys(decks).sort((a, b) =>
        decks[a].charCodeAt > decks[b].charCodeAt ? 1 : -1,
    )
    return (
        <View style={screenStyle.screenWrapper}>
            {list.length > 0 ? (
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{flex: 1, paddingTop: 10}}>
                    {list.map(deck => (
                        <DeckListItem key={deck} deck={decks[deck]} />
                    ))}
                </ScrollView>
            ) : (
                <NoRecords
                    message={'There are no decks created at the moment!'}
                />
            )}
        </View>
    )
}
