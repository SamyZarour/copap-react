import * as CONSTANTS from '../constants/invoices';

export const fetchInvoicesRequest = () => ({ type: CONSTANTS.FETCH_INVOICES_REQUEST, payload: true });
export const fetchInvoicesFailure = error => ({ type: CONSTANTS.FETCH_INVOICES_FAILURE, payload: error });
export const fetchInvoicesSuccess = invoices => ({ type: CONSTANTS.FETCH_INVOICES_SUCCESS, payload: invoices });
export const fetchInvoicesDone = () => ({ type: CONSTANTS.FETCH_INVOICES_DONE, payload: false });

export const resetInvoices = () => ({ type: CONSTANTS.RESET_INVOICES });

export const fetchIndexInvoices = criteria => ({ type: CONSTANTS.FETCH_INDEX_INVOICES, payload: criteria });

export const fetchInvoicesInitialize = criteria => ({ type: CONSTANTS.FETCH_INVOICES_INITIALIZE, payload: criteria });

export const fetchInvoicesCount = () => ({ type: CONSTANTS.FETCH_INVOICES_COUNT });
export const fetchInvoicesCountSuccess = count => ({ type: CONSTANTS.FETCH_INVOICES_COUNT_SUCCESS, payload: count });

export const fetchBrandInvoices = criteria => ({ type: CONSTANTS.FETCH_BRAND_INVOICES, payload: criteria });

export const fetchCustomerInvoices = criteria => ({ type: CONSTANTS.FETCH_CUSTOMER_INVOICES, payload: criteria });
