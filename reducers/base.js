import {OPEN_MODAL, CLOSE_MODAL} from '../actions/base'
const initialState = {
    open: true,
    component: null,
    style: null,
}
export default function base(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...action,
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                open: false,
            }
        }
        default:
            return state
    }
}
