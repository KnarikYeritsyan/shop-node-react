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
    USER_LOGOUT
} from "../actions/users";
import Account from "../../helpers/Account";
import {toast} from "react-toastify";

const initialState = {
    token: Account.getToken(),
    registrationRequestStatus: '',
    activationRequestStatus: '',
    loginRequestStatus: '',
    getUsersRequestStatus: '',
    sendMessageRequestStatus: '',
    deleteUserRequestStatus: '',
    users: [],
    profile: {},
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REGISTRATION_REQUEST: {
            return {
                ...state,
                registrationRequestStatus: 'request'
            }
        }

        case REGISTRATION_SUCCESS: {

            return {
                ...state,
                registrationRequestStatus: 'ok'
            }
        }

        case REGISTRATION_FAIL: {
            console.log(action.payload);
            return {
                ...state,
                registrationRequestStatus: 'fail'
            }
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequestStatus: 'request'
            }
        }

        case LOGIN_SUCCESS: {
            const { token, user } = action.payload.data;
            const { rememberMe } = action.payload;
            console.log('yaa')
            Account.setToken(token, rememberMe)
            return {
                ...state,
                token,
                profile: user,
                loginRequestStatus: 'ok'
            }
        }

        case LOGIN_FAIL: {
            const data = action.payload.data
            toast.error(`${data.message}`, {
                position: "top-right",
                autoClose: 3000,
            })
            console.log(data)
            return {
                ...state,
                loginRequestStatus: 'fail'
            }
        }

        case USER_LOGOUT: {
            console.log('logout', reducer.token)
            const token = Account.removeToken();

            return {
                ...state,
                token,
                profile: {},
                userLogOutStatus: 'ok'
            }
        }



        case GET_USERS_LIST_REQUEST: {
            return {
                ...state,
                getUsersRequestStatus: 'request'
            }
        }

        case GET_USERS_LIST_SUCCESS: {
            const { users } = action.payload.data;

            return {
                ...state,
                users,
                getUsersRequestStatus: 'ok'
            }
        }

        case GET_USERS_LIST_FAIL: {
            console.log(action.payload);
            return {
                ...state,
                getUsersRequestStatus: 'fail'
            }
        }




        case SEND_MESSAGE_REQUEST: {
            return {
                ...state,
                sendMessageRequestStatus: 'request'
            }
        }

        case SEND_MESSAGE_SUCCESS: {

            return {
                ...state,
                sendMessageRequestStatus: 'ok'
            }
        }

        case SEND_MESSAGE_FAIL: {
            console.log(action.payload);
            return {
                ...state,
                sendMessageRequestStatus: 'fail'
            }
        }




        case DELETE_USER_REQUEST: {
            return {
                ...state,
                deleteUserRequestStatus: 'request'
            }
        }

        case DELETE_USER_SUCCESS: {

            return {
                ...state,
                deleteUserRequestStatus: 'ok'
            }
        }

        case DELETE_USER_FAIL: {
            console.log(action.payload);
            return {
                ...state,
                deleteUserRequestStatus: 'fail'
            }
        }



        case EMAIL_ACTIVATION_REQUEST: {
            return {
                ...state,
                activationRequestStatus: 'request'
            }
        }

        case EMAIL_ACTIVATION_SUCCESS: {
            const { user } = action.payload.data;
            return {
                ...state,
                activationRequestStatus: 'ok'
            }
        }

        case EMAIL_ACTIVATION_FAIL: {
            return {
                ...state,
                activationRequestStatus: 'fail'
            }
        }

        default: {
            return state
        }
    }
}