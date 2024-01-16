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

export const { setListedNFTs } = slice.actions;
export default slice.reducer;
