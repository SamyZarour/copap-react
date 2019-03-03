import { takeLatest, call, put } from 'redux-saga/effects';
import { checkNested, getColorFromHTTPCode } from '../utils';
import {
    INIT_SEARCH,
    FETCH_CUSTOMER_INFO
} from '../constants/search';
import * as API from '../apis/invoices';
import * as ACTIONS from '../actions/search';
import * as ACTIONS_INVOICES from '../actions/invoices';
import * as ACTIONS_MODAL from '../actions/modal';

export function* watchInitSearch() {
    yield takeLatest(INIT_SEARCH, initSearchAsync);
}

export function* watchFetchCustomerInfo() {
    yield takeLatest(FETCH_CUSTOMER_INFO, fetchCustomerInfoAsync);
}

export function* initSearchAsync(action) {
    try {
        const { brands, customers, productTypes, destinationCountries, traders } = action.payload;

        yield put(ACTIONS_INVOICES.resetInvoices());
        yield put(ACTIONS.searchRequest());

        if (brands) {
            const responseBrands = yield call(API.getBrands, action.payload);
            const resultBrands = responseBrands.data && responseBrands.data.recordset && responseBrands.data.recordset.map(item => ({ label: item.label.trim(), value: item.value.trim() }));
            yield put(ACTIONS.fetchBrandsSuccess(resultBrands));
        }

        if (customers) {
            const responseCustomers = yield call(API.getCustomers, action.payload);
            const resultCustomers = responseCustomers.data && responseCustomers.data.recordset && responseCustomers.data.recordset.map(item => ({ label: item.label.trim(), value: item.value.trim() }));
            yield put(ACTIONS.fetchCustomersSuccess(resultCustomers));
        }

        if (productTypes) {
            const responseProductTypes = yield call(API.getProductTypes, action.payload);
            const resultProductTypes = responseProductTypes.data && responseProductTypes.data.recordset && responseProductTypes.data.recordset.map(item => ({ label: item.ProductType.trim(), value: item.ProductType.trim() }));
            yield put(ACTIONS.fetchProductTypesSuccess(resultProductTypes));
        }

        if (destinationCountries) {
            const responseDestinationCountries = yield call(API.getDestinationCountries, action.payload);
            const resultDestinationCountries = responseDestinationCountries.data && responseDestinationCountries.data.recordset && responseDestinationCountries.data.recordset.map(item => ({ label: item.ShipToID.trim(), value: item.ShipToID.trim() }));
            yield put(ACTIONS.fetchDestinationCountriesSuccess(resultDestinationCountries));
        }

        if (traders) {
            const responseTraders = yield call(API.getTraders, action.payload);
            const resultTraders = responseTraders.data && responseTraders.data.recordset && responseTraders.data.recordset.map(item => ({ label: item.label.trim(), value: item.value.trim() }));
            yield put(ACTIONS.fetchTradersSuccess(resultTraders));
        }
    } catch (e) {
        yield put(ACTIONS.searchFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.searchDone());
    }
}

export function* fetchCustomerInfoAsync(action) {
    try {
        yield put(ACTIONS.searchRequest());
        const responseProductTypes = yield call(API.getCustomerProductTypes, action.payload);
        const ProductTypes = responseProductTypes.data && responseProductTypes.data.recordset && responseProductTypes.data.recordset.map(item => item.ProductType).filter(s => !!s);
        const responseLastPurchase = yield call(API.getCustomerLastPurchase, action.payload);
        const LastPurchase = responseLastPurchase.data && responseLastPurchase.data.recordset && responseLastPurchase.data.recordset.length > 0 && responseLastPurchase.data.recordset[0];
        const response = yield call(API.getCustomerInfo, action.payload);
        const customerInfo = response.data && response.data.recordset && response.data.recordset.length > 0 && response.data.recordset[0];
        yield put(ACTIONS.fetchCustomerInfoSuccess({ ...customerInfo, ProductTypes, LastPurchase }));
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
    watchInitSearch,
    watchFetchCustomerInfo
];
