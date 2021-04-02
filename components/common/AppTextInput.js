import React from 'react'
import {StyleSheet, TextInput} from 'react-native'

import {colors} from '../../utils/settings'

export default function AppTextInput({
    placeholder,
    value,
    onChange,
    nameRef,
    ...props
}) {
    return (
        <TextInput
            ref={nameRef}
            style={styles.input}
            value={value}
            onChange={e => {
                onChange(e.nativeEvent.text)
            }}
            placeholder={placeholder}
            {...props}
            placeholderTextColor={colors.textLight}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.gray200,
        backgroundColor: colors.white,
        color: colors.text,
        alignItems: 'center',
        height: 50,
        marginBottom: 5,
    },
})
