import { put, call } from 'redux-saga/effects';
import { Creators } from '../ducks/users';

import { Api } from '../../services';

export function* indexUsers() {
    try {
        const response = yield call(() => {
            return Api.get('/users');
        });

        if (response.status === 200) {
            yield put(Creators.indexUsersSuccess(response.data));
        }
        else {
            yield put(Creators.userFailure('Falha ao processar requisição.'))
        }

    } catch (error) {
        yield put(Creators.userFailure(error.toString()));
    }
}

/* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["password_confirmation"]}] */
export function* storeUsers({ email, password, name, password_confirmation }) {
    try {
        const response = yield call([Api, 'post'], '/users/signup', { email, password, name, password_confirmation });

        yield put(Creators.storeUserSuccess(response.data));
    } catch (error) {
        yield put(Creators.userFailure(error.toString()));
    }
}

export function* destroyUsers(action) {
    try {
        yield call([Api, 'delete'], '/delete', action.data);

        yield put(Creators.destroyUserSuccess('Usuário removido com sucesso.'));
    } catch (error) {
        yield put(Creators.userFailure('Falha ao remover usuário.'));
    }
}