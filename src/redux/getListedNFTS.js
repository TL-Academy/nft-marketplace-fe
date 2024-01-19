import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'listedNFTs',
    initialState: {
        listedNFTs: [],
    },
    reducers: {
        setListedNFTs: (state, action) => {
            state.listedNFTs = action.payload;
        },
    },
});

export const selectListedNFTs = (state) => state.listedNFTs.listedNFTs;

export const { setListedNFTs } = slice.actions;
export default slice.reducer;
