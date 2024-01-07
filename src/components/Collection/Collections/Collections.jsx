import { getAllMintedNFTs } from "../../../utils/ethers/ethers"
import { useSelector } from "react-redux"
import Collection from "../Collection"

const Collections = () => {
    getAllMintedNFTs()

    const collections = useSelector((state) => state.nfts.mintedNFTs)
    const nftsByCollection = {};
    
//     mintedNFTs.forEach((nft) => {
//     const { collectionName, ...nftData } = nft;

//     if (!nftsByCollection[collectionName]) {
//         nftsByCollection[collectionName] = [nftData];
//     } else {
//         nftsByCollection[collectionName].push(nftData);
//     }
// });

// // Now nftsByCollection contains your data organized by collectionName
// console.log(nftsByCollection);
    return (
        <div>
            {Object.entries(collections).map(([collectionName, nftsData]) => (
                <Collection key={collectionName} collectionName={collectionName} nftsData={nftsData}/>
            ))}
        </div>
    )
}

export default Collections;