import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native'

import Icons from 'react-native-vector-icons/FontAwesome5'

import {createStackNavigator} from '@react-navigation/stack'

import {colors} from '../utils/settings'
import Test from './Test'

const Stack = createStackNavigator()

export default class Settings extends Component {
    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        )
    }
}
