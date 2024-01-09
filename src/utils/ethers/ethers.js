import { ethers } from 'ethers';
import { store } from '../../redux/store.js';
import { addMintedNFT, setMintedNFTs } from '../../redux/collectionSlice.js';
import { setUserNfts } from '../../redux/profileNfts.js';
import {
    EventTypes,
    PROVIDER_ADDRESS,
    CONTRACT_ADDRESS,
    ETHERSCAN_API_KEY,
} from '../../constants/constants.js';
import addresses from '../../contracts/addresses.json';

// @audit - not used - remove (check old version of the code to see if it was used)
// const addressesKey = Object.keys(addresses)[0];
// const fromBlock = addresses[addressesKey].NftCollections.BoringTokenNFT.fromBlock;

export const provider = new ethers.providers.JsonRpcProvider(PROVIDER_ADDRESS);
const abi = await fetch(
    `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}}`,
)
    .then((res) => res.json())
    .then((res) => res.result)
    .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));

// @audit check this
export const getAllMintedNFTs = () => {
    return async function (dispatch) {
        try {
            const nftCollections = Object.entries(addresses['11155111']['NftCollections']);
            let mintedNFTsData = {};

            for (const [collectionName, collectionData] of nftCollections) {
                const contract = new ethers.Contract(collectionData.address, abi, provider);
                const filter = contract.filters[EventTypes.MINTED]();
                const nfts = await contract.queryFilter(filter, collectionData.fromBlock, 'latest');

                mintedNFTsData[collectionName] = await Promise.all(
                    nfts.map(async (nft) => {
                        const res = await fetch(`https://ipfs.io/ipfs/${nft?.args?.tokenHash}`);
                        if (!res) {
                            return;
                        }
                        const data = await res.json();
                        console.log(nft);
                        // @audit validate data
                        data.image = data.image.replace(/^ipfs:\/\//, '');
                        data.collectionName = collectionName;
                        data.address = nft.address;
                        data.owner = nft.args.to;

                        return data;
                    }),
                );
            }

            dispatch(setMintedNFTs(mintedNFTsData));
        } catch (error) {
            console.error("Error fetching all minted NFT's", error);
        }
    };
};

// @audit - remove
store.dispatch(getAllMintedNFTs());

export const getUserNfts = (userId) => {
    return async function (dispatch) {
        try {
            const nftCollections = Object.entries(addresses['11155111']['NftCollections']);
            let userNftData = {};

            for (const [collectionName, collectionData] of nftCollections) {
                const contract = new ethers.Contract(collectionData.address, abi, provider);
                const filter = contract.filters[EventTypes.MINTED]();
                const nfts = await contract.queryFilter(filter, collectionData.fromBlock, 'latest');

                await Promise.all(
                    nfts.map(async (nft) => {
                        if (nft.args.to.toLowerCase() == userId) {
                            userNftData[collectionName] = [];
                            const res = await fetch(`https://ipfs.io/ipfs/${nft.args.tokenHash}`);

                            const data = await res.json();
                            data.image = data.image.replace(/^ipfs:\/\//, '');
                            data.address = nft.address;
                            data.owner = nft.args.to;

                            userNftData[collectionName].push(data);
                        }
                    }),
                );
            }
            dispatch(setUserNfts(userNftData));
        } catch (error) {
            console.error("Error fetching NFT's for the current user", error);
        }
    };
};

// @audit
// if we have an event listener for mint we should update the state un the event handler function
// if we don't  update the state in the mint submit function
const updateNfts = async () => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
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
                console.error(
                    'Failed to fetch data from IPFS:',
                    response.status,
                    response.statusText,
                );
            }
        } catch (error) {
            console.error('Error fetching data from IPFS:', error.message);
        }
    });
};
// @audit - remove
// updateNfts();
