import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'profileNfts',
    initialState: {
        userNfts: {},
    },
    reducers: {
        setUserNfts: (state, action) => {
            const { nfts, user } = action.payload;

            const filteredNFTs = {};

            Object.entries(nfts).forEach(([collection, collectionNFTs]) => {
                const filteredCollectionNFTs = collectionNFTs.filter(
                    (nft) => nft.owner.toLowerCase() === user,
                );
                filteredNFTs[collection] = filteredCollectionNFTs;
            });
            // console.log(filteredNFTs);
            state.userNfts = filteredNFTs;
        },
    },
});

export const profileCollections = (state) => state.userNfts.userNfts;
export const { setUserNfts } = slice.actions;
export default slice.reducer;
