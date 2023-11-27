import { combineReducers } from "redux";
import walletReducer from './wallet.js';

export default combineReducers({
    wallet: walletReducer,
})