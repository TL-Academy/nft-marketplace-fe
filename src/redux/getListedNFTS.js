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
        filterListedNFTs: (state, action) => {
            const mintedNFTs = action.payload;
            for (const mintedList in mintedNFTs) {
                if (state.listedNFTs[mintedList]) {
                    state.listedNFTs[mintedList] = state.listedNFTs[mintedList].map((listedNft) => {
                        const mintedNft = mintedNFTs[mintedList].find(
                            (nft) => nft.tokenId === listedNft.tokenId,
                        );
                        return mintedNft ? mintedNft : listedNft;
                    });
                }
            }
        },
    },
});

export const selectListedNFTs = (state) => state.listedNFTs.listedNFTs;

export const { setListedNFTs, filterListedNFTs } = slice.actions;
export default slice.reducer;
