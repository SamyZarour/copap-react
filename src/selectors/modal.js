import { createSelector } from 'reselect';

export const _modalSelector = state => state.modal;

export const messagesSelector = createSelector(
    _modalSelector,
    modal => modal.messages
);
