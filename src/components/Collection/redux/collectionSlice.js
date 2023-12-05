import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mintedNFTs: []
}

const nftsSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
        setMintedNFTs: (state, action) => {
            state.mintedNFTs = action.payload;
          },
          addMintedNFT: (state, action) => {
            state.mintedNFTs.push(action.payload);
          },
    }
});
export const { setMintedNFTs, addMintedNFT } = nftsSlice.actions
export default nftsSlice.reducer