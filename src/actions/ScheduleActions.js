import firebase from 'firebase';
import {
    ADD_SCHEDULE,
    ADD_SCHEDULE_SUCCESS,
    ADD_SCHEDULE_FAIL,
    SCHEDULE_FETCH_SUCCESS,
    EDIT_SCHEDULE_SUCCESS,
    EDIT_SCHEDULE_FAIL,
    RELOAD_DASHBOARD,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAIL
} from './types';

export const addSchedule = ({ reminder, date, time }) => {
    return (dispatch) => {
        dispatch({
            type: ADD_SCHEDULE
        });
        const { currentUser } = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/schedules`)
            .push({ reminder, date, time })
            .then(() => addScheduleSuccess(dispatch))
            .catch(() => addScheduleFail(dispatch));
    }
};

const addScheduleSuccess = (dispatch) => {
    dispatch({
        type: ADD_SCHEDULE_SUCCESS
    });
};

const addScheduleFail = (dispatch) => {
    dispatch({
        type: ADD_SCHEDULE_FAIL
    });
};

export const scheduleFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/schedules`)
            .on('value', snapshot => {
                dispatch({
                    type: SCHEDULE_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    }
};

export const editSchedule = ({ reminder, date, time, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/schedules/${uid}`)
            .set({ reminder, date, time })
            .then(() => editScheduleSuccess(dispatch))
            .catch(() => editScheduleFail(dispatch));
    };
};

const editScheduleSuccess = (dispatch) => {
    dispatch({
        type: EDIT_SCHEDULE_SUCCESS
    });
};

const editScheduleFail = (dispatch) => {
    dispatch({
        type: EDIT_SCHEDULE_FAIL
    });
};

export const setReload = () => {
    return {
        type: RELOAD_DASHBOARD
    }
};

export const scheduleDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/schedules/${uid}`)
            .remove()
            .then(() => {
                dispatch({
                    type: DELETE_SCHEDULE_SUCCESS
                });
            })
            .catch(() => {
                dispatch({
                    type: DELETE_SCHEDULE_FAIL
                });
            });
    };
}