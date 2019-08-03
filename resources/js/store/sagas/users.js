import { put, call } from 'redux-saga/effects';
import { Creators } from '../ducks/alerts';
import { Creators as ActionNotification } from '../ducks/notifications';
import { getFormData } from '../../helpers';

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
            yield put(ActionNotification.dangerMessage('Falha ao processar requisição.'))
        }

    } catch (error) {
        yield put(ActionNotification.dangerMessage('Falha ao carregar alertas.'));
        yield put(Creators.failure(error.toString()));
    }
}

export function* storeUsers(action) {
    try {
        const formData = yield call(() => {
            return getFormData(action.alert)
        });

        const response = yield call(() => {
            return Api.post('/users', formData);
        });

        yield put(Creators.storeAlertSuccess(response.data));
        yield put(ActionNotification.successMessage('Alerta criado com sucesso.'))
    } catch (error) {
        yield put(ActionNotification.dangerMessage('Falha ao criar alerta.'));
        yield put(Creators.failure(error.toString()));
    }
}

export function* destroyAlert(action) {
    try {
        yield call(() => {
            return Api.delete('/users', action.data);
        });

        yield put(ActionNotification.successMessage('Alerta removido com sucesso.'));
    } catch (error) {
        yield put(ActionNotification.dangerMessage('Falha ao remover alerta.'));
    }
}