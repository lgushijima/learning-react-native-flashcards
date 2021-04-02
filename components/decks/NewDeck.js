import React, {useRef, useState} from 'react'
import {Text, View, Keyboard} from 'react-native'

import {useDispatch} from 'react-redux'
import {useFocusEffect} from '@react-navigation/native'

import {handleAddDecks} from '../../actions/decks'

import AppTextInput from '../common/AppTextInput'
import AppButton from '../common/AppButton'
import {useModal} from '../modals/ModalProvider'

import {screenStyle} from '../../utils/stylesheet'

export default function NewDeck(props) {
    const dispatch = useDispatch()
    const {closeModal, showLoading} = useModal()
    const nameRef = useRef(null)

    const {navigation} = props
    const [name, setName] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            nameRef.current?.focus()

            return () => {
                Keyboard.dismiss()
            }
        }, []),
    )

    const onAddNewDeck = () => {
        showLoading('Saving new deck...')
        Keyboard.dismiss()

        dispatch(handleAddDecks(name))
            .then(() => {
                navigation.navigate('Decks')
                closeModal()
                setName('')
            })
            .catch(() => {
                closeModal()
            })
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
                />
            </View>
            <View style={{margin: 30}}>
                <AppButton text={'Submit'} onPress={onAddNewDeck} />
            </View>
        </View>
    )
}
