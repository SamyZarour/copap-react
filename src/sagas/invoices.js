import { takeLatest, call, put } from 'redux-saga/effects';
import * as CONSTANTS from '../constants/invoices';
import * as API from '../apis/invoices';
import * as ACTIONS from '../actions/invoices';
import * as ACTIONS_MODAL from '../actions/modal';
import * as ACTIONS_AUTH from '../actions/auth';
import { checkNested, getColorFromHTTPCode } from '../utils';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* watchFetchIndexInvoices() {
    yield takeLatest(CONSTANTS.FETCH_INDEX_INVOICES, fetchInvoicesAsync);
}

export function* watchFetchBrandInvoices() {
    yield takeLatest(CONSTANTS.FETCH_BRAND_INVOICES, fetchInvoicesAsync);
}

export function* watchFetchCustomerInvoices() {
    yield takeLatest(CONSTANTS.FETCH_CUSTOMER_INVOICES, fetchInvoicesAsync);
}

export function* fetchInvoicesAsync(action) {
    try {
        yield delay(1000);
        const { reset } = action.payload;

        if (reset) { yield put(ACTIONS.resetInvoices()); }
        yield put(ACTIONS.fetchInvoicesRequest());
        yield put(ACTIONS.fetchInvoicesCount());
        const responseCount = yield call(API.getInvoices, { ...action.payload, isCount: true });
        const count = responseCount.data && responseCount.data.recordset && responseCount.data.recordset.length === 1 && responseCount.data.recordset[0].count;
        const response = yield call(API.getInvoices, { ...action.payload, pageSize: CONSTANTS.INVOICE_PAGE_SIZE });
        const isEnd = response.data && response.data.recordset && response.data.recordset.length < CONSTANTS.INVOICE_PAGE_SIZE;
        const invoicesObject = (response.data && response.data.recordset && response.data.recordset.reduce((acc, item) => {
            const { InvoiceNo, Qty, TotalSale, TotalBuy, PriceSale, PriceBuy } = item;
            const state = acc[InvoiceNo] || {
                Qty: 0,
                TotalSale: 0,
                PriceSale: 0,
                TotalBuy: 0,
                PriceBuy: 0
            };
            acc[InvoiceNo] = {
                ...item,
                Qty: Math.round((Qty + state.Qty) * 100) / 100,
                TotalSale: Math.round((TotalSale + state.TotalSale) * 100) / 100,
                PriceSale: Math.round((PriceSale * (Qty / (Qty + state.Qty)) + state.PriceSale) * 100) / 100,
                TotalBuy: Math.round((TotalBuy + state.TotalBuy) * 100) / 100,
                PriceBuy: Math.round((PriceBuy * (Qty / (Qty + state.Qty)) + state.PriceBuy) * 100) / 100
            };
            return acc;
        }, {})) || {};
        const invoices = Object.keys(invoicesObject).map(key => invoicesObject[key]);
        yield put(ACTIONS.fetchInvoicesSuccess({ invoices, isEnd, page: action.payload.page }));
        yield put(ACTIONS.fetchInvoicesCountSuccess(count + invoices.length - response.data.recordset.length));
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
