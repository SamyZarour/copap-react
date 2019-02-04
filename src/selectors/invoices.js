import { createSelector } from 'reselect';
import { colors } from '../constants/invoices';

export const _invoicesSelector = state => state.invoices;

export const invoicesSelector = createSelector(
    _invoicesSelector,
    invoices => invoices
);

export const invoiceListSelector = createSelector(
    _invoicesSelector,
    invoices => invoices.invoices
);

export const invoiceListPieChartSelector = createSelector(
    invoiceListSelector,
    invoices => invoices.map((item, index) => ({ label: item.InvoiceNo, title: item.InvoiceNo, value: item.TotalSale, color: colors[index] }))
);
