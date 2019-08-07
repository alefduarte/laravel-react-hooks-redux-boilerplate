import { createActions, createReducer } from 'reduxsauce';

/* -------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
    indexUsers: null,
    indexUsersSuccess: ['data'],
    storeUser: ['user'],
    storeUserSuccess: ['data'],
    showUser: ['id'],
    showUserSuccess: ['data'],
    updateUser: ['id', 'user'],
    updateUserSuccess: ['data'],
    destroyUser: ['id'],
    destroyUserSuccess: ['user'],
    failure: ['error']
});

/* -------------------- Initial State ------------------- */

const INITIAL_STATE = {
    data: [],
    fetching: false,
    error: null
};

/* ----------------------- Reducers --------------------- */

const index = (state) => ({
    ...state,
    fetching: true
});

const indexSuccess = (state, action) => ({
    ...state,
    data: action.data,
    fetching: false,
    error: null
});

const store = (state) => ({
    ...state,
    fetching: true,
    error: null
});

const storeSuccess = (state, action) => ({
    ...state,
    data: [action.data, ...state.data],
    fetching: false,
    error: null
});

const show = (state) => ({
    ...state,
    fetching: true
});

const showSuccess = (state, action) => ({
    ...state,
    data: action.data,
    fetching: false,
    error: null
});

const update = (state) => ({
    ...state,
    fetching: true
});

const updateSuccess = (state, action) => ({
    ...state,
    data: state.data.map(item => (item.id === action.data.id) ? action.data : item),
    fetching: false,
    error: null
});

const destroy = (state) => ({
    ...state,
    fetching: true,
});

const destroySuccess = (state, action) => ({
    ...state,
    data: state.data.filter(item => (item.id !== action.user.id)),
    fetching: false,
    error: null
});

const failure = (state, { error }) => ({
    ...state,
    fetching: false,
    error
});

/* -------------- Hookup Reducers to Types -------------- */

export default createReducer(INITIAL_STATE, {
    [Types.INDEX_USERS]: index,
    [Types.INDEX_USERS_SUCCESS]: indexSuccess,
    [Types.STORE_USER]: store,
    [Types.STORE_USER_SUCCESS]: storeSuccess,
    [Types.SHOW_USER]: show,
    [Types.SHOW_USER_SUCCESS]: showSuccess,
    [Types.UPDATE_USER]: update,
    [Types.UPDATE_USER_SUCCESS]: updateSuccess,
    [Types.DESTROY_USER]: destroy,
    [Types.DESTROY_USER_SUCCESS]: destroySuccess,
    [Types.FAILURE]: failure
});

/* ---------------------- Selectors --------------------- */

export const isError = state => !!state.users.error;