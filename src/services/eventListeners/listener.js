import addresses from '../../contracts/addresses.json';
import getContract from '../../utils/ethers/getContract';
import { addApproved, addListed, addMintedNFT } from '../../redux/collectionSlice';
import getCollectionName from '../../utils/getCollectionName';
import priceFormat from '../../utils/priceFormat';
function itemListedListener() {
    return async function itemListedListener(dispatch) {
        const marketplace = addresses[11155111].Marketplace.address;
        const contract = await getContract(marketplace);

        if (contract) {
            contract.on('ItemListed', (nftContract, tokenId, price) => {
                const collection = getCollectionName(nftContract);
                const nftPrice = priceFormat(price);
                const nft = { collection, tokenId: parseInt(tokenId['_hex']), price: nftPrice };
                dispatch(addListed(nft));
            });
        }
    };
}

function itemApprovedListener() {
    return async function itemApprovedListener(dispatch) {
        const collections = addresses[11155111].NftCollections;

        for (const [collectionName, collectionInfo] of Object.entries(collections)) {
            const address = collectionInfo.address;

            const contract = await getContract(address);

            if (contract) {
                contract.on('Approval', async (owner, approved, tokenId) => {
                    const token = parseInt(tokenId['_hex']);
                    const nft = { tokenId: token, collection: collectionName };
                    dispatch(addApproved(nft));
                });
            }
        }
    };
}

function itemMintedListener() {
    return async function itemMintedListener(dispatch) {
        const collections = addresses[11155111].NftCollections;

        for (const [collectionName, collectionInfo] of Object.entries(collections)) {
            const address = collectionInfo.address;

            const contract = await getContract(address);

            if (contract) {
                contract.on('Minted', async (contractAddress, to, tokenId, tokenHash) => {
                    let info = {
                        from: contractAddress,
                        to: to,
                        value: tokenId,
                        data: tokenHash,
                    };

                    try {
                        const response = await fetch(`https://ipfs.io/ipfs/${info.data}`);

                        if (response.ok) {
                            const jsonData = await response.json();
                            jsonData.image = jsonData.image.replace(/^ipfs:\/\//, '');
                            jsonData.address = address;
                            jsonData.owner = info.to;
                            jsonData.approved = false;
                            jsonData.listed = false;
                            jsonData.tokenId = parseInt(info.value);
                            dispatch(addMintedNFT({ collectionName, nftData: jsonData }));
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
            }
        }
    };
}
export { itemListedListener, itemApprovedListener, itemMintedListener };
