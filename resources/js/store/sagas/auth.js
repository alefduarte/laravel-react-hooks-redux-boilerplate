import { put, call } from 'redux-saga/effects';
import history from "@routes/history";
import { login, getUser, refreshToken, logout } from '../../services';
import { Creators } from '../ducks/auth';
import { LocalStorage } from '../../utils';
/* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["remember_me"]}] */

export function* loginRequest({ email, password, remember_me }) {
  try {
    const token = yield call(() => login(email, password, remember_me));
    yield LocalStorage.setItem('token', token.data);

    const user = yield call(() => getUser());
    yield LocalStorage.setItem('user', user.data);

    yield put(Creators.loginSuccess(user.data));

    yield user.data.type === 'admin' ? history.push('/dashboard') : history.push('/home');

  } catch (error) {
    switch (error.response.status) {
      case 401:
        yield put(Creators.loginFailure(401));
        break;
      case 403:
        yield put(Creators.loginFailure(403));
        break;
      case 429:
        yield put(Creators.loginFailure(429));
        yield put(Creators.lockoutUser(new Date(new Date().getTime() + error.response.data.seconds * 1000)));
        break;
      case 500:
        yield put(Creators.loginFailure("error.500"));
        break;
      default:
        yield put(Creators.loginFailure(error.toString()));
    }
  }
}

export function* refreshRequest() {
  try {
    const user = yield call(() => getUser());
    yield LocalStorage.setItem('user', user.data);

    yield put(Creators.refreshSuccess(user.data));
  } catch (error) {
    yield put(Creators.loginFailure(error.toString()));
  }
}

export function* refreshTokenRequest() {
  try {
    // Implementar logica para verificar a validade do token antes de solicitar um novo.
    // eslint-disable-next-line camelcase
    const { refresh_token } = yield call(() => LocalStorage.getItem('token'));
    const token = yield call(() => refreshToken(refresh_token));
    yield LocalStorage.setItem('token', token.data);
  } catch (error) {
    yield history.push('/login');

    if (error.response.status === 401) {
      yield put(Creators.loginFailure('Sessão expirada faça o login novamente.'));
    } else {
      yield put(Creators.loginFailure(error.toString()));
    }
  }
}

export function* logoutRequest() {
  try {
    const user = yield call(() => getUser());
    yield call(() => logout(user));
    yield call(() => LocalStorage.clear());
    yield history.push('/login');
  }
  catch (error) {
    if (error.response.status === 401) {
      yield call(() => LocalStorage.clear());
      yield history.push('/login');
    }
  }
} 
