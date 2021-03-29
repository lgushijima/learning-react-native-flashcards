import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function MenuItem({options}) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={options.menuName}
                component={options.menuComponent}
                options={options}
            />
        </Stack.Navigator>
    )
}
