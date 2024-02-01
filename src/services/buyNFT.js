import getContract from '../utils/ethers/getContract';
import addresses from '../contracts/addresses.json';
import { ethers } from 'ethers';

export default async function buyNFT(address, cardId, price) {
    const maketplaceAddress = addresses[11155111].Marketplace.address;
    const contract = await getContract(maketplaceAddress);
    const options = {value: ethers.utils.parseEther(price), gasLimit: 3000000}
    try {
        // show notification that tx is happening
        const tx = await contract.buyItem(address, cardId, options);
        const res = await tx.wait();
        console.log(res)
        // show notification that tx succesfull
    } catch (error) {
        // show notification that tx failed
        console.error('Error buying', error);
    }
}