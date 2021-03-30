import React, {Component} from 'react'
import {StyleSheet, Text, View, Keyboard} from 'react-native'
import {connect} from 'react-redux'

import {handleAddDecks} from '../actions/decks'

import AppTextInput from './AppTextInput'
import AppButton from './AppButton'

import {colors} from '../utils/settings'

class NewDeck extends Component {
    state = {
        name: '',
        isLoading: false,
    }

    nameChanged = value => {
        this.setState(() => ({
            name: value,
        }))
    }

    setLoading = isLoading => {
        this.setState(() => ({
            isLoading,
        }))
    }

    addNewDeck = () => {
        const {dispatch, navigation} = this.props
        const {name, isLoading} = this.state

        if (isLoading === false) {
            this.setLoading(true)
            Keyboard.dismiss()

            dispatch(handleAddDecks(name))
                .then(() => {
                    navigation.navigate('Decks')
                    this.setState(() => ({
                        isLoading: false,
                        name: '',
                    }))
                })
                .catch(() => {
                    this.setLoading(false)
                })
        }
    }

    render() {
        const {name, isLoading} = this.state
        return (
            <View style={styles.screenWrapper}>
                <View style={styles.screenContent}>
                    <Text style={styles.title}>
                        What is the title of your new deck?
                    </Text>
                    <AppTextInput
                        placeholder="Deck's name"
                        autoFocus={true}
                        value={name}
                        onChange={this.nameChanged}
                    />
                </View>
                <View style={{margin: 30}}>
                    <AppButton
                        text={isLoading ? 'Submitting' : 'Submit'}
                        onPress={this.addNewDeck}
                    />
                </View>
            </View>
        )
    }
}

export default connect()(NewDeck)

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        margin: 15,
        marginTop: 10,
    },
    screenContent: {
        flexDirection: 'column',
        flexGrow: 1,
    },
    title: {
        fontSize: 30,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 15,
    },
})
