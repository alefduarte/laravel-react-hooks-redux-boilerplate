import { takeLatest, all } from 'redux-saga/effects';

/* ---------------------- Types --------------------- */

import { Types as AuthTypes } from '../ducks/auth';
import { Types as PasswordTypes } from '../ducks/password';
import { Types as UsersTypes } from '../ducks/users';
import { Types as ActivateTypes } from '../ducks/activate';

/* ---------------------- Sagas --------------------- */

import { loginRequest, logoutRequest, refreshRequest } from './auth';
import { tokenRequest, passwordRequest } from './password';
import { sendRequest, activateRequest } from './activate';
import { indexUsers, storeUsers, destroyUsers } from './users';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield all([
        /* ----------------------- Auth --------------------- */
        takeLatest(AuthTypes.LOGIN_REQUEST, loginRequest),
        takeLatest(AuthTypes.REFRESH_REQUEST, refreshRequest),
        takeLatest(AuthTypes.LOGOUT_REQUEST, logoutRequest),
        /* ----------------------- Users -------------------- */
        takeLatest(UsersTypes.INDEX_USERS, indexUsers),
        takeLatest(UsersTypes.STORE_USER, storeUsers),
        takeLatest(UsersTypes.DESTROY_USER, destroyUsers),
        /* ----------------------- Password ----------------- */
        takeLatest(PasswordTypes.TOKEN_REQUEST, tokenRequest),
        takeLatest(PasswordTypes.RESET_REQUEST, passwordRequest),
        /* ----------------------- Activate ----------------- */
        takeLatest(ActivateTypes.SEND_REQUEST, sendRequest),
        takeLatest(ActivateTypes.ACTIVATE_REQUEST, activateRequest),

    ]);
}
