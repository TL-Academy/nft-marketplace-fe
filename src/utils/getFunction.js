import approveNFT from '../services/approveNFT';
import buyNFT from '../services/buyNFT';
import cancelListing from '../services/cancelListing';
import listNft from '../services/listNft';
import updateListing from '../services/updateListing';

function getFunction(nft, wallet) {
    const owner = nft.owner.toLowerCase();
    if (!owner) return;

    if (wallet !== owner && nft.listed) {
        return { text: 'Buy', func: buyNFT };
    }

    if (wallet === owner) {
        if (!nft.approved && !nft.listed) {
            return { text: 'Approve', func: approveNFT };
        }

        if (!nft.listed) {
            return { text: 'List', func: listNft };
        }

        if (!nft.listed && nft.approved) {
            return { text: 'Cancel listing', func: cancelListing };
        }

        if (nft.listed && nft.approved) {
            return { text: 'Update', func: updateListing };
        }
    }
    return { text: nft.name, func: buyNFT };
}

export default getFunction;
