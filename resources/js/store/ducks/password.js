import { createActions, createReducer } from 'reduxsauce';

/* -------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
    tokenRequest: ['email'],
    tokenSuccess: null,
    resetRequest: ['token'],
    resetSuccess: null,
    passwordFailure: ['error']
});

/* -------------------- Initial State ------------------- */

const INITIAL_STATE = {
    token: null,
    email: null,
    fetching: false,
    error: null
};

/* ----------------------- Reducers --------------------- */

const tokenRequest = (state, { email }) => ({
    ...state,
    email,
    fetching: true,
    error: null
});

const tokenSuccess = (state) => ({
    ...state,
    fetching: false,
    error: null
});

const resetRequest = (state, { token }) => ({
    ...state,
    token,
    fetching: true,
    error: null
});

const resetSuccess = (state) => ({
    ...state,
    token: null,
    fetching: false,
    error: null
});

const passwordFailure = (state, { error }) => ({
    ...state,
    fetching: false,
    error
});

/* -------------- Hookup Reducers to Types -------------- */

export default createReducer(INITIAL_STATE, {
    [Types.TOKEN_REQUEST]: tokenRequest,
    [Types.TOKEN_SUCCESS]: tokenSuccess,
    [Types.RESET_REQUEST]: resetRequest,
    [Types.RESET_SUCCESS]: resetSuccess,
    [Types.PASSWORD_FAILURE]: passwordFailure
});

/* ---------------------- Selectors --------------------- */

export const isError = state => !!state.password.error;