import {
    USER_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    loading: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_FETCH_SUCCESS:
            return { ...state, loading: false, user_details: action.payload };
        default:
            return state;
    }
};