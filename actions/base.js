export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

// GET MODAL
function actionOpenModal(component, style) {
    return {
        type: OPEN_MODAL,
        open: true,
        component,
        style,
    }
}
export function openModal(component, style) {
    return dispatch => {
        dispatch(actionOpenModal(component, style))
    }
}

// CLOSE MODAL
function actionCloseModal() {
    return {
        type: CLOSE_MODAL,
    }
}
export function closeModal() {
    return dispatch => {
        dispatch(actionCloseModal())
    }
}
