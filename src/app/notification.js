import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: {
        notifications: {},
        resolved: {},
    },
    reducers: {
        addNotification: (state, action) => {
            const [signature, message] = action.payload;
            console.log(signature, message)
            state.notifications[signature] = message;
        },
        resolveNotification: (state, action) => {
            const signature = action.payload[0]
            state.resolved[signature] = state.notifications[signature];
            delete state.notifications[signature];
        },
        removeResolved: (state, action) => {
            delete state.resolved[action.payload];
        }
    }
});

export const {
    addNotification,
    resolveNotification,
    removeResolved
} = slice.actions;

export default slice.reducer;

export const selectNotifications = (state) => state.notification.notifications;
export const selectResolved = (state) => state.notification.resolved;