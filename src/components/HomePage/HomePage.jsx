import Collection from '../Collection/Collection';
import { useSelector } from 'react-redux';
import { getMintedNFTs } from '../../redux/collectionSlice';

const HomePage = () => {
    const nfts = useSelector(getMintedNFTs);

    const filteredNFTs = Object.fromEntries(
        Object.entries(nfts).map(([collectionName, nftsData]) => [
            collectionName,
            nftsData.filter((mintedNFT) => mintedNFT.listed),
        ]),
    );

    return (
        <div>
            {Object.entries(filteredNFTs).map(([collectionName, nftsData]) => (
                <Collection
                    key={collectionName}
                    collectionName={collectionName}
                    nftsData={nftsData}
                />
            ))}
        </div>
    );
};

export default HomePage;
