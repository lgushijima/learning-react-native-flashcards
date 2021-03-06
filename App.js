import React, {Component} from 'react'

import Main from './components/Main'

//-- redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

import {
    configurePushNotification,
    initScheduleNotifications,
} from './utils/notification'

const store = createStore(reducer, middleware)
configurePushNotification()

class App extends Component {
    componentDidMount() {
        initScheduleNotifications()
    }

    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}

export default App
