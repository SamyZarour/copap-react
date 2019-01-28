import { takeLatest, call, put } from 'redux-saga/effects';
import * as CONSTANTS from '../constants/invoices';
import * as API from '../apis/invoices';
import * as ACTIONS from '../actions/invoices';
import * as ACTIONS_MODAL from '../actions/modal';
import * as ACTIONS_AUTH from '../actions/auth';
import { checkNested, getColorFromHTTPCode } from '../utils';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* watchFetchInvoices() {
    yield takeLatest(CONSTANTS.FETCH_INVOICES, fetchInvoicesAsync);
}

export function* fetchInvoicesAsync(action) {
    try {
        yield delay(1000);
        yield put(ACTIONS.fetchInvoicesRequest());
        yield put(ACTIONS.resetInvoices());
        const response = yield call(API.getInvoices, action.payload);
        yield put(ACTIONS.fetchInvoicesSuccess(response.data));
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
    watchFetchInvoices
];
