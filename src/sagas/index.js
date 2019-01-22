import { fork, all } from 'redux-saga/effects';
import auth from './auth';
import modal from './modal';

function startSagas(sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)));
    };
}

const sagas = [
    ...auth,
    ...modal
];

export default startSagas(sagas);
