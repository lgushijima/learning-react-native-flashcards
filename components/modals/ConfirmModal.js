import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

import AppButton from '../common/AppButton'

import {colors} from '../../utils/settings'

export default function ConfirmModal({message, onYesPress, onNoPress}) {
    return (
        <View>
            <Text>{message}</Text>
            <View style={styles.buttonsWrapper}>
                <AppButton
                    text={'Yes'}
                    onPress={onYesPress}
                    style={[
                        styles.button,
                        {backgroundColor: colors.btnPrimary},
                    ]}
                />
                <AppButton
                    text={'No'}
                    onPress={onNoPress}
                    style={[
                        styles.button,
                        {backgroundColor: colors.btnSecondary},
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: 10,
        flex: 1,
    },
})
