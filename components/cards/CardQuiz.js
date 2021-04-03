import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet} from 'react-native'

import {useDispatch, useSelector} from 'react-redux'
import Icons from 'react-native-vector-icons/FontAwesome5'

import AppButton from '../common/AppButton'
import CardQuestion from './CardQuestion'
import CardCompleted from './CardCompleted'

import {colors} from '../../utils/settings'
import {shuffleArray} from '../../utils/helpers'
import {screenStyle} from '../../utils/stylesheet'
import {handleSaveQuizLog} from '../../actions/decks'

export default function CardQuiz(props) {
    const dispatch = useDispatch()
    const {navigation, route} = props
    const {deckId} = route.params

    const deck = useSelector(state => state.decks[deckId])
    const cardIds = Object.keys(deck.cards)

    useEffect(() => {
        navigation.setOptions({
            title: deck.name + ' Quiz',
        })
    }, [])

    const [currentStep, setCurrentStep] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
    const [suffledCards, setSuffledCards] = useState(shuffleArray(cardIds))

    const card = deck.cards[suffledCards[currentStep]]
    const totalCards = cardIds.length

    const correctPercentage = parseFloat(
        parseInt(((correctAnswerCount * 100) / totalCards) * 100, 10) / 100,
    ).toFixed(1)

    const onAnswerPress = isCorrectAnswer => {
        const nextStep = currentStep + 1
        setShowAnswer(false)
        setCurrentStep(nextStep)

        if (isCorrectAnswer) setCorrectAnswerCount(correctAnswerCount + 1)

        if (nextStep >= totalCards) {
            dispatch(handleSaveQuizLog(deckId))
        }
    }

    const onResetQuisPress = () => {
        setCurrentStep(0)
        setCorrectAnswerCount(0)
        setShowAnswer(false)
    }

    return (
        <View style={screenStyle.screenWrapper}>
            <View style={screenStyle.screenContent}>
                {totalCards === 0 ? (
                    <View style={styles.noCardsPanel}>
                        <Icons
                            name={'exclamation-triangle'}
                            size={60}
                            color={colors.gray200}
                        />
                        <Text style={styles.noCardsLabel}>
                            There are no cards created for this deck!
                        </Text>
                    </View>
                ) : (
                    <View style={{flex: 1}}>
                        {currentStep < totalCards ? (
                            <>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: colors.primary,
                                    }}>
                                    Card {currentStep + 1} of {totalCards}
                                </Text>

                                <CardQuestion
                                    question={card.question}
                                    answer={card.answer}
                                    showAnswer={showAnswer}
                                    style={{flex: 1}}
                                />
                                <View>
                                    {showAnswer === false ? (
                                        <AppButton
                                            text={'Show Asnwer'}
                                            onPress={() => {
                                                setShowAnswer(true)
                                            }}></AppButton>
                                    ) : (
                                        <View style={screenStyle.rowCentered}>
                                            <AppButton
                                                text={'Correct'}
                                                value={true}
                                                onPress={onAnswerPress}
                                                style={{
                                                    flex: 1,
                                                    marginRight: 5,
                                                }}
                                            />

                                            <AppButton
                                                text={'Incorrect'}
                                                value={false}
                                                onPress={onAnswerPress}
                                                style={{
                                                    flex: 1,
                                                    marginLeft: 5,
                                                    backgroundColor:
                                                        colors.btnSecondary,
                                                }}
                                            />
                                        </View>
                                    )}
                                </View>
                            </>
                        ) : (
                            <CardCompleted
                                correctPercentage={correctPercentage}
                                correctAnswerCount={correctAnswerCount}
                                totalCards={totalCards}
                                onResetQuisPress={onResetQuisPress}
                                onQuitPress={navigation.goBack}
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    noCardsPanel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noCardsLabel: {
        fontSize: 16,
        color: colors.gray300,
        padding: 10,
        textAlign: 'center',
    },
})
