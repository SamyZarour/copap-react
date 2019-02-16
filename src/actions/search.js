import * as CONSTANTS from '../constants/search';

export const searchRequest = () => ({ type: CONSTANTS.SEARCH_REQUEST, payload: true });
export const searchFailure = error => ({ type: CONSTANTS.SEARCH_FAILURE, payload: error });
export const searchDone = () => ({ type: CONSTANTS.SEARCH_DONE, payload: false });

export const initSearch = fields => ({ type: CONSTANTS.INIT_SEARCH, payload: fields });

export const fetchBrands = user => ({ type: CONSTANTS.FETCH_BRANDS, payload: user });
export const fetchBrandsSuccess = user => ({ type: CONSTANTS.FETCH_BRANDS_SUCCESS, payload: user });

export const fetchCustomers = user => ({ type: CONSTANTS.FETCH_CUSTOMERS, payload: user });
export const fetchCustomersSuccess = user => ({ type: CONSTANTS.FETCH_CUSTOMERS_SUCCESS, payload: user });

export const fetchDestinationCountries = user => ({ type: CONSTANTS.FETCH_DESTINATION_COUNTRIES, payload: user });
export const fetchDestinationCountriesSuccess = user => ({ type: CONSTANTS.FETCH_DESTINATION_COUNTRIES_SUCCESS, payload: user });

export const fetchProductTypes = user => ({ type: CONSTANTS.FETCH_PRODUCT_TYPES, payload: user });
export const fetchProductTypesSuccess = user => ({ type: CONSTANTS.FETCH_PRODUCT_TYPES_SUCCESS, payload: user });

export const fetchTraders = user => ({ type: CONSTANTS.FETCH_TRADERS, payload: user });
export const fetchTradersSuccess = user => ({ type: CONSTANTS.FETCH_TRADERS_SUCCESS, payload: user });
