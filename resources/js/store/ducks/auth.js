import { createActions, createReducer } from 'reduxsauce';
import { LocalStorage } from '../../utils';

/* -------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  lockoutUser: ['lockoutSeconds'],
  refreshRequest: null,
  refreshSuccess: ['user'],
  logoutRequest: null,
  resetError: null
});

/* -------------------- Initial State ------------------- */

const INITIAL_STATE = {
  user: LocalStorage.getItem('user') || null,
  fetching: false,
  lockoutSeconds: null,
  error: null,
};

/* ----------------------- Reducers --------------------- */

const request = (state = INITIAL_STATE) => ({
  ...state,
  fetching: true,
  lockoutSeconds: null,
  error: null,
});

const success = (state, { user }) => ({
  ...state,
  user,
  fetching: false,
  lockoutSeconds: null,
  error: null,
});

const failure = (state, { error }) => ({
  ...state,
  error,
  fetching: false,
});

const lockoutUser = (state, { lockoutSeconds = state.lockoutSeconds }) => ({
  ...state,
  lockoutSeconds,
  fetching: false,
});

const logout = state => ({
  ...state,
  user: null,
  lockoutSeconds: null,
  error: null,
});

const refreshRequest = state => ({
  ...state,
  fetching: true,
  lockoutSeconds: null,
  error: null,
})

const refreshSuccess = (state, { user }) => ({
  ...state,
  user,
  fetching: false,
  lockoutSeconds: null,
  error: null,
})

const resetError = (state = INITIAL_STATE) => ({
  ...state,
  error: null,
  lockoutSeconds: null,
});

/* -------------- Hookup Reducers to Types -------------- */

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOCKOUT_USER]: lockoutUser,
  [Types.LOGOUT_REQUEST]: logout,
  [Types.REFRESH_REQUEST]: refreshRequest,
  [Types.REFRESH_SUCCESS]: refreshSuccess,
  [Types.RESET_ERROR]: resetError
});

/* ---------------------- Selectors --------------------- */

export const isLoggedIn = state => !!state.auth.user;
export const isError = state => !!state.auth.error;
export const isAdmin = state => state.auth.user && state.auth.user.type === "admin";
export const isActive = state => state.auth.user && state.auth.user.active;
export const expiresAt = state => {
  if (state.auth.user && !state.auth.user.active) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(state.auth.user.updated_at);
    firstDate.setDate(firstDate.getDate() + 7); // 7 days, time to confirm account
    const secondDate = new Date();
    const diffDays = Math.round(((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    return diffDays;
  }
  return 0;
}
export const lockedSeconds = state => {
  if (state.auth.lockoutSeconds) {
    const timeDiff = state.auth.lockoutSeconds.getTime() - new Date().getTime();
    return timeDiff > 0 ? Math.round(timeDiff / 1000) : 0;
  }
  return 0;
}
