import { call, put, takeLatest } from 'redux-saga/effects'
import Api from "../../Api";

import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USERS_LIST_REQUEST,
    GET_USERS_LIST_SUCCESS,
    GET_USERS_LIST_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    EMAIL_ACTIVATION_REQUEST,
    EMAIL_ACTIVATION_SUCCESS,
    EMAIL_ACTIVATION_FAIL,
    getUsersRequest
} from "../actions/users";

export default function* watcher() {

    yield takeLatest(REGISTRATION_REQUEST, handleRegistration);
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeLatest(GET_USERS_LIST_REQUEST, handleGetUsersListRequest);
    yield takeLatest(SEND_MESSAGE_REQUEST, handleSendMessageRequest);
    yield takeLatest(DELETE_USER_REQUEST, handleDeleteUserRequest);
    yield takeLatest(EMAIL_ACTIVATION_REQUEST, handleEmailActivation);

}

function* handleRegistration(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.registration, formData)
        yield put({
            type: REGISTRATION_SUCCESS,
            payload: {
                data
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.warn(e);
        yield put({
            type: REGISTRATION_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })

        if (action.payload.cb) {
            action.payload.cb(e.response.data, null);
        }
    }
}

function* handleLogin(action) {
    try {
        const { formData, rememberMe } = action.payload;
        const { data } = yield call(Api.login, formData)
        yield put({
            type: LOGIN_SUCCESS,
            payload: {
                data, rememberMe
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        yield put({
            type: LOGIN_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })

        if (action.payload.cb) {
            action.payload.cb(e.response.data, null);
        }
    }
}

function* handleGetUsersListRequest(action) {
    try {

        const { data } = yield call(Api.getUsers)
        yield put({
            type: GET_USERS_LIST_SUCCESS,
            payload: {
                data
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        yield put({
            type: GET_USERS_LIST_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })

        if (action.payload.cb) {
            action.payload.cb(e.response.data, null);
        }
    }
}

function* handleSendMessageRequest(action) {
    try {

        const { text, email } = action.payload;
        const { data } = yield call(Api.sendMessage, text, email)
        yield put({
            type: SEND_MESSAGE_SUCCESS,
            payload: {
                data
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        yield put({
            type: SEND_MESSAGE_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })

        if (action.payload.cb) {
            action.payload.cb(e.response.data, null);
        }
    }
}

function* handleDeleteUserRequest(action) {
    try {
        const { id } = action.payload;
        const { data } = yield call(Api.deleteUser, id)
        yield put({
            type: DELETE_USER_SUCCESS,
            payload: {}
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }

        yield put(getUsersRequest())

    } catch (e) {
        yield put({
            type: DELETE_USER_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })

        if (action.payload.cb) {
            action.payload.cb(e.response.data, null);
        }
    }
}

function* handleEmailActivation(action) {
    try {
        const { query } = action.payload;
        const { data } = yield call(Api.activation, query)
        yield put({
            type: EMAIL_ACTIVATION_SUCCESS,
            payload: {
                data,
            }
        })

    } catch (e) {
        yield put({
            type: EMAIL_ACTIVATION_FAIL,
            message: e.messages,
            payload: {
                data: e.response.data
            }
        })

    }
}