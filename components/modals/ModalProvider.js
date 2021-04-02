import AppModal from './AppModal'
import React, {useState, useContext} from 'react'
import {screenStyle} from '../../utils/stylesheet'
import LoadingModal from './LoadingModal'
import ConfirmModal from './ConfirmModal'

export const ModalContext = React.createContext({})

const initialModalState = {
    open: false,
    component: undefined,
    style: undefined,
}

export const ModalProvider = ({children}) => {
    const [modalState, setModalState] = useState(initialModalState)

    const openModal = (component, style) => {
        setModalState({
            open: true,
            component,
            style,
        })
    }

    const closeModal = () =>
        setModalState(state => {
            return {
                ...state,
                open: false,
            }
        })

    const modalActions = {
        openModal,
        closeModal,
    }

    return (
        <ModalContext.Provider value={modalActions}>
            {children}
            <AppModal {...modalState} />
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const {openModal, closeModal} = useContext(ModalContext)

    const showLoading = (message, style) => {
        openModal(<LoadingModal message={message} />, style)
    }

    const showConfirm = ({
        message,
        yesText,
        onYesPress,
        noText,
        onNoPress,
        style,
    }) => {
        openModal(
            <ConfirmModal
                message={message}
                yesText={yesText}
                noText={noText}
                onYesPress={onYesPress}
                onNoPress={onNoPress || closeModal}
            />,
            style,
        )
    }

    return {
        openModal,
        closeModal,
        showLoading,
        showConfirm,
    }
}