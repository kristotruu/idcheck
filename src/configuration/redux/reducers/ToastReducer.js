import {TOAST_HIDE, TOAST_SHOW} from "../common-actions";

const initialState  = {
    header: '',
    body: '',
    show: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOAST_SHOW:
            return {
                ...state,
                header: action.payload.header,
                body: action.payload.body,
                show: true
            };
        case TOAST_HIDE:
            return initialState;
        default:
            return state;
    }
}