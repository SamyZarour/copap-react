import * as CONSTANTS from '../constants/auth';

const defaultState = {
    isBusy: false,
    isFetched: false,
    user: null,
    error: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case CONSTANTS.LOGIN_REQUEST:
            return {
                ...state,
                isBusy: action.payload
            };
        case CONSTANTS.LOGIN_DONE:
            return {
                ...state,
                isBusy: action.payload,
                isFetched: true
            };
        case CONSTANTS.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case CONSTANTS.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case CONSTANTS.REGISTER_REQUEST:
            return {
                ...state,
                isBusy: true
            };
        case CONSTANTS.REGISTER_DONE:
            return {
                ...state,
                isBusy: false,
                isFetched: true
            };
        case CONSTANTS.REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case CONSTANTS.LOGOUT_REQUEST:
            return {
                ...state,
                isBusy: action.payload
            };
        case CONSTANTS.LOGOUT_DONE:
            return {
                ...state,
                isBusy: action.payload
            };
        case CONSTANTS.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null
            };
        case CONSTANTS.LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case CONSTANTS.FETCH_CURRENT_USER_REQUEST:
            return {
                ...state,
                isBusy: action.payload
            };
        case CONSTANTS.FETCH_CURRENT_USER_DONE:
            return {
                ...state,
                isBusy: action.payload,
                isFetched: true
            };
        case CONSTANTS.FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case CONSTANTS.FETCH_CURRENT_USER_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
