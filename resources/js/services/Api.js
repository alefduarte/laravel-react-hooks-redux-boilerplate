import axios from 'axios';
import { LocalStorage } from '../utils';
/* eslint camelcase: ["error", {properties: "never", 
ignoreDestructuring: true, allow: ["refresh_token", "token_type", "access_token", "remember_me"]}] */

// Enviroment Variables
// Could only work having single destructuring
const { MIX_AUTH_URL } = process.env
const { MIX_API_URL } = process.env
const { MIX_API_CLIENT_ID } = process.env
const { MIX_API_GRANT_TYPE } = process.env
const { MIX_API_CLIENT_SECRET } = process.env
const { MIX_API_REFRESH_TOKEN_GRANT_TYPE } = process.env

// Retorna o header da requisição.
const getHeader = () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
});

// Retorna o header da requisição com autenticação JWT se disponível.
const getHeaderAuthorization = () => {
    try {
        const { token_type, access_token } = LocalStorage.getItem('token');

        return {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `${token_type} ${access_token}`,
        };
    } catch (error) {
        return getHeader();
    }
};

// Retorna os tokens de acesso JWT.
export const login = (username, password, remember_me) => axios({
    method: 'POST',
    url: MIX_AUTH_URL,
    headers: getHeader(),
    data: {
        username,
        password,
        remember_me,
        client_id: MIX_API_CLIENT_ID,
        client_secret: MIX_API_CLIENT_SECRET,
        grant_type: MIX_API_GRANT_TYPE,
    },
});

// Faz logout no sistema e revoga o token do usuário.
export const logout = () => axios({
    method: 'GET',
    url: `${MIX_API_URL}/logout`,
    headers: getHeaderAuthorization(),
});

/**
 * Faz logout no sistema e revoga todos os tokens gerados para o usuário.
 * Isso vai fazer logout de todos os dispositivos conectados.
 * */
export const forceLogout = () => axios({
    method: 'GET',
    url: `${MIX_API_URL}/force_logout`,
    headers: getHeaderAuthorization(),
});

// Atualiza um token JWT vencido retornando o novo token.
export const refreshToken = refresh_token => axios({
    method: 'POST',
    url: MIX_AUTH_URL,
    headers: getHeader(),
    data: {
        refresh_token,
        client_id: MIX_API_CLIENT_ID,
        client_secret: MIX_API_CLIENT_SECRET,
        grant_type: MIX_API_REFRESH_TOKEN_GRANT_TYPE,
    },
});

// Busca o usuário logado.
export const getUser = () => axios({
    method: 'GET',
    url: `${MIX_API_URL}/user`,
    headers: getHeaderAuthorization(),
});

// Retorna a API para requisições HTTP.
export const Api = axios.create({
    baseURL: MIX_API_URL,
    headers: getHeaderAuthorization(),
});