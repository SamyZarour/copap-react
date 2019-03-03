import { createSelector } from 'reselect';

export const _searchSelector = state => state.search;

export const tradersSelector = createSelector(
    _searchSelector,
    search => search.traders
);

export const brandsSelector = createSelector(
    _searchSelector,
    search => search.brands
);

export const customersSelector = createSelector(
    _searchSelector,
    search => search.customers
);

export const customerInfoSelector = createSelector(
    _searchSelector,
    search => search.customerInfo
);

export const destinationCountriesSelector = createSelector(
    _searchSelector,
    search => search.destinationCountries
);

export const productTypesSelector = createSelector(
    _searchSelector,
    search => search.productTypes
);
