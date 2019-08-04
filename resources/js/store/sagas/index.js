import { takeLatest, all } from 'redux-saga/effects';

/* ---------------------- Types --------------------- */

import { Types as AuthTypes } from '../ducks/auth';
import { Types as UsersTypes } from '../ducks/users';

/* ---------------------- Sagas --------------------- */

import { loginRequest, logoutRequest } from './auth';
import { indexUsers, storeUsers, destroyUsers } from './users';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield all([
        /* ----------------------- Auth --------------------- */
        takeLatest(AuthTypes.LOGIN_REQUEST, loginRequest),
        takeLatest(AuthTypes.LOGOUT_REQUEST, logoutRequest),
        takeLatest(UsersTypes.INDEX_USERS, indexUsers),
        takeLatest(UsersTypes.STORE_USER, storeUsers),
        takeLatest(UsersTypes.DESTROY_USER, destroyUsers),
    ]);
}
