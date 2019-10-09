import firebase from 'firebase';
import {
    ADD_SCHEDULE,
    ADD_SCHEDULE_SUCCESS,
    ADD_SCHEDULE_FAIL
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