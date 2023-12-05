import { combineReducers } from 'redux';
import nftsReducer from './collectionSlice';

export const rootReducer = combineReducers({
    nfts: nftsReducer,
});
