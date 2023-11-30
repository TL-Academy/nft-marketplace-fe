import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
    },
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state) => {
            state.notifications.shift();
        },
    }
});

export const {
    addNotification,
    removeNotification,
} = slice.actions;

export default slice.reducer;

export const selectNotifications = (state) => state.notification.notifications;