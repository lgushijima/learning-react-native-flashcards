import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'
import {Platform} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_KEY = 'ushijima:flashcards-notification'
const CHANNEL_ID = 'ushijima:flashcards-notification'

//-- documentation
//-- https://github.com/zo0r/react-native-push-notification

export const configurePushNotification = () => {
    if (Platform.OS !== 'ios') {
        PushNotification.createChannel({
            channelId: CHANNEL_ID,
            channelName: 'Flashcards App',
            channelDescription: `Ushijima's flashcard application`,
            playSound: true,
            soundName: 'default',
            importance: 4,
            vibrate: true,
        })
    }

    PushNotification.configure({
        onRegister: function (token) {
            console.log('TOKEN:', token)
        },

        onNotification: function (notification) {
            console.log('onNotification - NOTIFICATION:', notification)

            notification.finish(PushNotificationIOS.FetchResult.NoData)
        },

        onAction: function (notification) {
            console.log('onAction - ACTION:', notification.action)
            console.log('onAction - NOTIFICATION:', notification)
        },

        onRegistrationError: function (err) {
            console.error(err.message, err)
        },

        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
    })
}

export const initScheduleNotifications = () => {
    return AsyncStorage.getItem(STORAGE_KEY).then(schedule => {
        if (schedule === null) {
            const defaultSchedule = {
                hours: 18,
                minutes: 0,
            }

            AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(defaultSchedule),
            ).then(() => {
                scheduleNotification()
            })
        }
    })
}

export const scheduleNotification = () => {
    return AsyncStorage.getItem(STORAGE_KEY).then(schedule => {
        const scheduleData = JSON.parse(schedule)

        const nextSchedule = new Date()
        nextSchedule.setDate(nextSchedule.getDate() + 1)
        nextSchedule.setHours(scheduleData.hours)
        nextSchedule.setMinutes(scheduleData.minutes)

        PushNotification.cancelAllLocalNotifications()

        PushNotification.localNotificationSchedule({
            channelId: Platform.OS !== 'ios' ? CHANNEL_ID : null,
            title: 'Flashcards Reminder!',
            message: `Hey! Don't forget to complete a quiz today!`,
            date: nextSchedule,
            allowWhileIdle: false,
            playSound: true,
        })
    })
}

export const clearLocalNotification = () => {
    PushNotification.cancelAllLocalNotifications()
}

export const getScheduleData = () => {
    return AsyncStorage.getItem(STORAGE_KEY).then(schedule => {
        return schedule === null ? {} : JSON.parse(schedule)
    })
}

export const saveScheduleData = schedule => {
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schedule))
}
