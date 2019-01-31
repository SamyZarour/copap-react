import * as CONSTANTS from '../constants/invoices';

const defaultState = {
    isBusy: false,
    isFetched: false,
    isEnd: false,
    invoices: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case CONSTANTS.RESET_INVOICES:
            return {
                ...defaultState
            };
        case CONSTANTS.FETCH_INVOICES_REQUEST:
            return {
                ...state,
                isBusy: true
            };
        case CONSTANTS.FETCH_INVOICES_DONE:
            return {
                ...state,
                isBusy: false,
                isFetched: true
            };
        case CONSTANTS.FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: [...state.invoices, ...action.payload.recordset],
                isEnd: action.payload.isEnd || false
            };
        case CONSTANTS.FETCH_INVOICES_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
