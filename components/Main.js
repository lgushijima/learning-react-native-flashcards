import React, {useEffect, useState} from 'react'
import {StatusBar} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'

import {useDispatch} from 'react-redux'

import {ModalProvider} from './modals/ModalProvider'

import {colors} from '../utils/settings'
import {menus} from '../utils/navigation'
import {handleGetDecks} from '../actions/decks'

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function Main() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(handleGetDecks()).then(() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <ModalProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={colors.primary}
                    translucent={false}
                />
                {isLoading ? null : (
                    <Stack.Navigator
                        options={{
                            cardOverlayEnabled: true,
                            cardOverlay: () => (
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#F00',
                                    }}
                                />
                            ),
                        }}>
                        <Stack.Screen
                            name="main"
                            options={{
                                title: '',
                                header: () => null,
                            }}
                            component={TabsMenu}
                        />

                        {menus
                            .filter(x => x.type === 'stack')
                            .map(menu => (
                                <Stack.Screen
                                    key={menu.name}
                                    name={menu.name}
                                    options={menu.options}
                                    component={menu.component}
                                />
                            ))}
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </ModalProvider>
    )
}

const TabsMenu = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.primary,
                inactiveTintColor: colors.gray700,
            }}>
            {menus
                .filter(x => x.type === 'tab')
                .map(menu => (
                    <Tabs.Screen
                        key={menu.name}
                        name={menu.name}
                        options={menu.options}>
                        {() => {
                            return (
                                <Stack.Navigator>
                                    <Stack.Screen
                                        key={menu.name}
                                        name={menu.name}
                                        options={menu.options}
                                        component={menu.component}
                                    />
                                </Stack.Navigator>
                            )
                        }}
                    </Tabs.Screen>
                ))}
        </Tabs.Navigator>
    )
}
