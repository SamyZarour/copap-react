import { fork, all } from 'redux-saga/effects';
import auth from './auth';
import modal from './modal';
import search from './search';
import invoices from './invoices';

function startSagas(sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)));
    };
}

const sagas = [
    ...auth,
    ...modal,
    ...search,
    ...invoices
];

export default startSagas(sagas);
