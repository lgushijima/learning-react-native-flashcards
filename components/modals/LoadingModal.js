import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

import {colors} from '../../utils/settings'

export default function LoadingModal({message}) {
    message = message || 'Loading...'
    return (
        <View>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.gray700,
    },
})
