import { createActions, createReducer } from 'reduxsauce';
import { LocalStorage } from '../../utils';

/* -------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  logoutRequest: null,
  resetError: null
});

/* -------------------- Initial State ------------------- */

const INITIAL_STATE = {
  user: LocalStorage.getItem('user') || null,
  fetching: false,
  error: null,
};

/* ----------------------- Reducers --------------------- */

const request = (state = INITIAL_STATE) => ({
  ...state,
  fetching: true,
  error: null,
});

const success = (state, { user }) => ({
  ...state,
  user,
  fetching: false,
  error: null,
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

const resetError = (state = INITIAL_STATE) => ({
  ...state,
  error: null,
});

/* -------------- Hookup Reducers to Types -------------- */

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT_REQUEST]: logout,
  [Types.RESET_ERROR]: resetError
});

/* ---------------------- Selectors --------------------- */

export const isLoggedIn = state => !!state.auth.user;
export const isError = state => !!state.auth.error;
export const isAdmin = state => state.auth.user && state.auth.user.type === "admin";
export const expiresAt = state => {
  if (state.auth.user && !state.auth.user.active) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(state.auth.user.updated_at);
    firstDate.setDate(firstDate.getDate() + 14); // 14 days, time to confirm account
    const secondDate = new Date();
    const diffDays = Math.round(((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    return diffDays;
  }
  return 0;
}
