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
            const { collectionName, nftData } = action.payload;

            state.mintedNFTs[collectionName].push(nftData);
        },
        filterListedNFTs: (state, action) => {
            const { listedNFTs } = action.payload;

            Object.entries(listedNFTs).forEach(([collectionName, collectionListedNFTs]) => {
                // Iterate through the mintedNFTs array for the specified collection
                state.mintedNFTs[collectionName].forEach((mintedNFT) => {
                    // Check if the mintedNFT is present in the listedNFTs array
                    const listedNFT = collectionListedNFTs.find(
                        (listed) => listed.tokenId === mintedNFT.tokenId,
                    );
                    // If the mintedNFT is listed, update its 'listed' property
                    if (listedNFT) {
                        mintedNFT.listed = true;
                        mintedNFT.price = listedNFT.price;
                    } else {
                        // If not listed, set the 'listed' property to false
                        mintedNFT.listed = false;
                    }
                });
            });
        },
        setApprovedState: (state, action) => {
            const { approvedNFTs } = action.payload;

            Object.entries(approvedNFTs).forEach(([collectionName, collectionApprovedNFTs]) => {
                state.mintedNFTs[collectionName].forEach((nft) => {
                    const approvedNFT = collectionApprovedNFTs.find(
                        (approved) => approved.tokenId === nft.tokenId,
                    );
                    if (approvedNFT) {
                        nft.approved = true;
                    } else {
                        nft.approved = false;
                    }
                });
            });
        },
    },
});

export const getMintedNFTs = (state) => state.nfts.mintedNFTs;
export const getListed = (state) => state.nfts.listedNFTs;
export const { setMintedNFTs, addMintedNFT, filterListedNFTs, setApprovedState } =
    nftsSlice.actions;
export default nftsSlice.reducer;
