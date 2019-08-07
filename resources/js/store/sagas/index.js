import { takeLatest, all } from 'redux-saga/effects';

/* ---------------------- Types --------------------- */

import { Types as AuthTypes } from '../ducks/auth';
import { Types as PasswordTypes } from '../ducks/password';
import { Types as UsersTypes } from '../ducks/users';

/* ---------------------- Sagas --------------------- */

import { loginRequest, logoutRequest } from './auth';
import { tokenRequest, passwordRequest } from './password';
import { indexUsers, storeUsers, destroyUsers } from './users';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield all([
        /* ----------------------- Auth --------------------- */
        takeLatest(AuthTypes.LOGIN_REQUEST, loginRequest),
        takeLatest(AuthTypes.LOGOUT_REQUEST, logoutRequest),
        /* ----------------------- Users -------------------- */
        takeLatest(UsersTypes.INDEX_USERS, indexUsers),
        takeLatest(UsersTypes.STORE_USER, storeUsers),
        takeLatest(UsersTypes.DESTROY_USER, destroyUsers),
        /* ----------------------- Password ----------------- */
        takeLatest(PasswordTypes.TOKEN_REQUEST, tokenRequest),
        takeLatest(PasswordTypes.RESET_REQUEST, passwordRequest),

    ]);
}
