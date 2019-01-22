import * as CONSTANTS from '../constants/auth';

export const login = user => ({ type: CONSTANTS.LOGIN, payload: user });
export const loginRequest = () => ({ type: CONSTANTS.LOGIN_REQUEST, payload: true });
export const loginSuccess = user => ({ type: CONSTANTS.LOGIN_SUCCESS, payload: user });
export const loginFailure = error => ({ type: CONSTANTS.LOGIN_FAILURE, payload: error });
export const loginDone = () => ({ type: CONSTANTS.LOGIN_DONE, payload: false });

export const register = user => ({ type: CONSTANTS.REGISTER, payload: user });
export const registerRequest = () => ({ type: CONSTANTS.REGISTER_REQUEST, payload: true });
export const registerSuccess = user => ({ type: CONSTANTS.REGISTER_SUCCESS, payload: user });
export const registerFailure = error => ({ type: CONSTANTS.REGISTER_FAILURE, payload: error });
export const registerDone = () => ({ type: CONSTANTS.REGISTER_DONE, payload: false });

export const logout = () => ({ type: CONSTANTS.LOGOUT });
export const logoutRequest = () => ({ type: CONSTANTS.LOGOUT_REQUEST, payload: true });
export const logoutSuccess = () => ({ type: CONSTANTS.LOGOUT_SUCCESS });
export const logoutFailure = error => ({ type: CONSTANTS.LOGOUT_FAILURE, payload: error });
export const logoutDone = () => ({ type: CONSTANTS.LOGOUT_DONE, payload: false });

export const fetchCurrentUser = () => ({ type: CONSTANTS.FETCH_CURRENT_USER });
export const fetchCurrentUserRequest = () => ({ type: CONSTANTS.FETCH_CURRENT_USER_REQUEST, payload: true });
export const fetchCurrentUserSuccess = user => ({ type: CONSTANTS.FETCH_CURRENT_USER_SUCCESS, payload: user });
export const fetchCurrentUserFailure = error => ({ type: CONSTANTS.FETCH_CURRENT_USER_FAILURE, payload: error });
export const fetchCurrentUserDone = () => ({ type: CONSTANTS.FETCH_CURRENT_USER_DONE, payload: false });
