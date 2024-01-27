import getAbi from '../getAbi';
import { ethers } from 'ethers';

async function getContract(_address) {
    console.log(_address);
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider.getSigner();
    const abi = await getAbi(_address);
    const contract = new ethers.Contract(_address, abi, signer);
    return contract;
}

export default getContract;
