import { put, call } from 'redux-saga/effects';
import { Creators } from '../ducks/users';

import { Api } from '../../services/Api';

export function* indexUsers() {
    try {
        const response = yield call(() => {
            return Api.get('/users');
        });

        if (response.status === 200) {
            yield put(Creators.indexAlertsSuccess(response.data));
        }
        else {
            yield put(Creators.failure('Falha ao processar requisição.'))
        }

    } catch (error) {
        yield put(Creators.failure(error.toString()));
    }
}

/* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["password_confirmation"]}] */
export function* storeUsers({ values: { email, password, name, password_confirmation } }) {
    try {
        const response = yield call(() => {
            return Api.post('/users/signup', { email, password, name, password_confirmation });
        });

        yield put(Creators.storeUserSuccess(response.data));
    } catch (error) {
        yield put(Creators.failure(error.toString()));
    }
}

export function* destroyUsers(action) {
    try {
        yield call(() => {
            return Api.delete('/users', action.data);
        });

        yield put(Creators.destroyUserSuccess('Usuário removido com sucesso.'));
    } catch (error) {
        yield put(Creators.failure('Falha ao remover usuário.'));
    }
}