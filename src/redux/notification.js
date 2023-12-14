import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
    },
    reducers: {
        addNotification: (state, action) => {
            if (!action.payload.timeout) {
                action.payload['timeout'] = 3000
            }
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
export const firstNotification = (state) => state.notification.notifications.length > 0 ? state.notification.notifications[0] : null;