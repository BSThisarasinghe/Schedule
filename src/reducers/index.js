import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UsernameReducer from './UsernameReducer';
import ScheduleReducer from './ScheduleReducer';

export default combineReducers({
    auth: AuthReducer,
    username: UsernameReducer,
    schedule: ScheduleReducer
});