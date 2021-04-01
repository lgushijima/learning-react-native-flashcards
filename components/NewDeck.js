import React, {useRef, useState} from 'react'
import {Text, View, Keyboard} from 'react-native'

import {useDispatch} from 'react-redux'
import {useFocusEffect} from '@react-navigation/native'

import {handleAddDecks} from '../actions/decks'

import AppTextInput from './AppTextInput'
import AppButton from './AppButton'

import {screenStyle} from '../utils/stylesheet'

export default function NewDeck(props) {
    const dispatch = useDispatch()
    const nameRef = useRef(null)

    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            nameRef.current?.focus()

            return () => {
                Keyboard.dismiss()
            }
        }, []),
    )

    const onAddNewDeck = () => {
        const {navigation} = props

        if (isLoading === false && name) {
            setIsLoading(true)
            Keyboard.dismiss()

            dispatch(handleAddDecks(name))
                .then(() => {
                    navigation.navigate('Decks')
                    setName('')
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
                    nameRef={nameRef}
                    placeholder={"Deck's name"}
                    value={name}
                    onChange={value => {
                        setName(() => value)
                    }}
                    editable={!isLoading}
                />
            </View>
            <View style={{margin: 30}}>
                <AppButton
                    text={isLoading ? 'Submitting' : 'Submit'}
                    onPress={onAddNewDeck}
                />
            </View>
        </View>
    )
}
