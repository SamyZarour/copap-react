import * as CONSTANTS from '../constants/search';

const defaultState = {
    isBusy: false,
    isFetched: false,
    traders: [],
    brands: [],
    customers: [],
    destinationCountries: [],
    productTypes: [],
    customerInfo: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case CONSTANTS.SEARCH_REQUEST:
            return {
                ...state,
                isBusy: action.payload
            };
        case CONSTANTS.SEARCH_DONE:
            return {
                ...state,
                isBusy: action.payload,
                isFetched: true
            };
        case CONSTANTS.SEARCH_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case CONSTANTS.FETCH_TRADERS_SUCCESS:
            return {
                ...state,
                traders: action.payload || []
            };
        case CONSTANTS.FETCH_BRANDS_SUCCESS:
            return {
                ...state,
                brands: action.payload || []
            };
        case CONSTANTS.FETCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload || []
            };
        case CONSTANTS.FETCH_DESTINATION_COUNTRIES_SUCCESS:
            return {
                ...state,
                destinationCountries: action.payload || []
            };
        case CONSTANTS.FETCH_PRODUCT_TYPES_SUCCESS:
            return {
                ...state,
                productTypes: action.payload || []
            };
        case CONSTANTS.RESET_CUSTOMER_INFO:
            return {
                ...state,
                customerInfo: null
            };
        case CONSTANTS.FETCH_CUSTOMER_INFO_SUCCESS:
            return {
                ...state,
                customerInfo: action.payload
            };
        default:
            return state;
    }
};
