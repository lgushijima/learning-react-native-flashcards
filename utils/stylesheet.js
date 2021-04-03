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
    panelWrapper: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 15,
    },
    subtitle: {
        color: colors.gray300,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        color: colors.gray300,
        fontSize: 14,
        marginBottom: 5,
    },
    colCentered: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    rowCentered: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
})
