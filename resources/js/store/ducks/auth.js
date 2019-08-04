import { createActions, createReducer } from 'reduxsauce';
import { LocalStorage } from '../../utils';

/* -------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  logoutRequest: null,
});

/* -------------------- Initial State ------------------- */

const INITIAL_STATE = {
  user: LocalStorage.getItem('user') || null,
  error: null,
  fetching: false,
};

/* ----------------------- Reducers --------------------- */

const request = (state = INITIAL_STATE) => ({
  ...state,
  fetching: true,
});

const success = (state, { user }) => ({
  ...state,
  user,
  error: null,
  fetching: false,
});

const failure = (state, { error }) => ({
  ...state,
  error,
  fetching: false,
});

const logout = state => ({
  ...state,
  user: null,
  error: null,
});

/* -------------- Hookup Reducers to Types -------------- */

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT_REQUEST]: logout,
});

/* ---------------------- Selectors --------------------- */

// export const isLoggedIn = state => !!state.user;
export const isLoggedIn = state => !!state.auth.user;
export const isError = state => !!state.error;
export const isAdmin = state => state.auth.user && state.auth.user.type === "admin";
