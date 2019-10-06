import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGN_OUT,
    SIGN_OUT_FAIL,
    REGISTER_USER_FAIL,
    PASSWORD_FAIL,
    REGISTER_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    cpwd: '',
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed!', password: '', loading: false };
        case REGISTER_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case REGISTER_USER_FAIL:
            return { ...state, error: 'Registration Failed!', loading: false };
        case PASSWORD_FAIL:
            return { ...state, error: 'Passwords do not match!', password: '', loading: false };
        case SIGN_OUT:
            return { ...state, ...INITIAL_STATE };
        case SIGN_OUT_FAIL:
            return { ...state, error: 'Sign Out Failed!' };
        default:
            return state;
    }
};