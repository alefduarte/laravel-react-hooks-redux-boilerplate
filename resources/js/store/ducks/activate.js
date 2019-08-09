import { createActions, createReducer } from 'reduxsauce';

/* -------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
    sendRequest: ['email'],
    sendSuccess: null,
    activateRequest: ['token'],
    activateSuccess: null,
    activateFailure: ['error'],
    resetActivateState: null
});

/* -------------------- Initial State ------------------- */

const INITIAL_STATE = {
    token: null,
    email: null,
    activated: false,
    sent: false,
    fetching: false,
    error: null
};

/* ----------------------- Reducers --------------------- */

const sendRequest = (state, { email }) => ({
    ...state,
    email,
    fetching: true,
    activated: false,
    error: null
});

const sendSuccess = (state) => ({
    ...state,
    sent: true,
    activated: false,
    fetching: false,
    error: null
});

const activateRequest = (state, { token }) => ({
    ...state,
    token,
    activated: false,
    fetching: true,
    error: null
});

const activateSuccess = (state) => ({
    ...state,
    token: null,
    email: null,
    activated: true,
    fetching: false,
    error: null
});

const activateFailure = (state, { error }) => ({
    ...state,
    fetching: false,
    activated: false,
    token: null,
    email: null,
    error
});

const resetActivateState = () => ({
    ...INITIAL_STATE
});

/* -------------- Hookup Reducers to Types -------------- */

export default createReducer(INITIAL_STATE, {
    [Types.SEND_REQUEST]: sendRequest,
    [Types.SEND_SUCCESS]: sendSuccess,
    [Types.ACTIVATE_REQUEST]: activateRequest,
    [Types.ACTIVATE_SUCCESS]: activateSuccess,
    [Types.ACTIVATE_FAILURE]: activateFailure,
    [Types.RESET_ACTIVATE_STATE]: resetActivateState
});

/* ---------------------- Selectors --------------------- */

export const isError = state => !!state.activate.error;
export const isActive = state => state.activate.activated;
export const isSent = state => state.activate.sent;