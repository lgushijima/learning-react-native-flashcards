import React, {useEffect, useState} from 'react'
import {StatusBar} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'

import {useDispatch, useSelector} from 'react-redux'

import AppModal from './modals/AppModal'
import LoadingModal from './modals/LoadingModal'
import BaseContext from './common/BaseContext'

import {colors} from '../utils/settings'
import {menus} from '../utils/navigation'
import {handleGetDecks} from '../actions/decks'
import {openModal, closeModal} from '../actions/base'

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function Main() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    const base = useSelector(state => state.base)

    const baseContext = {
        modal: {
            open(component, style) {
                dispatch(openModal(component, style))
            },
            close() {
                dispatch(closeModal())
            },
        },
    }

    useEffect(() => {
        baseContext.modal.open(<LoadingModal />)

        dispatch(handleGetDecks()).then(() => {
            setIsLoading(false)
            baseContext.modal.close()
        })
    }, [])

    return (
        <BaseContext.Provider value={baseContext}>
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

            <AppModal {...base} />
        </BaseContext.Provider>
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
