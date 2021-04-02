import React, {useRef, useState} from 'react'
import {Text, View, Keyboard} from 'react-native'

import {useDispatch} from 'react-redux'
import {useFocusEffect} from '@react-navigation/native'

import {handleAddCard} from '../../actions/decks'

import AppTextInput from '../common/AppTextInput'
import AppButton from '../common/AppButton'

import {screenStyle} from '../../utils/stylesheet'

export default function NewCard(props) {
    const dispatch = useDispatch()
    const questionRef = useRef(null)

    const {navigation, route} = props

    const {deckId} = route.params

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            questionRef.current?.focus()

            return () => {
                Keyboard.dismiss()
            }
        }, []),
    )

    const onAddNewCard = () => {
        const {navigation} = props

        if (isLoading === false && deckId && question && answer) {
            setIsLoading(true)
            Keyboard.dismiss()

            dispatch(handleAddCard(deckId, question, answer))
                .then(() => {
                    navigation.goBack()
                    setAnswer('')
                    setQuestion('')
                    setIsLoading(false)
                })
                .catch(() => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <View style={screenStyle.screenWrapper}>
            <View style={screenStyle.screenContent}>
                <Text style={screenStyle.title}>
                    What is the title of your new deck?
                </Text>

                <AppTextInput
                    nameRef={questionRef}
                    placeholder={'Type your questions'}
                    value={question}
                    onChange={value => {
                        setQuestion(() => value)
                    }}
                    editable={!isLoading}
                />

                <AppTextInput
                    placeholder={'Type the answer'}
                    value={answer}
                    onChange={value => {
                        setAnswer(() => value)
                    }}
                    editable={!isLoading}
                />
            </View>
            <View style={{margin: 30}}>
                <AppButton
                    text={isLoading ? 'Submitting' : 'Submit'}
                    onPress={onAddNewCard}
                />
            </View>
        </View>
    )
}
