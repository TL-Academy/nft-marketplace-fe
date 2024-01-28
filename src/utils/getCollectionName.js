import addresses from '../contracts/addresses.json';

function getCollectionName(address) {
    for (const key in addresses['11155111']['NftCollections']) {
        if (addresses['11155111']['NftCollections'].hasOwnProperty(key)) {
            const collection = addresses['11155111']['NftCollections'][key];
            if (collection['address'] === address) {
                return key;
            }
        }
    }
}

export default getCollectionName;
