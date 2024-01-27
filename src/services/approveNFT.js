import getContract from '../utils/ethers/getContract';
import addresses from '../contracts/addresses.json';

export default async function approveNFT(collectionAddress, cardId) {
    const contract = await getContract(collectionAddress);
    const marketplaceAddress = addresses[11155111].Marketplace.address;
    try {
        const approved = await contract.getApproved(cardId); // better to check the events for whether it is aproved?
        if (approved === marketplaceAddress) {
        } else {
            // approving notification
            await contract
                .approve(marketplaceAddress, cardId)
                .then()
                // approve succesfull notification
                // btn text & onClick: approve -> list;

                // approve error notification
                .catch((e) => console.log(e));
        }
    } catch (error) {
        // cant get approved
        console.error('Error approving', error);
    }
}
