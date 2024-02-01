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
        removeListedNFT: (state, action) => {
            const { canceledNFTs } = action.payload;

            Object.entries(canceledNFTs).forEach(([collectionName, collectionCanceledNFTs]) => {
                state.listedNFTs[collectionName] = state.listedNFTs[collectionName].map((nft) => {
                    const matchingCanceledNFT = collectionCanceledNFTs.find(
                        (canceledNFT) => canceledNFT.tokenId === nft.tokenId,
                    );

                    if (matchingCanceledNFT && matchingCanceledNFT.blockNumber > nft.blockNumber) {
                        return { ...nft, listed: false };
                    }

                    return nft;
                });
            });
        },
    },
});

export const selectListedNFTs = (state) => state.listedNFTs.listedNFTs;

export const { setListedNFTs, addListedNFT, removeListedNFT } = slice.actions;
export default slice.reducer;
