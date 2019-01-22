import { createSelector } from 'reselect';

export const _authSelector = state => state.auth;

export const authSelector = createSelector(
    _authSelector,
    auth => auth
);

export const userSelector = createSelector(
    _authSelector,
    auth => auth.user
);
