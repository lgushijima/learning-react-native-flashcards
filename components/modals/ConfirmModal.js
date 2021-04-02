import React from 'react'
import {Text, View} from 'react-native'

import {screenStyle} from '../utils/stylesheet'

export default function ConfirmModal({text, onYesPress, onNoPress}) {
    return (
        <View>
            <Text>{text}</Text>
        </View>
    )
}
