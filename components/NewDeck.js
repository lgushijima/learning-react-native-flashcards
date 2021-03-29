import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView} from 'react-native'

import {colors} from '../utils/settings'

export default class NewDeck extends Component {
    render() {
        return (
            <View>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <Text>NewDeck</Text>
                </ScrollView>
            </View>
        )
    }
}
