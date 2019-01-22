import * as CONSTANTS from '../constants/modal';

const defaultState = {
    messages: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_MODAL:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        case CONSTANTS.DELETE_MODAL:
            return {
                ...state,
                messages: state.messages.filter(message => message.key !== action.payload)
            };
        default:
            return state;
    }
};
