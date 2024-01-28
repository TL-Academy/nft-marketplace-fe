import { ethers } from 'ethers';
import getAbiResult from '../utils/ethers/getAbiResult';

export const mint = async (tokenHash, contractAddr) => {
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const abi = await getAbiResult(contractAddr);

    const contract = new ethers.Contract(contractAddr, abi, provider.getSigner());

    try {
        const transaction = await contract.mint(tokenHash);
        await transaction.wait();
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
};
