import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,
    EMAIL_ACTIVATION_REQUEST,
    EMAIL_ACTIVATION_SUCCESS,
    EMAIL_ACTIVATION_FAIL,
    USER_LOGOUT,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CONFIRM_CODE_REQUEST,
    CONFIRM_CODE_SUCCESS,
    CONFIRM_CODE_FAIL,
    RECOVER_PASSWORD_REQUEST,
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_FAIL,
} from "../actions/users";
import Account from "../../helpers/Account";
import {toast} from "react-toastify";
import {useStore} from "react-redux";

const initialState = {
    token: Account.getToken(),
    registrationRequestStatus: '',
    activationRequestStatus: '',
    loginRequestStatus: '',
    getUserInfoStatus: '',
    updateUserInfoStatus: '',
    forgotPasswordRequestStatus: '',
    confirmCodeRequestStatus: '',
    recoverPasswordRequestStatus: '',
    profile: {},
};

// console.log()


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

        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequestStatus: 'request'
            }
        }

        case FORGOT_PASSWORD_SUCCESS: {
            // const { token, user } = action.payload.data;

            return {
                ...state,
                forgotPasswordRequestStatus: 'ok'
            }
        }

        case FORGOT_PASSWORD_FAIL: {
            // const data = action.payload.data
            // toast.error(`${data.message}`, {
            //     position: "top-right",
            //     autoClose: 3000,
            // })
            return {
                ...state,
                forgotPasswordRequestStatus: 'fail'
            }
        }


        case CONFIRM_CODE_REQUEST: {
            return {
                ...state,
                confirmCodeRequestStatus: 'request'
            }
        }

        case CONFIRM_CODE_SUCCESS: {
            // const { token, user } = action.payload.data;

            return {
                ...state,
                confirmCodeRequestStatus: 'ok'
            }
        }

        case CONFIRM_CODE_FAIL: {
            // const data = action.payload.data
            // toast.error(`${data.message}`, {
            //     position: "top-right",
            //     autoClose: 3000,
            // })
            return {
                ...state,
                confirmCodeRequestStatus: 'fail'
            }
        }



        case RECOVER_PASSWORD_REQUEST: {
            return {
                ...state,
                recoverPasswordRequestStatus: 'request'
            }
        }

        case RECOVER_PASSWORD_SUCCESS: {
            const { token, user } = action.payload.data;
            Account.setToken(token, true)
            return {
                ...state,
                token,
                profile: user,
                recoverPasswordRequestStatus: 'ok'
            }
        }

        case RECOVER_PASSWORD_FAIL: {
            // const data = action.payload.data
            // toast.error(`${data.message}`, {
            //     position: "top-right",
            //     autoClose: 3000,
            // })
            return {
                ...state,
                recoverPasswordRequestStatus: 'fail'
            }
        }




        case GET_USER_INFO_REQUEST: {
            return {
                ...state,
                getUserInfoStatus: 'request'
            }
        }

        case GET_USER_INFO_SUCCESS: {
            const { user } = action.payload.data;
            return {
                ...state,
                profile: user,
                getUserInfoStatus: 'ok'
            }
        }

        case GET_USER_INFO_FAIL: {
            const data = action.payload.data
            toast.error(`${data.message}`, {
                position: "top-right",
                autoClose: 3000,
            })
            console.log(data)
            return {
                ...state,
                getUserInfoStatus: 'fail'
            }
        }

        case UPDATE_USER_INFO_REQUEST: {
            return {
                ...state,
                updateUserInfoStatus: 'request'
            }
        }

        case UPDATE_USER_INFO_SUCCESS: {
            const { user } = action.payload.data;
            toast.success(`user data is updated`, {
                style: {top: 55, right: 0},
                autoClose: 1500,
            })
            return {
                ...state,
                profile: user,
                updateUserInfoStatus: 'ok'
            }
        }

        case UPDATE_USER_INFO_FAIL: {
            const data = action.payload.data
            toast.error(`${data.message}`, {
                position: "top-right",
                autoClose: 3000,
            })
            console.log(data)
            return {
                ...state,
                updateUserInfoStatus: 'fail'
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