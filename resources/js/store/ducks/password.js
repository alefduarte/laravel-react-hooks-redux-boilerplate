import { createActions, createReducer } from 'reduxsauce';

/* -------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
    tokenRequest: ['email'],
    tokenSuccess: null,
    resetRequest: ['token'],
    resetSuccess: null,
    failure: ['error']
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
    fetching: false,
    error: null
});

const tokenSuccess = (state) => ({
    ...state,
    fetching: true,
    error: null
});

const resetRequest = (state, { token }) => ({
    ...state,
    token,
    fetching: false,
    error: null
});

const resetSuccess = (state) => ({
    ...state,
    token: null,
    fetching: true,
    error: null
});

const failure = (state, { error }) => ({
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
    [Types.FAILURE]: failure
});

/* ---------------------- Selectors --------------------- */

export const isError = state => !!state.password.error;