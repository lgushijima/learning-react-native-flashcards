import React from 'react'
import {Text, View} from 'react-native'

import {screenStyle} from '../../utils/stylesheet'

export default function Settings() {
    return (
        <View style={screenStyle.screenWrapper}>
            <View style={screenStyle.screenContent}>
                <Text style={screenStyle.title}>Settings</Text>
            </View>
        </View>
    )
}
