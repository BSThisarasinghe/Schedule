import {
    ADD_SCHEDULE,
    ADD_SCHEDULE_SUCCESS,
    ADD_SCHEDULE_FAIL,
    EDIT_SCHEDULE_SUCCESS,
    EDIT_SCHEDULE_FAIL,
    RELOAD_DASHBOARD,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    loading: false,
    success: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RELOAD_DASHBOARD:
            return INITIAL_STATE;
        case ADD_SCHEDULE:
            return { ...state, loading: true, error: '', success: false };
        case ADD_SCHEDULE_SUCCESS:
            return { ...state, loading: false, error: '', success: true };
        case ADD_SCHEDULE_FAIL:
            return { ...state, error: 'Something went wrong! Please try again.', loading: false, success: false };
        case EDIT_SCHEDULE_SUCCESS:
            return { ...state, error: '', loading: false, success: true };
        case EDIT_SCHEDULE_FAIL:
            return { ...state, error: 'Something went wrong! Please try again.', loading: false, success: false };
        case DELETE_SCHEDULE_SUCCESS:
            return { ...state, error: '', loading: false, success: true };
        case DELETE_SCHEDULE_FAIL:
            return { ...state, error: 'Deletion failed! Please try again.', loading: false, success: false };
        default:
            return state;
    }
};