import { ethers } from 'ethers';
const VITE_WALLET_PRIVATE_KEY = import.meta.env.VITE_WALLET_PRIVATE_KEY;
const VITE_RPC_PROVIDER = import.meta.env.VITE_RPC_PROVIDER;

export const mint = async (tokenHash, contractAddr) => {
    // @audit - browserProvider(window.ethereum)
    const provider = new ethers.providers.JsonRpcProvider(VITE_RPC_PROVIDER);

    // @audit remove private key
    const wallet = new ethers.Wallet(VITE_WALLET_PRIVATE_KEY, provider);

    const abi = await fetch(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddr}`,
    )
        .then((res) => res.json())
        .then((res) => res.result)
        .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));

    const contract = new ethers.Contract(contractAddr, abi, wallet);

    try {
        const transaction = await contract.mint(tokenHash);
        await transaction.wait();
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
};
