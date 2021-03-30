import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

import {colors} from '../utils/settings'

export default function AppButton({text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        elevation: 8,
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    buttonText: {
        color: colors.white,
    },
})
