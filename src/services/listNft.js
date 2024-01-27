import { ethers } from 'ethers';
import getAbi from '../utils/getAbi';
import contracts from '../contracts/addresses.json';

async function listNft(nftToken, contractAddress, price) {
    const marketplaceAddress = contracts[11155111].Marketplace.address;
    try {
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();
        const abi = await getAbi(marketplaceAddress);
        const contract = new ethers.Contract(marketplaceAddress, abi, signer);

        const transaction = await contract.listItem(contractAddress, nftToken, price);
        await transaction.wait();
        console.log('NFT listed successfully');
    } catch (err) {
        console.log('Error listing NFT', err);
    }
}

export default listNft;
