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
    error: false
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
    error: false
});

const store = (state) => ({
    ...state,
    fetching: true
});

const storeSuccess = (state, action) => ({
    ...state,
    data: [action.data, ...state.data],
    fetching: false,
    error: false
});

const show = (state) => ({
    ...state,
    fetching: true
});

const showSuccess = (state, action) => ({
    ...state,
    data: action.data,
    fetching: false,
    error: false
});

const update = (state) => ({
    ...state,
    fetching: true
});

const updateSuccess = (state, action) => ({
    ...state,
    data: state.data.map(item => (item.id === action.data.id) ? action.data : item),
    fetching: false,
    error: false
});

const destroy = (state) => ({
    ...state,
    fetching: true,
});

const destroySuccess = (state, action) => ({
    ...state,
    data: state.data.filter(item => (item.id !== action.user.id)),
    fetching: false,
    error: false
});

const failure = (state) => ({
    ...state,
    fetching: false,
    error: true
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