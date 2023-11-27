import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setAddress } from '../app/wallet'

const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/EB_Y3YZKU0iLP46kusxjohflv9CKjsbH"
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
})

export default function ConnectMetamask() {

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!window.ethereum) {
            alert("install MetaMask");
        }
        if (wallet) {
            console.log(wallet.accounts[0].address)
        } else {
            dispatch(setAddress(null));           
        }
    }, [])

    return {
        isConnecting: connecting,
        wallet,
        connectMetamask: connect,
        disconnectMetamask: disconnect
    }

}

// import { useWallets } from "@web3-onboard/react"
// const connectedWallets = useWallets();
// const injectedProvider = connectedWallets[0].provider;
// const provider = new ethers.providers.Web3Provider(injectedProvider);
// const signer = provider.getSigner();
// const contract = new ethers.Contract(ADRESS, ABI, signer);
// contract.executeWhatever();