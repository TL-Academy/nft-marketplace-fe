import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectListedNFTs } from '../redux/getListedNFTS';
import { getMintedNFTs, getListed, filterListedNFTs } from '../redux/collectionSlice';
import { getListedNFTs, getAllMintedNFTs } from '../utils/ethers/ethers';

const useNFTData = () => {
    const dispatch = useDispatch();
    const nfts = useSelector(getMintedNFTs);
    const listedNFTs = useSelector(selectListedNFTs);
    const filtered = useSelector(getListed);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllMintedNFTs());
            await dispatch(getListedNFTs());
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (nfts !== undefined) {
            dispatch(filterListedNFTs({ nfts, listedNFTs }));
        }
    }, [nfts, listedNFTs, dispatch]);

    return { nfts, listedNFTs, filtered };
};

export default useNFTData;
