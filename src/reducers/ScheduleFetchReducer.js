import {
    SCHEDULE_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    loading: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCHEDULE_FETCH_SUCCESS:
            return { ...state, loading: false, listData: action.payload };
        default:
            return state;
    }
};