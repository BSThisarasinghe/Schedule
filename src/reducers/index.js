import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UsernameReducer from './UsernameReducer';
import ScheduleReducer from './ScheduleReducer';
import ScheduleFetchReducer from './ScheduleFetchReducer';

export default combineReducers({
    auth: AuthReducer,
    username: UsernameReducer,
    schedule: ScheduleReducer,
    schedules: ScheduleFetchReducer
});