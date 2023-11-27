import { combineReducers } from "redux";
import notificationReducer from './notification.js';

export default combineReducers({
    notification: notificationReducer,
})