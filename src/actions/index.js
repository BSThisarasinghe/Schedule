import firebase from 'firebase';
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
    REGISTER_USER_SUCCESS,
    USER_FETCH_SUCCESS
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const registerUser = ({ name, email, password, cpwd, phone }) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        });

        if (password === cpwd) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    const { currentUser } = firebase.auth();
                    firebase.database().ref(`users/${currentUser.uid}/personalinfo`)
                        .push({ name, phone });
                    registerUserSuccess(dispatch, currentUser);
                })
                .catch((error) => console.error(error));
        } else {
            passwordFail(dispatch);
        }
    }
};

const registerUserSuccess = (dispatch, currentUser) => {
    dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: currentUser
    });
};

const registerUserFail = (dispatch) => {
    dispatch({ type: REGISTER_USER_FAIL });
};

const passwordFail = (dispatch) => {
    dispatch({ type: PASSWORD_FAIL });
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
    }
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};

export const logOutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            dispatch({
                type: SIGN_OUT
            });
        }).catch(function (error) {
            // An error happened.
            dispatch({
                type: SIGN_OUT_FAIL
            });
        });
    }
};

export const userFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/personalinfo`)
            .on('value', snapshot => {
                dispatch({
                    type: USER_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    }
};