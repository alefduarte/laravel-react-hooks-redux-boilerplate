import { takeLatest, all } from 'redux-saga/effects';

/* ---------------------- Types --------------------- */

import { Types as AuthTypes } from '../ducks/auth';

/* ---------------------- Sagas --------------------- */

import { loginRequest, logoutRequest } from './auth';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield all([
        /* ----------------------- Auth --------------------- */
        takeLatest(AuthTypes.LOGIN_REQUEST, loginRequest),
        takeLatest(AuthTypes.LOGOUT_REQUEST, logoutRequest),
    ]);
}
