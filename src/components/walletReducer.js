// walletReducer.js

// Action types
const SET_WALLET = 'SET_WALLET';
const CLEAR_WALLET = 'CLEAR_WALLET';

// Action creators
export const setWallet = (walletAddress) => {
    return {
        type: SET_WALLET,
        payload: walletAddress
    };
};

export const clearWallet = () => {
    return {
        type: CLEAR_WALLET
    };
};

// Initial state
const initialState = {
    walletAddress: null
};

// Reducer
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
