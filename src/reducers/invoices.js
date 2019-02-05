import * as CONSTANTS from '../constants/invoices';

const defaultState = {
    isBusy: false,
    isFetched: false,
    isEnd: false,
    invoices: [],
    totalCount: 0,
    page: 0
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
                isEnd: action.payload.isEnd || false,
                page: action.payload.page || 0
            };
        case CONSTANTS.FETCH_INVOICES_COUNT_SUCCESS:
            return {
                ...state,
                totalCount: action.payload || 0
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
