import { combineReducers } from "redux";
import nftsReducer from './collectionSlice'
export default combineReducers({
    nfts: nftsReducer
})