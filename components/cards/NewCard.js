import React, {useContext, useRef, useState} from 'react'
import {Text, View, Keyboard} from 'react-native'

import {useDispatch} from 'react-redux'
import {useFocusEffect} from '@react-navigation/native'

import {handleAddCard} from '../../actions/decks'

import AppTextInput from '../common/AppTextInput'
import AppButton from '../common/AppButton'
import LoadingModal from '../modals/LoadingModal'
import {useModal} from '../modals/ModalProvider'

import {screenStyle} from '../../utils/stylesheet'
import {colors} from '../../utils/settings'

export default function NewCard(props) {
    const dispatch = useDispatch()
    const questionRef = useRef(null)
    const {closeModal, showLoading} = useModal()

    const {navigation, route} = props

    const {deckId} = route.params

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

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

        if (deckId && question && answer) {
            showLoading('Saving new card...')
            Keyboard.dismiss()

            dispatch(handleAddCard(deckId, question, answer))
                .then(() => {
                    navigation.goBack()
                    closeModal()
                    setAnswer('')
                    setQuestion('')
                })
                .catch(() => {
                    closeModal()
                })
        }
    }

    return (
        <View style={screenStyle.screenWrapper}>
            <View style={screenStyle.screenContent}>
                <Text style={screenStyle.title}>
                    What is the question and the answer for your new card?
                </Text>
                <Text style={[screenStyle.subtitle, {fontStyle: 'italic'}]}>
                    tips: Make sure to keep your question simple and with good
                    keywords on it!
                </Text>

                <Text style={screenStyle.label}>Question</Text>
                <AppTextInput
                    nameRef={questionRef}
                    placeholder={'Type your questions'}
                    value={question}
                    onChange={value => {
                        setQuestion(() => value)
                    }}
                />

                <Text style={screenStyle.label}>Answer</Text>
                <AppTextInput
                    placeholder={'Type the answer'}
                    value={answer}
                    onChange={value => {
                        setAnswer(() => value)
                    }}
                />
            </View>
            <View style={{margin: 30}}>
                <AppButton text={'Submit'} onPress={onAddNewCard} />
            </View>
        </View>
    )
}
