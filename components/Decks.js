import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'

import {colors} from '../utils/settings'

import DeckItem from './DeckItem'
import {connect} from 'react-redux'

class Decks extends Component {
    render() {
        const {decks} = this.props

        return (
            <View style={{flex: 1, backgroundColor: colors.white}}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{flex: 1, paddingTop: 10}}>
                    {Object.keys(decks).map(deck => (
                        <DeckItem key={deck} deck={decks[deck]} />
                    ))}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps({decks}) {
    return {
        decks,
    }
}

export default connect(mapStateToProps)(Decks)
