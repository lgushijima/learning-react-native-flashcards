import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

import Icons from 'react-native-vector-icons/FontAwesome5'
import {colors} from '../../utils/settings'
import {screenStyle} from '../../utils/stylesheet'

export default function CardQuestion({question, answer, showAnswer, ...rest}) {
    return (
        <View {...rest}>
            <View style={styles.panelQuestionWrapper}>
                <Icons
                    style={{textAlign: 'left'}}
                    name={'quote-left'}
                    size={20}
                    color={colors.gray200}
                />

                <Text style={styles.panelQuestion}>{question}</Text>

                <Icons
                    style={{textAlign: 'right'}}
                    name={'quote-right'}
                    size={20}
                    color={colors.gray200}
                />
            </View>
            {showAnswer === true && (
                <View style={screenStyle.colCentered}>
                    <Text style={styles.answerLabel}>Correct Answer:</Text>
                    <Text style={styles.panelAnswer}>{answer}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    panelQuestionWrapper: {
        margin: 20,
    },
    panelQuestion: {
        fontSize: 20,
        color: colors.text,
        padding: 10,
        textAlign: 'center',
    },

    panelAnswer: {
        fontSize: 20,
        color: colors.text,
        textAlign: 'center',
        marginTop: 20,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 100,
    },
    answerLabel: {
        fontSize: 16,
        color: colors.primary,
        textAlign: 'center',
    },
})
