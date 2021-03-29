import React, {Component} from 'react'
import {StatusBar} from 'react-native'

import {colors} from './utils/settings'
import {setMenuItem} from './utils/helpers'
import {handleGetDecks} from './actions/decks'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Loading from './components/Loading'
import Decks from './components/Decks'
import Settings from './components/Settings'
import NewDeck from './components/NewDeck'
import MenuItem from './components/MenuItem'

//-- redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

const Tabs = createBottomTabNavigator()

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
        const menuOptions = {
            decks: setMenuItem('Decks', 'bars', Decks),
            newDeck: setMenuItem('New Deck', 'book', NewDeck),
            settings: setMenuItem('Settings', 'cog', Settings),
        }

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
                        <Tabs.Navigator
                            headerMode="none"
                            tabBarOptions={{
                                activeTintColor: colors.primary,
                                inactiveTintColor: colors.gray700,
                            }}>
                            {Object.keys(menuOptions).map(key => {
                                const options = menuOptions[key]
                                return (
                                    <Tabs.Screen
                                        key={key}
                                        name={options.menuName}
                                        options={options}>
                                        {props => (
                                            <MenuItem
                                                {...props}
                                                options={options}
                                            />
                                        )}
                                    </Tabs.Screen>
                                )
                            })}
                        </Tabs.Navigator>
                    )}
                </NavigationContainer>
            </Provider>
        )
    }
}

export default App
