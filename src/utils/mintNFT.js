import { ethers } from 'ethers';
// const VITE_WALLET_PRIVATE_KEY = import.meta.env.VITE_WALLET_PRIVATE_KEY;
const VITE_WALLET_PRIVATE_KEY = '653bb0e6a9a5e961b7f827c33b05af435ab22bfd0256bc34ebb8115eaf8ef78a';
// const VITE_RPC_PROVIDER = import.meta.env.VITE_RPC_PROVIDER;
const VITE_RPC_PROVIDER = 'https://eth-sepolia.g.alchemy.com/v2/KOgu726LDKOPc8Nchh3HaGvit1Pmigfo';

const mint = async (tokenHash) => {
    // const addressPath = '../contracts/addresses.json';

    // Fetch the JSON file
    // const response = await fetch(addressPath);
    // const addresses = await response.json();
    // const contractAddress = addresses['11155111']['BoringTokenNFT']['address'];
    const contractAddress = '0x613D5Ba9A1fC6a59CeF90aD0F6cbaf0D9F12ac3c';

    const provider = new ethers.providers.JsonRpcProvider(VITE_RPC_PROVIDER);
    const wallet = new ethers.Wallet(VITE_WALLET_PRIVATE_KEY, provider);

    const abi = await fetch(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`,
    )
        .then((res) => res.json())
        .then((res) => res.result)
        .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    try {
        const transaction = await contract.mint(tokenHash);
        await transaction.wait();
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
};

export default mint;
