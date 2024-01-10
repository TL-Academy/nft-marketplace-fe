import { ethers } from 'ethers';
import getAbi from './getAbi';

export const mint = async (tokenHash, contractAddr) => {
    // @audit - browserProvider(window.ethereum)

    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const abi = await getAbi(contractAddr);

    const contract = new ethers.Contract(contractAddr, abi, provider.getSigner());

    try {
        const transaction = await contract.mint(tokenHash);
        await transaction.wait();
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
};
