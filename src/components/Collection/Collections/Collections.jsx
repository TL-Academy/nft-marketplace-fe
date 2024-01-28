import Collection from '../Collection';
import { useSelector } from 'react-redux';
import { getMintedNFTs } from '../../../redux/collectionSlice';

const Collections = () => {
    const nfts = useSelector(getMintedNFTs);

    return (
        <div>
            {Object.entries(nfts).map(([collectionName, nftsData]) => (
                <Collection
                    key={collectionName}
                    collectionName={collectionName}
                    nftsData={nftsData}
                />
            ))}
        </div>
    );
};

export default Collections;
