import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

import {colors} from '../../utils/settings'

export default function AppButton({text, onPress, style, value}) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={() => {
                if (typeof onPress === 'function') {
                    onPress(value)
                }
            }}>
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
