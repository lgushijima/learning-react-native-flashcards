import React, {useState, useEffect} from 'react'
import {StyleSheet, Animated, Dimensions, View} from 'react-native'
import {screenStyle} from '../../utils/stylesheet'

let {height} = Dimensions.get('window')

const AppModal = ({open, component, style = screenStyle.defaultModal}) => {
    const [state, setState] = useState({
        opacity: new Animated.Value(0),
        slideY: new Animated.Value(-height),
        springY: new Animated.Value(-height),
    })

    const animatedStyle = {
        overlay: {
            opacity: state.opacity,
            transform: [{translateY: state.slideY}],
        },
        modal: {
            transform: [{translateY: state.springY}],
        },
    }

    const triggerOpenAnimation = () => {
        Animated.sequence([
            Animated.timing(state.slideY, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(state.opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(state.springY, {
                toValue: 0,
                bounciness: 5,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const triggerCloseAnimation = () => {
        Animated.sequence([
            Animated.timing(state.opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(state.springY, {
                toValue: -height,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(state.slideY, {
                toValue: -height,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start(() => {
            component = null
            style = null
        })
    }

    useEffect(() => {
        if (open) triggerOpenAnimation()
        else triggerCloseAnimation()
    }, [open])

    return (
        <Animated.View style={[styles.overlay, animatedStyle.overlay]}>
            <Animated.View
                style={[styles.modalContent, style, animatedStyle.modal]}>
                {component}
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        position: 'absolute',
        minHeight: 180,
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
})

export default AppModal
