// walletReducer.js

// Action types
const SET_WALLET = 'SET_WALLET';
const CLEAR_WALLET = 'CLEAR_WALLET';

// Action creators (keeping these as they are)

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
                walletAddress: action.payload // Set the payload (address) directly to walletAddress
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
