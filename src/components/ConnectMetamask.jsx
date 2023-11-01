import { useEffect, useState } from "react";
import { ethers } from 'ethers';

export default function ConnectMetamask() {

    const [currentAccount, setCurrentAccount] = useState(null);

    useEffect(() => {
        if (!window.ethereum) {
            alert("install MetaMask")
        } else {
            new ethers.providers.Web3Provider(window.ethereum)
                .send("eth_requestAccounts", [])
                .then((accounts) => {
                    // when store set up, dispatch to redux instead of useState
                    if (accounts.length > 0) setCurrentAccount(accounts[0]);
                })
                .catch((e) => console.log(e));
        }
    }, [])

    return
}