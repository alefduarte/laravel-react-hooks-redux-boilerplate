import { put, call } from 'redux-saga/effects';
import history from "@routes/history";
import { login, getUser, refreshToken, logout } from '../../services';
import { Creators } from '../ducks/auth';
import { LocalStorage } from '../../utils';
/* eslint camelcase: ["error", {ignoreDestructuring: true, allow: ["remember_me"]}] */

export function* loginRequest({ values: { email, password, remember_me } }) {
  try {
    const token = yield call(() => login(email, password, remember_me));
    yield LocalStorage.setItem('token', token.data);

    const user = yield call(() => getUser());
    yield LocalStorage.setItem('user', user.data);

    yield put(Creators.loginSuccess(user.data));

    yield user.data.type === 'admin' ? history.push('/dasboard') : history.push('/home');

  } catch (error) {
    if (error.response.status === 401) {
      yield put(Creators.loginFailure('Invalid username or password!'));
    } else {
      yield put(Creators.loginFailure(error.toString()));
    }
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
    yield global.history.push('/login');

    if (error.response.status === 401) {
      yield put(Creators.loginFailure('Sessão expirada faça o login novamente.'));
    } else {
      yield put(Creators.loginFailure(error.toString()));
    }
  }
}

/** Para maior segurança, ao fazer o logout do cliente
 *  chamar o método para revogar o token de acesso antes
 *  de remover as informações do armazenamento local. */
export function* logoutRequest() {
  const user = yield call(() => getUser());
  yield call(() => logout(user));
  yield call(() => LocalStorage.clear());

  // Redireciona pra a pagina de login.
  yield global.history.push('/login');
}
