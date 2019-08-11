import { put, call } from 'redux-saga/effects';
import { Creators } from '../ducks/activate';

import { Api } from '../../services';

export function* sendRequest({ email }) {
    try {
        const response = yield call([Api, 'post'], '/users/activate', { email });

        if (response.status === 200) {
            yield put(Creators.sendSuccess(response.data));
        }
        else {
            yield put(Creators.activateFailure('Falha ao processar requisição.'))
        }

    } catch (error) {
        switch (error.response.status) {
            case 403:
                yield put(Creators.activateFailure(403));
                break;
            case 404:
                yield put(Creators.activateFailure(404));
                break;
            default:
                yield put(Creators.activateFailure(error.toString()))
        }
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
