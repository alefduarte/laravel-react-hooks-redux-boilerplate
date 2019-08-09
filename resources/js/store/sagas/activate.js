import { put, call } from 'redux-saga/effects';
import { Creators } from '../ducks/activate';

import { Api } from '../../services';

export function* sendRequest({ email }) {
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

export function* activateRequest({ token }) {
    try {
        yield call([Api, 'get'], `/users/activate/${token}`);

        yield put(Creators.activateSuccess());
    } catch (error) {
        yield put(Creators.activateFailure(error.toString()));
    }
}
