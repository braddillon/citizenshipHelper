import axios from 'axios';
import { push } from 'connected-react-router';
import { fetchSections, fetchAccount } from './';

import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    CLEAR_ACCOUNT,
} from './types';

import { ROOT_URL } from './';

export function signInUser({ username, password }) {
    return function(dispatch) {
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        axios.defaults.xsrfCookieName = 'csrftoken';

        axios
            .post(`${ROOT_URL}/auth/token/`, { username, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                dispatch(fetchAccount());
                dispatch(fetchSections());
                dispatch(push('/'));
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            });
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    return function(dispatch) {
        dispatch({ type: UNAUTH_USER });
        dispatch({ type: CLEAR_ACCOUNT });
        dispatch(push('/'));
    };
}
