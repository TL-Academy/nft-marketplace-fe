import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'profileNfts',
    initialState: {
        userNfts: [],
    },
    reducers: {
        setUserNfts: (state, action) => {
            state.userNfts = action.payload;
        },
    },
});

export const profileCollections = (state) => state.userNfts.userNfts;
export const { setUserNfts } = slice.actions;
export default slice.reducer;
