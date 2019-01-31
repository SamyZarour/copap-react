import * as CONSTANTS from '../constants/invoices';

export const fetchInvoices = criteria => ({ type: CONSTANTS.FETCH_INVOICES, payload: criteria });
export const resetInvoices = () => ({ type: CONSTANTS.RESET_INVOICES });
export const fetchInvoicesRequest = () => ({ type: CONSTANTS.FETCH_INVOICES_REQUEST, payload: true });
export const fetchInvoicesSuccess = quizzes => ({ type: CONSTANTS.FETCH_INVOICES_SUCCESS, payload: quizzes });
export const fetchInvoicesFailure = error => ({ type: CONSTANTS.FETCH_INVOICES_FAILURE, payload: error });
export const fetchInvoicesDone = () => ({ type: CONSTANTS.FETCH_INVOICES_DONE, payload: false });
export const reachedEndInvoices = () => ({ type: CONSTANTS.REACHED_END_INVOICES });
