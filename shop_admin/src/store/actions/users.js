import {GET_PRODUCTS_LIST_REQUEST} from "./products";

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL';

export function registrationRequest(formData, cb) {
    return {
        type: REGISTRATION_REQUEST,
        payload: {
            formData, cb
        }
    }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export function loginRequest(formData, rememberMe, cb) {
    return {
        type: LOGIN_REQUEST,
        payload: {
            formData, rememberMe, cb
        }
    }
}

export function userLogOut() {
    return async (dispatch) => {
        try {
            dispatch({
                type: USER_LOGOUT
            })
        } catch (e) {
            console.log(e)
        }
    }
}


export const GET_USERS_LIST_REQUEST = 'GET_USERS_LIST_REQUEST';
export const GET_USERS_LIST_SUCCESS = 'GET_USERS_LIST_SUCCESS';
export const GET_USERS_LIST_FAIL = 'GET_USERS_LIST_FAIL';

export function getUsersRequest() {
    return {
        type: GET_USERS_LIST_REQUEST,
        payload: {

        }
    }
}

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export function deleteUser(id) {
    return {
        type: DELETE_USER_REQUEST,
        payload: {
            id
        }
    }
}

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL     = 'SEND_MESSAGE_FAIL';

export function sendMessage(text, email) {
    return {
        type: SEND_MESSAGE_REQUEST,
        payload: {
            text, email
        }
    }
}



export const EMAIL_ACTIVATION_REQUEST = 'EMAIL_ACTIVATION_REQUEST';
export const EMAIL_ACTIVATION_SUCCESS = 'EMAIL_ACTIVATION_SUCCESS';
export const EMAIL_ACTIVATION_FAIL = 'EMAIL_ACTIVATION_FAIL';

export function emailActivationRequest(query) {
    return {
        type: EMAIL_ACTIVATION_REQUEST,
        payload: {query}
    }
}
