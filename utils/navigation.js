import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome5'
import {colors} from './settings'

import Decks from '../components/Decks'
import Settings from '../components/Settings'
import NewDeck from '../components/NewDeck'
import DeckDetail from '../components/DeckDetail'
import NewCard from '../components/NewCard'
import Quiz from '../components/Quiz'

const menus = []
menus.push(createMenuItem(Decks, 'Decks', 'Decks List', 'list'))
menus.push(createMenuItem(NewDeck, 'NewDeck', 'Add New Deck', 'book-medical'))
menus.push(createMenuItem(Settings, 'Settings', 'Settings', 'cog'))

menus.push(createMenuItem(DeckDetail, 'DeckDetail', 'Deck'))
menus.push(createMenuItem(NewCard, 'NewCard', 'Add New Card'))
menus.push(createMenuItem(Quiz, 'Quiz', 'Quiz'))

export {menus}

function createMenuItem(component, name, title, icon) {
    title = title || name
    return {
        name,
        component,
        type: icon ? 'tab' : 'stack',
        options: icon ? tabMenuOptions(title, icon) : stackMenuOptions(title),
    }
}

function tabMenuOptions(title, icon) {
    return {
        tabBarIcon: ({color}) => {
            return <Icons name={icon} size={20} color={color} />
        },
        tabBarOptions: {
            padding: 10,
        },
        tabBarBadge: null,

        title,
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
            fontWeight: 'normal',
        },
    }
}

function stackMenuOptions(title) {
    return {
        title,
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
            fontWeight: 'normal',
        },
        tabBarButton: () => null,
        tabBarVisible: false,
    }
}
