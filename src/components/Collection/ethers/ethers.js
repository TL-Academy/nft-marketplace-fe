import { ethers } from "ethers";
import {EventTypes} from '../../../constants/constants.js'
import { useDispatch } from 'react-redux';
import { setMintedNFTs } from "../redux/collectionSlice.js";

const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Hc07aMBuKMeImM2UAOg8n_DeXFPcakph')
const CONTRACT_ADDRESS = '0x613D5Ba9A1fC6a59CeF90aD0F6cbaf0D9F12ac3c'
const ETHERSCAN_API_KEY = 'IQSJAZFXHHBCHWFDU4B56G5YKWSQ4MIKCV'

const abi = await fetch(`https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}}`)
    .then((res) => res.json())
    .then((res) => res.result)
    .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

export const getAllMintedNFTs = async () => {
    const dispatch = useDispatch();
    try {
        const fromBlock = 4795836
        const filter = contract.filters[EventTypes.MINTED]();
        const nfts = await contract.queryFilter(filter, fromBlock, 'latest')

        const mintedNFTsData = await Promise.all(
            nfts.map(async (nft) => {
                console.log(nft);
              const res = await fetch(`https://ipfs.io/ipfs/${nft.args.tokenHash}`);
              console.log(res.json());
              return res.json();
            })
          );
        
          dispatch(setMintedNFTs(mintedNFTsData))
    } catch (error) {
        console.error("Error fetching Minted NFT's", error);
    }
    
}
getAllMintedNFTs()