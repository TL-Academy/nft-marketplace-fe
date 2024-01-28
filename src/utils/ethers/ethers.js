import { ethers } from 'ethers';
import { store } from '../../redux/store.js';
import { addMintedNFT, setMintedNFTs } from '../../redux/collectionSlice.js';
import { setUserNfts } from '../../redux/profileNfts.js';
import { setListedNFTs } from '../../redux/getListedNFTS.js';
import { EventTypes, PROVIDER_ADDRESS } from '../../constants/constants.js';
import addresses from '../../contracts/addresses.json';
import getAbiResult from './getAbiResult.js';
import { setApprovedNFTs } from '../../redux/getApprovedNFTs.js';
import getCollectionName from '../getCollectionName.js';

export const provider = new ethers.providers.JsonRpcProvider(PROVIDER_ADDRESS);

export const getAllMintedNFTs = () => {
    return async function (dispatch) {
        try {
            const nftCollections = Object.entries(addresses['11155111']['NftCollections']);
            let mintedNFTsData = {};

            for (const [collectionName, collectionData] of nftCollections) {
                const abi = await getAbiResult(collectionData.address);
                const contract = new ethers.Contract(collectionData.address, abi, provider);
                const filter = contract.filters[EventTypes.MINTED]();
                const nfts = await contract.queryFilter(filter, collectionData.fromBlock, 'latest');

                mintedNFTsData[collectionName] = await Promise.all(
                    nfts.map(async (nft) => {
                        const tokenId = parseInt(nft.args[2]['_hex']);
                        const res = await fetch(`https://ipfs.io/ipfs/${nft?.args?.tokenHash}`);
                        if (!res) {
                            return;
                        }
                        const data = await res.json();
                        // @audit validate data
                        data.image = data.image.replace(/^ipfs:\/\//, '');
                        data.address = nft.address;
                        data.owner = nft.args.to;
                        data.tokenId = tokenId;
                        data.listed = false;
                        data.approved = false;

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

export const getUserNfts = (userId) => {
    return async function (dispatch) {
        try {
            const nftCollections = Object.entries(addresses['11155111']['NftCollections']);
            let userNftData = {};

            for (const [collectionName, collectionData] of nftCollections) {
                const abi = await getAbiResult(collectionData.address);
                const contract = new ethers.Contract(collectionData.address, abi, provider);
                const filter = contract.filters[EventTypes.MINTED]();
                const nfts = await contract.queryFilter(filter, collectionData.fromBlock, 'latest');

                await Promise.all(
                    nfts.map(async (nft) => {
                        if (nft.args.to.toLowerCase() == userId) {
                            userNftData[collectionName] = [];
                            const tokenId = parseInt(nft.args[2]['_hex']);
                            const res = await fetch(`https://ipfs.io/ipfs/${nft.args.tokenHash}`);

                            const data = await res.json();
                            data.image = data.image.replace(/^ipfs:\/\//, '');
                            data.address = nft.address;
                            data.owner = nft.args.to;
                            data.tokenId = tokenId;

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

export const updateNfts = async (contractAddress, owner, collectionName) => {
    const abi = await getAbiResult(contractAddress);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    contract.on('Minted', async (from, to, value, event) => {
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
                jsonData.image = jsonData.image.replace(/^ipfs:\/\//, '');
                jsonData.address = contractAddress;
                jsonData.owner = owner;
                store.dispatch(addMintedNFT({ collectionName, nftData: jsonData }));
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

export const getListedNFTs = (userId) => {
    return async function (dispatch) {
        try {
            let listedNFTs = {};
            const marketplace = Object.entries(addresses['11155111']['Marketplace']);

            const abi = await getAbiResult(marketplace[0][1]);
            const contract = new ethers.Contract(marketplace[0][1], abi, provider);

            const filter = contract.filters.ItemListed();
            const listed = await contract.queryFilter(filter);

            for (const item of listed) {
                const nft = {};

                const contractAddress = item.args.nftContract;

                const collectionName = getCollectionName(contractAddress);

                nft['tokenId'] = parseInt(item.args.tokenId['_hex']);
                nft['user'] = item.args.seller;
                nft['price'] = ethers.utils.formatEther(item.args.price);

                if (!listedNFTs[collectionName]) {
                    listedNFTs[collectionName] = [];
                }

                listedNFTs[collectionName].push(nft);
            }

            dispatch(setListedNFTs(listedNFTs));
        } catch (error) {
            console.error("Error fetching NFT's for the current user", error);
        }
    };
};

export const getApprovedNFTs = () => {
    return async function (dispatch) {
        try {
            const nftCollections = Object.entries(addresses['11155111']['NftCollections']);
            const approvedNFTs = {};

            for (const collection of nftCollections) {
                const collectionName = collection['0'];
                const abi = await getAbiResult(collection[1].address);
                const contract = new ethers.Contract(collection[1].address, abi, provider);
                const filter = contract.filters.Approval();
                const approved = await contract.queryFilter(filter);

                const uniqueTokenIds = new Set();

                for (const item of approved) {
                    const tokenId = parseInt(item.args.tokenId['_hex']);

                    // Check if the tokenId is already in the set
                    if (!uniqueTokenIds.has(tokenId)) {
                        uniqueTokenIds.add(tokenId);

                        const nft = { tokenId };
                        approvedNFTs[collectionName] = approvedNFTs[collectionName] || [];
                        approvedNFTs[collectionName].push(nft);
                    }
                }
            }
            dispatch(setApprovedNFTs(approvedNFTs));
        } catch (err) {
            console.error('Error getting approved nfts', err);
        }
    };
};
