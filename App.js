import React, {Component} from 'react'
import {StatusBar} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'

import {colors} from './utils/settings'
import {menus} from './utils/navigation'
import {handleGetDecks} from './actions/decks'

import Loading from './components/Loading'

//-- redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

class App extends Component {
    state = {
        isLoading: true,
    }

    componentDidMount() {
        const {dispatch} = store
        dispatch(handleGetDecks()).then(() => {
            this.setState(() => ({
                isLoading: false,
            }))
        })
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={colors.primary}
                        translucent={false}
                    />
                    {this.state.isLoading ? (
                        <Loading />
                    ) : (
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
            </Provider>
        )
    }
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

export default App
