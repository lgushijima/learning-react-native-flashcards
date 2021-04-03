import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Slider from '@react-native-community/slider'
import {colors} from '../../utils/settings'

export default function AppSlider({max, unit, step, value, onChange}) {
    return (
        <View style={styles.sliderContainer}>
            <Slider
                style={{flex: 1}}
                step={step}
                value={value}
                minimumValue={0}
                maximumValue={max}
                onValueChange={onChange}></Slider>
            <View style={styles.labels}>
                <Text style={{fontSize: 16, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 12, color: colors.Text}}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    labels: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
