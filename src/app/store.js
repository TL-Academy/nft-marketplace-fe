import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../components/ThemeSwitcher/themeSlice';
import walletReducer from "../components/walletReducer.js";


export const store = configureStore({
    reducer: {
        theme: themeReducer,
        wallet: walletReducer,
    },
});
