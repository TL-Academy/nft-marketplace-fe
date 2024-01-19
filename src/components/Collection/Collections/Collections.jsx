import { getAllMintedNFTs } from '../../../utils/ethers/ethers';
import { useSelector } from 'react-redux';
import { store } from '../../../redux/store';
import Collection from '../Collection';
import { useEffect } from 'react';
import { getMintedNFTs } from '../../../redux/collectionSlice';

const Collections = () => {
    useEffect(() => {
        store.dispatch(getAllMintedNFTs());
    }, []);
    const collections = useSelector(getMintedNFTs);

    return (
        <div>
            {Object.entries(collections).map(([collectionName, nftsData]) => (
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
