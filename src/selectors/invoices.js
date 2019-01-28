import { createSelector } from 'reselect';

export const _invoicesSelector = state => state.invoices;

export const invoicesSelector = createSelector(
    _invoicesSelector,
    invoices => invoices
);

export const invoiceListSelector = createSelector(
    _invoicesSelector,
    invoices => invoices.invoices
);
