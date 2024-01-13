import { getAllMintedNFTs } from "../../../utils/ethers/ethers"
import { useSelector } from "react-redux"
import { store } from "../../../redux/store"
import Collection from "../Collection"
import { useEffect } from "react"

const Collections = () => {
    useEffect(() => {
        store.dispatch(getAllMintedNFTs());
    },[])
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