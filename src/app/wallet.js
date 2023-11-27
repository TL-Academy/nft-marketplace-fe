import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'wallet',
    initialState: {
        address: null,
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        }
    }
});

export const {
    setAddress
} = slice.actions;

export default slice.reducer;
