import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: {
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const {
    setLoading
} = slice.actions;

export default slice.reducer;
