import {
    ADD_SCHEDULE,
    ADD_SCHEDULE_SUCCESS,
    ADD_SCHEDULE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    loading: false,
    success: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SCHEDULE:
            return { ...state, loading: true, error: '', success: false };
        case ADD_SCHEDULE_SUCCESS:
            return { ...state, loading: false, error: '', success: true };
        case ADD_SCHEDULE_FAIL:
            return { ...state, error: 'Something went wrong! Please try again.', loading: false, success: false };
        default:
            return state;
    }
};