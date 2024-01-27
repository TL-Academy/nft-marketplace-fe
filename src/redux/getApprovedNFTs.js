import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'approvedNFTs',
    initialState: {
        approvedNFTs: [],
    },
    reducers: {
        setApprovedNFTs: (state, action) => {
            state.approvedNFTs = action.payload;
        },
    },
});

export const selectApprovedNFTs = (state) => state.approvedNFTs.approvedNFTs;

export const { setApprovedNFTs } = slice.actions;
export default slice.reducer;
