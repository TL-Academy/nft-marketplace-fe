import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mintedNFTs: [],
};

// 1. configurated store => (provider on root level)
// 2. create reducers
// 3. combineReducers
// 4. add rootReducer (contains reducers) to store => (store accepts one reducer)

const nftsSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
        setMintedNFTs: (state, action) => {
            state.mintedNFTs = action.payload;
        },
        addMintedNFT: (state, action) => {
            const { collectionName, nftData } = action.payload

            state.mintedNFTs[collectionName].push(nftData);        
        },
    },
});
export const { setMintedNFTs, addMintedNFT } = nftsSlice.actions;
export default nftsSlice.reducer;
