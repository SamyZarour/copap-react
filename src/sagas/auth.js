import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import { TOKEN_KEY, checkNested, getColorFromHTTPCode } from '../utils';
import {
    LOGIN,
    REGISTER,
    LOGOUT,
    FETCH_CURRENT_USER
} from '../constants/auth';
import * as API from '../apis/auth';
import * as ACTIONS from '../actions/auth';
import * as ACTIONS_MODAL from '../actions/modal';

export function* watchLogin() {
    yield takeLatest(LOGIN, loginAsync);
}

export function* watchRegister() {
    yield takeLatest(REGISTER, registerAsync);
}

export function* watchLogout() {
    yield takeLatest(LOGOUT, logoutAsync);
}

export function* watchFetchCurrentUser() {
    yield takeLatest(FETCH_CURRENT_USER, fetchCurrentUserAsync);
}

export function* loginAsync(action) {
    try {
        yield put(ACTIONS.loginRequest());
        const response = yield call(API.login, action.payload);
        localStorage.setItem(TOKEN_KEY, response.data.user.token);
        yield put(ACTIONS.loginSuccess(response.data));
    } catch (e) {
        yield put(ACTIONS.loginFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.loginDone());
    }
}

export function* registerAsync(action) {
    try {
        yield put(ACTIONS.registerRequest());
        yield call(API.register, action.payload);
        yield put(ACTIONS_MODAL.createModal('Successfully created user', getColorFromHTTPCode(200), 3000));
        yield put(reset('SignUpForm'));
        yield put(ACTIONS.registerSuccess());
    } catch (e) {
        yield put(ACTIONS.registerFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.registerDone());
    }
}

export function* logoutAsync() {
    try {
        yield put(ACTIONS.logoutRequest());
        localStorage.removeItem(TOKEN_KEY);
        yield put(ACTIONS.logoutSuccess());
    } catch (e) {
        yield put(ACTIONS.logoutFailure(e));
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.logoutDone());
        yield put(push('/'));
    }
}

export function* fetchCurrentUserAsync() {
    try {
        yield put(ACTIONS.fetchCurrentUserRequest());
        const response = yield call(API.getCurrentUser);
        yield put(ACTIONS.fetchCurrentUserSuccess(response.data));
    } catch (e) {
        yield put(ACTIONS.fetchCurrentUserFailure(e));
        if (checkNested(e, 'response', 'status') && e.response.status === 401) { yield put(ACTIONS.logout()); }
        const errorMessage = checkNested(e, 'response', 'data', 'message') ? e.response.data.message : 'Unknown Error';
        const style = checkNested(e, 'response', 'status') ? getColorFromHTTPCode(e.response.status) : null;
        yield put(ACTIONS_MODAL.createModal(errorMessage, style, 3000));
    } finally {
        yield put(ACTIONS.fetchCurrentUserDone());
    }
}

export default [
    watchLogin,
    watchRegister,
    watchLogout,
    watchFetchCurrentUser
];
