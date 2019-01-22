import { takeEvery, put } from 'redux-saga/effects';
import { CREATE_MODAL } from '../constants/modal';
import * as ACTIONS from '../actions/modal';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* watchAddModal() {
    yield takeEvery(CREATE_MODAL, addModalAsync);
}

export function* addModalAsync(action) {
    yield put(ACTIONS.addModal(action.payload));
    yield delay(action.payload.time);
    yield put(ACTIONS.deleteModal(action.payload.key));
}

export default [
    watchAddModal
];
