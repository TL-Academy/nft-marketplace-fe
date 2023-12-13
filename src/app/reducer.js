import {combineReducers} from "redux";
import notificationReducer from './notification.js';
import themeReducer from "../components/ThemeSwitcher/themeSlice.js";
import walletReducer from "../components/walletReducer.js";

export default combineReducers({
    notification: notificationReducer,
    theme: themeReducer,
    wallet: walletReducer
})