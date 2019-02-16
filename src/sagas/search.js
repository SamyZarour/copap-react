import { takeLatest, call, put } from 'redux-saga/effects';
import { checkNested, getColorFromHTTPCode } from '../utils';
import {
    FETCH_TRADERS,
    FETCH_BRANDS,
    FETCH_CUSTOMERS,
    FETCH_DESTINATION_COUNTRIES,
    FETCH_PRODUCT_TYPES
} from '../constants/search';
import * as API from '../apis/invoices';
import * as ACTIONS from '../actions/search';
import * as ACTIONS_MODAL from '../actions/modal';

export function* watchFetchTraders() {
    yield takeLatest(FETCH_TRADERS, fetchTradersAsync);
}

export function* watchFetchBrands() {
    yield takeLatest(FETCH_BRANDS, fetchBrandsAsync);
}

export function* watchFetchCustomers() {
    yield takeLatest(FETCH_CUSTOMERS, fetchCustomersAsync);
}

export function* watchFetchDestinationCountries() {
    yield takeLatest(FETCH_DESTINATION_COUNTRIES, fetchDestinationCountriesAsync);
}

export function* watchFetchProductTypes() {
    yield takeLatest(FETCH_PRODUCT_TYPES, fetchProductTypesAsync);
}

export function* fetchTradersAsync(action) {
    try {
        yield put(ACTIONS.searchRequest());
        const response = yield call(API.getTraders, action.payload);
        const traders = response.data && response.data.recordset && response.data.recordset.map(item => ({ label: item.label.trim(), value: item.value.trim() }));
        yield put(ACTIONS.fetchTradersSuccess(traders));
    } catch (e) {
        yield put(ACTIONS.searchFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.searchDone());
    }
}

export function* fetchBrandsAsync(action) {
    try {
        yield put(ACTIONS.searchRequest());
        const response = yield call(API.getBrands, action.payload);
        const brands = response.data && response.data.recordset && response.data.recordset.map(item => ({ label: item.label.trim(), value: item.value.trim() }));
        yield put(ACTIONS.fetchBrandsSuccess(brands));
    } catch (e) {
        yield put(ACTIONS.searchFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.searchDone());
    }
}

export function* fetchCustomersAsync(action) {
    try {
        yield put(ACTIONS.searchRequest());
        const response = yield call(API.getCustomers, action.payload);
        const customers = response.data && response.data.recordset && response.data.recordset.map(item => ({ label: item.label.trim(), value: item.value.trim() }));
        yield put(ACTIONS.fetchCustomersSuccess(customers));
    } catch (e) {
        yield put(ACTIONS.searchFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.searchDone());
    }
}

export function* fetchDestinationCountriesAsync(action) {
    try {
        yield put(ACTIONS.searchRequest());
        const response = yield call(API.getDestinationCountries, action.payload);
        const destinationCountries = response.data && response.data.recordset && response.data.recordset.map(item => ({ label: item.ShipToID.trim(), value: item.ShipToID.trim() }));
        yield put(ACTIONS.fetchDestinationCountriesSuccess(destinationCountries));
    } catch (e) {
        yield put(ACTIONS.searchFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.searchDone());
    }
}

export function* fetchProductTypesAsync(action) {
    try {
        yield put(ACTIONS.searchRequest());
        const response = yield call(API.getProductTypes, action.payload);
        const productTypes = response.data && response.data.recordset && response.data.recordset.map(item => ({ label: item.ProductType.trim(), value: item.ProductType.trim() }));
        yield put(ACTIONS.fetchProductTypesSuccess(productTypes));
    } catch (e) {
        yield put(ACTIONS.searchFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.searchDone());
    }
}

export default [
    watchFetchTraders,
    watchFetchBrands,
    watchFetchCustomers,
    watchFetchDestinationCountries,
    watchFetchProductTypes
];
