import React from 'react'
import {Text, View} from 'react-native'

import Icons from 'react-native-vector-icons/FontAwesome5'

import {colors} from '../../utils/settings'
import {screenStyle} from '../../utils/stylesheet'

export default function NoRecords({message, icon = 'exclamation-triangle'}) {
    return (
        <View style={screenStyle.noRecordsPanel}>
            <Icons
                name={'exclamation-triangle'}
                size={60}
                color={colors.gray100}
            />
            <Text style={screenStyle.noRecordsLabel}>{message}</Text>
        </View>
    )
}
