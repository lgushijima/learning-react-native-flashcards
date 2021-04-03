import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet} from 'react-native'

import {useDispatch} from 'react-redux'

import {
    getScheduleData,
    saveScheduleData,
    scheduleNotification,
} from '../../utils/notification'

import AppSlider from '../common/AppSlider'
import AppButton from '../common/AppButton'
import {useModal} from '../modals/ModalProvider'

import {resetData, addPresetData} from '../../utils/api'
import {handleGetDecks} from '../../actions/decks'

import {screenStyle} from '../../utils/stylesheet'
import {colors} from '../../utils/settings'

export default function Settings() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [schedule, setSchedule] = useState({
        hours: 0,
        minutes: 0,
    })

    const {closeModal, showBasicModal, showConfirm} = useModal()

    useEffect(() => {
        getScheduleData().then(schedule => {
            setIsLoading(false)
            if (schedule) {
                setSchedule(schedule)
            }
        })
    }, [])

    const onHoursChanged = value => {
        setSchedule(state => {
            return {
                ...state,
                hours: value,
            }
        })
    }

    const onMinutesChanged = value => {
        setSchedule(state => {
            return {
                ...state,
                minutes: value,
            }
        })
    }

    const formatTime = () => {
        return `${schedule.hours}:${schedule.minutes
            .toString()
            .padStart(2, '0')}`
    }

    const onSaveSchedulePress = () => {
        saveScheduleData(schedule).then(() => {
            scheduleNotification().then(() => {
                showBasicModal({
                    message: `Your notification message was updated to be trigged at ${formatTime()}.`,
                    confirmText: 'Ok',
                })
            })
        })
    }

    const onRemoveAllDecksPress = () => {
        showConfirm({
            message: 'Do you really want to delete all existing decks?',
            onYesPress: () => {
                resetData().then(() => {
                    dispatch(handleGetDecks())
                    showBasicModal({
                        message: `All your decks data was removed successfully!`,
                        confirmText: 'Ok',
                    })
                })
            },
            onNoPress: () => {
                closeModal()
            },
        })
    }

    const onAddPresetDecksPress = () => {
        addPresetData().then(() => {
            dispatch(handleGetDecks())
            showBasicModal({
                message: `Preset decks data was added successfully!`,
                confirmText: 'Ok',
            })
        })
    }

    if (isLoading) return null
    return (
        <View style={screenStyle.screenWrapper}>
            <View style={screenStyle.screenContent}>
                <View style={screenStyle.panelWrapper}>
                    <Text style={styles.subtitle}>Notifications</Text>
                    <View style={styles.row}>
                        <Text style={{color: colors.text}}>
                            Notifications messages will be generated at:
                        </Text>
                        <Text style={{color: colors.gray300, fontSize: 13}}>
                            Notifications are generated at a specific time if
                            you hasn't completed at least one quiz for that day.
                        </Text>
                        <AppSlider
                            max={23}
                            unit={'hours'}
                            step={1}
                            value={schedule.hours}
                            onChange={value => onHoursChanged(value)}
                        />

                        <AppSlider
                            max={55}
                            unit={'minutes'}
                            step={5}
                            value={schedule.minutes}
                            onChange={value => onMinutesChanged(value)}
                        />
                    </View>
                    <AppButton
                        text={'Save schedule time'}
                        style={{marginTop: 10}}
                        onPress={onSaveSchedulePress}
                    />
                </View>

                <View style={screenStyle.panelWrapper}>
                    <Text style={styles.subtitle}>Reset</Text>
                    <AppButton
                        text={'Delete all decks from my list'}
                        style={{
                            marginTop: 10,
                            backgroundColor: colors.btnSecondary,
                        }}
                        onPress={onRemoveAllDecksPress}
                    />

                    <AppButton
                        text={'Add preset decks to my list'}
                        style={{
                            marginTop: 10,
                            backgroundColor: colors.btnSecondary,
                        }}
                        onPress={onAddPresetDecksPress}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        color: colors.primary,
        fontWeight: '500',
        fontSize: 18,
        marginBottom: 15,
    },
})
