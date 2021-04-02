import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

import AppButton from '../common/AppButton'

import {colors} from '../../utils/settings'

export default function ConfirmModal({
    message,
    yesText = 'Yes',
    onYesPress,
    noText = 'No',
    onNoPress,
}) {
    return (
        <>
            <View style={styles.modalContent}>
                <Text style={{color: colors.text}}>{message}</Text>
            </View>
            <View style={styles.buttonsWrapper}>
                <AppButton
                    text={yesText}
                    onPress={onYesPress}
                    style={[
                        styles.button,
                        {marginRight: 5, backgroundColor: colors.btnPrimary},
                    ]}
                />
                <AppButton
                    text={noText}
                    onPress={onNoPress}
                    style={[
                        styles.button,
                        {marginLeft: 5, backgroundColor: colors.btnSecondary},
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
