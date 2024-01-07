import { getAllMintedNFTs } from "../../../utils/ethers/ethers"
import { useSelector } from "react-redux"
import Collection from "../Collection"

const Collections = () => {
    getAllMintedNFTs()

    const collections = useSelector((state) => state.nfts.mintedNFTs)

    return (
        <div>
            {Object.entries(collections).map(([collectionName, nftsData]) => (
                <Collection key={collectionName} collectionName={collectionName} nftsData={nftsData}/>
            ))}
        </div>
    )
}

export default Collections;