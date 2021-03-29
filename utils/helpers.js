import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome5'
import {colors} from './settings'

export function setMenuItem(menuName, iconName, menuComponent) {
    let menuItem = {
        menuName,
        menuComponent,
        tabBarIcon: ({color}) => {
            return <Icons name={iconName} size={20} color={color} />
        },
        tabBarOptions: {
            padding: 10,
        },
        tabBarBadge: null,

        title: menuName,
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
            fontWeight: 'normal',
        },
    }

    return menuItem
}

export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + ' | ' + d.toLocaleDateString()
}
