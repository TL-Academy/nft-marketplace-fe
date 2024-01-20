import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectListedNFTs } from '../redux/getListedNFTS';
import { getMintedNFTs, filterListedNFTs } from '../redux/collectionSlice';
import { getListedNFTs, getAllMintedNFTs } from '../utils/ethers/ethers';

const useNFTData = () => {
    const dispatch = useDispatch();
    const nfts = useSelector(getMintedNFTs);
    const listedNFTs = useSelector(selectListedNFTs);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllMintedNFTs());
            await dispatch(getListedNFTs());
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (nfts !== undefined) {
            dispatch(filterListedNFTs({ listedNFTs }));
        }
    }, [nfts, listedNFTs, dispatch]);

    return { nfts, listedNFTs };
};

export default useNFTData;
