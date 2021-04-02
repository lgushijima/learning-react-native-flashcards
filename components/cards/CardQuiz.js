import React, {useState} from 'react'
import {Text, View, Button} from 'react-native'

import {useSelector} from 'react-redux'

import {colors} from '../../utils/settings'
import {shuffleArray} from '../../utils/helpers'
import {screenStyle} from '../../utils/stylesheet'

export default function CardQuiz(props) {
    const {navigation, route} = props
    const {deckId} = route.params
    const [step, setStep] = useState(0)

    const deck = useSelector(state => state.decks[deckId])
    const cardIds = Object.keys(deck.cards)

    const suffle = shuffleArray(cardIds)

    const card = deck.cards[suffle[step]]

    return (
        <View style={screenStyle.screenWrapper}>
            <View style={screenStyle.screenContent}>
                <Text style={screenStyle.title}>Quiz {deck.name}</Text>

                {cardIds.length === 0 ? (
                    <Text
                        style={{textAlign: 'center', color: colors.secondary}}>
                        There are no cards created for this deck!
                    </Text>
                ) : (
                    <View>
                        <Text>
                            Card {step + 1} of {cardIds.length}
                        </Text>
                        <View>
                            <Text>{card.question}</Text>
                            <Button
                                title={'Nexy'}
                                onPress={() => {
                                    setStep(step + 1)
                                }}></Button>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}
