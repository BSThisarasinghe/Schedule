import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UsernameReducer from './UsernameReducer'

export default combineReducers({
    auth: AuthReducer,
    username: UsernameReducer
});