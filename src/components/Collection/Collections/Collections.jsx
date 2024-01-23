import { getAllMintedNFTs } from '../../../utils/ethers/ethers';
import { store } from '../../../redux/store';
import Collection from '../Collection';
import { useEffect } from 'react';
import useNFTData from '../../../hooks/useNFTData';

const Collections = () => {
    const { nfts } = useNFTData();

    useEffect(() => {
        store.dispatch(getAllMintedNFTs());
    }, []);

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
