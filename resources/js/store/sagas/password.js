import { put, call } from 'redux-saga/effects';
import { Creators } from '../ducks/password';

import { Api } from '../../services';

export function* tokenRequest({ email }) {
    try {
        const response = yield call(() => {
            return Api.post('/password/create', { email });
        });

        if (response.status === 200) {
            yield put(Creators.tokenSuccess(response.data));
        }
        else {
            yield put(Creators.passwordFailure('Falha ao processar requisição.'))
        }

    } catch (error) {
        yield put(Creators.passwordFailure(error.toString()));
    }
}

/* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["password_confirmation"]}] */
export function* passwordRequest({ email, token, password, password_confirmation }) {
    try {
        yield call(() => Api.get(`/password/find/${token}`));

        const response = yield call(() => Api.post(`/password/reset`, { token, email, password, password_confirmation }));

        yield put(Creators.resetSuccess(response.data));
    } catch (error) {
        yield put(Creators.passwordFailure(error.toString()));
    }
}
