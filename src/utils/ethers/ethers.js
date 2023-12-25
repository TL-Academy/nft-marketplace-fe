import { ethers } from 'ethers';
import {
    EventTypes,
    PROVIDER_ADDRESS,
    CONTRACT_ADDRESS,
    ETHERSCAN_API_KEY,
} from '../../constants/constants.js';
import { addMintedNFT, setMintedNFTs } from '../../redux/collectionSlice.js';
import { store } from '../../redux/store.js';
import addresses from '../../contracts/addresses.json';

export const provider = new ethers.providers.JsonRpcProvider(PROVIDER_ADDRESS);

const abi = await fetch(
    `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}}`,
)
    .then((res) => res.json())
    .then((res) => res.result)
    .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

const addressesKey = Object.keys(addresses)[0];
const fromBlock = addresses[addressesKey].NftCollections.BoringTokenNFT.fromBlock;

export const getAllMintedNFTs = () => {
    return async function (dispatch) {
        try {

            const filter = contract.filters[EventTypes.MINTED]();
            const nfts = await contract.queryFilter(filter, fromBlock, 'latest');

            const mintedNFTsData = await Promise.all(
                nfts.map(async (nft) => {
                    const res = await fetch(`https://ipfs.io/ipfs/${nft.args.tokenHash}`);
                    const data = await res.json();

                    data.image = data.image.replace(/^ipfs:\/\//, '');
                    return data;
                }),
            );

            dispatch(setMintedNFTs(mintedNFTsData));
        } catch (error) {
            console.error("Error fetching Minted NFT's", error);
        }
    }; 
};
store.dispatch(getAllMintedNFTs());

export const getUserNfts = async () => {
        try {
            const filter = contract.filters[EventTypes.MINTED]();
            const nfts = await contract.queryFilter(filter, fromBlock, 'latest');

            console.log(nfts);
            const userNfts = await Promise.all(
                nfts.map(async (nft) => {
                    //get userId from connectMetamask (look at NavBar component)
                    if(nft.args[1] == userId){
                        const res = await fetch(`https://ipfs.io/ipfs/${nft.args.tokenHash}`);
                        const data = await res.json();

                        data.image = data.image.replace(/^ipfs:\/\//, '');
                    
                        return data;
                    }
                })
            )
            //console.log(nft.args[1]);
        } catch (error) {
            console.error("Error fetching NFT's for current user", error)
        }
    }
    getUserNfts()

const filter = contract.filters[EventTypes.MINTED]();
contract.on(filter, async (from, to, value, event) => {
    let info = {
        from: from,
        to: to,
        value: value,
        data: event,
    };

    try {
        const response = await fetch(`https://ipfs.io/ipfs/${info.data}`);

        if (response.ok) {
            const jsonData = await response.json();
            store.dispatch(addMintedNFT(jsonData));
        } else {
            console.error('Failed to fetch data from IPFS:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data from IPFS:', error.message);
    }
});
