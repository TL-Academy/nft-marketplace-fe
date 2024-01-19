import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mintedNFTs: [],
    listedNFTs: [],
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
            const { collectionName, nftData } = action.payload;

            state.mintedNFTs[collectionName].push(nftData);
        },
        filterListedNFTs: (state, action) => {
            const { nfts, listedNFTs } = action.payload;

            const filteredNFTs = {};

            Object.keys(listedNFTs).forEach((collectionName) => {
                const mintedNFTs = nfts[collectionName] || [];
                const _listedNFTs = listedNFTs[collectionName] || [];
                const filteredMintedNFTs = mintedNFTs.filter((mintedNFT) =>
                    _listedNFTs.some((listedNFT) => listedNFT.tokenId === mintedNFT.tokenId),
                );

                filteredNFTs[collectionName] = { ...filteredMintedNFTs };
            });

            state.listedNFTs = { ...state.listedNFTs, ...filteredNFTs };
        },
    },
});

export const getMintedNFTs = (state) => state.nfts.mintedNFTs;
export const getListed = (state) => state.nfts.listedNFTs;
export const { setMintedNFTs, addMintedNFT, filterListedNFTs } = nftsSlice.actions;
export default nftsSlice.reducer;
