import { takeLatest, call, put } from 'redux-saga/effects';
import * as CONSTANTS from '../constants/invoices';
import * as API from '../apis/invoices';
import * as ACTIONS from '../actions/invoices';
import * as ACTIONS_MODAL from '../actions/modal';
import * as ACTIONS_AUTH from '../actions/auth';
import { checkNested, getColorFromHTTPCode } from '../utils';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* watchFetchIndexInvoices() {
    yield takeLatest(CONSTANTS.FETCH_INDEX_INVOICES, fetchIndexInvoicesAsync);
}

export function* watchFetchBrandInvoices() {
    yield takeLatest(CONSTANTS.FETCH_BRAND_INVOICES, fetchBrandInvoicesAsync);
}

export function* watchFetchCustomerInvoices() {
    yield takeLatest(CONSTANTS.FETCH_CUSTOMER_INVOICES, fetchCustomerInvoicesAsync);
}

export function* fetchIndexInvoicesAsync(action) {
    try {
        yield delay(1000);
        yield put(ACTIONS.fetchInvoicesRequest());
        const response = yield call(API.getIndex, { ...action.payload, pageSize: CONSTANTS.INVOICE_PAGE_SIZE });
        const isEnd = response.data && response.data.recordset && response.data.recordset.length < CONSTANTS.INVOICE_PAGE_SIZE;
        yield put(ACTIONS.fetchInvoicesSuccess({ ...response.data, isEnd }));
    } catch (e) {
        yield put(ACTIONS.fetchInvoicesFailure(e));
        if (checkNested(e, 'response', 'status') && e.response.status === 401) { yield put(ACTIONS_AUTH.logout()); }
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.fetchInvoicesDone());
    }
}

export function* fetchBrandInvoicesAsync(action) {
    try {
        yield delay(1000);
        yield put(ACTIONS.fetchInvoicesRequest());
        const response = yield call(API.getByBrand, { ...action.payload, pageSize: CONSTANTS.INVOICE_PAGE_SIZE });
        const isEnd = response.data && response.data.recordset && response.data.recordset.length < CONSTANTS.INVOICE_PAGE_SIZE;
        yield put(ACTIONS.fetchInvoicesSuccess({ ...response.data, isEnd }));
    } catch (e) {
        yield put(ACTIONS.fetchInvoicesFailure(e));
        if (checkNested(e, 'response', 'status') && e.response.status === 401) { yield put(ACTIONS_AUTH.logout()); }
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.fetchInvoicesDone());
    }
}

export function* fetchCustomerInvoicesAsync(action) {
    try {
        yield delay(1000);
        yield put(ACTIONS.fetchInvoicesRequest());
        const response = yield call(API.getByCustomer, action.payload);
        const isEnd = response.data && response.data.recordset && response.data.recordset.length < CONSTANTS.INVOICE_PAGE_SIZE;
        yield put(ACTIONS.fetchInvoicesSuccess({ ...response.data, isEnd }));
    } catch (e) {
        yield put(ACTIONS.fetchInvoicesFailure(e));
        if (checkNested(e, 'response', 'status') && e.response.status === 401) { yield put(ACTIONS_AUTH.logout()); }
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.fetchInvoicesDone());
    }
}

export default [
    watchFetchIndexInvoices,
    watchFetchBrandInvoices,
    watchFetchCustomerInvoices
];
