import addresses from '../contracts/addresses.json';
import getContract from '../utils/ethers/getContract';

export default async function updateListing(address, cardId, newPrice) {
    const maketplaceAddress = addresses[11155111].Marketplace.address;
    const contract = await getContract(maketplaceAddress);
    try {
        // tx notification happening
        contract.updateListing(address, cardId, newPrice);
        // tx notification success
    } catch (error) {
        // tx notification error
        console.error('Error updating', error);
    }
}
