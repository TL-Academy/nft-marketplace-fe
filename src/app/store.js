import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer.js';

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        // add custom middlewares here
    )
});