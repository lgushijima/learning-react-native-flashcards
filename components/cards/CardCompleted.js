import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Animated} from 'react-native'

import Icons from 'react-native-vector-icons/FontAwesome5'

import AppButton from '../common/AppButton'

import {colors} from '../../utils/settings'
import {screenStyle} from '../../utils/stylesheet'

export default function CardCompleted(props) {
    const {
        correctPercentage,
        correctAnswerCount,
        totalCards,
        onResetQuisPress,
        onQuitPress,
    } = props

    const [state, setState] = useState({
        opacity: new Animated.Value(0),
        springY: new Animated.Value(0),
    })

    const animatedStyle = {
        screen: {
            opacity: state.opacity,
        },
        score: {
            transform: [{scale: state.springY}],
        },
    }

    const triggerOpenAnimation = () => {
        Animated.sequence([
            Animated.timing(state.opacity, {
                toValue: 1,
                duration: 300,
                delay: 300,
                useNativeDriver: true,
            }),
            Animated.spring(state.springY, {
                toValue: 0,
                bounciness: 5,
                useNativeDriver: true,
            }),
        ]).start()
    }

    useEffect(() => {
        triggerOpenAnimation()
    }, [props.correctPercentage])

    return (
        <Animated.View
            style={[{flex: 1, flexDirection: 'column'}, animatedStyle.screen]}>
            <View style={screenStyle.colCentered}>
                <Text style={styles.title}>Well done!!!</Text>

                <Text style={styles.info}>
                    You answered correctly {correctAnswerCount} out of{' '}
                    {totalCards} questions.
                </Text>
            </View>

            <View style={[screenStyle.colCentered, {flex: 1}]}>
                <View style={styles.panelScore}>
                    <Text style={styles.scorePercentage}>
                        {correctPercentage}
                    </Text>
                    <Text style={styles.scoreLabel}>%</Text>
                </View>
            </View>

            <View>
                <AppButton text={'Restart Quiz'} onPress={onResetQuisPress} />
                <AppButton
                    text={'Quit'}
                    onPress={onQuitPress}
                    style={{
                        marginTop: 10,
                        backgroundColor: colors.btnSecondary,
                    }}
                />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: colors.text,
        padding: 10,
        textAlign: 'center',
    },

    info: {
        fontSize: 14,
        color: colors.text,
        textAlign: 'center',
    },
    panelScore: {
        flexDirection: 'column',
        borderWidth: 10,
        borderRadius: 500,
        borderColor: colors.gray100,
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scorePercentage: {
        fontSize: 60,
        color: colors.gray300,
        textAlign: 'center',
    },
    scoreLabel: {
        fontSize: 38,
        fontWeight: 'bold',
        color: colors.gray300,
        textAlign: 'center',
        lineHeight: 38,
    },
})
