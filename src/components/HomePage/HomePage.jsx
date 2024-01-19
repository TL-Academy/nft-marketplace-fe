import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Collection from '../Collection/Collection';

import { filterListedNFTs, selectListedNFTs } from '../../redux/getListedNFTS';
import { getMintedNFTs } from '../../redux/collectionSlice';
import { getListedNFTs, getAllMintedNFTs } from '../../utils/ethers/ethers';

const HomePage = () => {
    const dispatch = useDispatch();
    const nfts = useSelector(getMintedNFTs);
    console.log(nfts);

    useEffect(() => {
        dispatch(getAllMintedNFTs());
        dispatch(getListedNFTs());
    }, []);

    useEffect(() => {
        if (nfts !== undefined) {
            dispatch(filterListedNFTs(nfts));
        }
    }, [nfts]);

    const listedNFTs = useSelector(selectListedNFTs);
    console.log(listedNFTs);

    return (
        <div>
            {Object.entries(listedNFTs).map(([collectionName, nftsData]) => (
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
