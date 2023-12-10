import {init, useConnectWallet} from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux'; // Import useDispatch

const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/EB_Y3YZKU0iLP46kusxjohflv9CKjsbH";
const injected = injectedModule();

init({
    connect: {
        autoConnectLastWallet: true
    },
    wallets: [injected],
    chains: [{
        id: "0xaa36a7",
        token: "ETH",
        label: "Ethereum Sepolia",
        rpcUrl,
    }]
});

// Action creator
export const setWallet = (address) => {
    return {
        type: 'SET_WALLET',
        payload: address
    };
};

export const clearWallet = () => {
    return {
        type: 'CLEAR_WALLET'
    };
};


export default function ConnectMetamask() {
    const dispatch = useDispatch();

    const [{wallet, connecting}, connect, disconnect] = useConnectWallet();

    useEffect(() => {
        if (!window.ethereum) {
            alert("Install MetaMask");
        }
    }, []);

    useEffect(() => {
        if (wallet) {
            const address = wallet.accounts[0].address;
            dispatch(setWallet(address)); // Dispatch only the address to Redux
        } else {
            dispatch(clearWallet()); // Dispatch action to clear wallet in Redux
        }
    }, [wallet, dispatch]);

    return {
        isConnecting: connecting,
        wallet,
        connectMetamask: connect,
        disconnectMetamask: disconnect
    };
}
// import { useWallets } from "@web3-onboard/react"
// const connectedWallets = useWallets();
// const injectedProvider = connectedWallets[0].provider;
// const provider = new ethers.providers.Web3Provider(injectedProvider);
// const signer = provider.getSigner();
// const contract = new ethers.Contract(ADDRESS, ABI, signer);
// contract.executeWhatever();

