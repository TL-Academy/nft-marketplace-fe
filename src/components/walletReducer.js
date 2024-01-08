const SET_WALLET = 'SET_WALLET';
const CLEAR_WALLET = 'CLEAR_WALLET';


const initialState = {
    walletAddress: null
};


const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WALLET:
            return {
                ...state,
                walletAddress: action.payload
            };
        case CLEAR_WALLET:
            return {
                ...state,
                walletAddress: null
            };
        default:
            return state;
    }
};

export default walletReducer;

export const selectAddress = (state) => state.wallet.walletAddress;