import * as CONSTANTS from '../constants/modal';
import { getUniqueKey } from '../utils';

export const createModal = (message, style, time) => ({ type: CONSTANTS.CREATE_MODAL, payload: { key: getUniqueKey(), message, style, time } });
export const addModal = modal => ({ type: CONSTANTS.ADD_MODAL, payload: modal });
export const deleteModal = modalKey => ({ type: CONSTANTS.DELETE_MODAL, payload: modalKey });
