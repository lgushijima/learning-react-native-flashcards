import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

import AppButton from '../common/AppButton'

import {colors} from '../../utils/settings'

export default function BasicModal({
    message,
    confirmText = 'Ok',
    onConfirmPress,
}) {
    return (
        <>
            <View style={styles.modalContent}>
                <Text style={{color: colors.text}}>{message}</Text>
            </View>
            <View style={styles.buttonsWrapper}>
                <AppButton
                    text={confirmText}
                    onPress={onConfirmPress}
                    style={[
                        styles.button,
                        {backgroundColor: colors.btnPrimary},
                    ]}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsWrapper: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
})
