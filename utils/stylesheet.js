import {StyleSheet} from 'react-native'
import {colors} from './settings'

export const screenStyle = StyleSheet.create({
    defaultModal: {
        flex: 1,
        backgroundColor: colors.white,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
