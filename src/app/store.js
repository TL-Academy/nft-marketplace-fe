import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../components/ThemeSwitcher/themeSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});
