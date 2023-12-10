import {configureStore} from '@reduxjs/toolkit';
import walletReducer from "../components/walletReducer.js";

export const store = configureStore({
    reducer: {
        wallet: walletReducer,
    },
});
