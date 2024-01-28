import addresses from '../contracts/addresses.json';
import getContract from '../utils/ethers/getContract';

export default async function cancelListing(address, cardId) {
    const maketplaceAddress = addresses[11155111].Marketplace.address;

    const contract = await getContract(maketplaceAddress); // don't hardcode
    try {
        // tx notification happening
        contract.cancelListing(address, cardId);
        contract.on();
        // tx notification success
    } catch (error) {
        // tx notification error
        console.error('Error delisting', error);
    }
}
