import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGN_OUT,
    SIGN_OUT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
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
        case SIGN_OUT:
            return { ...INITIAL_STATE };
        case SIGN_OUT_FAIL:
            return { ...state, error: 'Sign Out Failed!' };
        default:
            return state;
    }
};