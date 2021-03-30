import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {colors} from '../utils/settings'

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.loadingWrapper}>
                <Text>Loading...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingWrapper: {
        backgroundColor: colors.white,
        color: colors.gray700,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
