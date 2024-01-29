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
        addListedNFT: (state, action) => {
            const collection = action.collection;
            const nft = { tokenId: action.tokenId, user: action.seller, price: action.price };

            state.listedNFTs[collection].push(nft);
        },
    },
});

export const selectListedNFTs = (state) => state.listedNFTs.listedNFTs;

export const { setListedNFTs, addListedNFT } = slice.actions;
export default slice.reducer;
