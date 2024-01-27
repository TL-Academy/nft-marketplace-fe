import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectListedNFTs } from '../redux/getListedNFTS';
import { getMintedNFTs, filterListedNFTs, setApprovedState } from '../redux/collectionSlice';
import { getListedNFTs, getAllMintedNFTs, getApprovedNFTs } from '../utils/ethers/ethers';
import { selectApprovedNFTs } from '../redux/getApprovedNFTs';

const useNFTData = () => {
    const dispatch = useDispatch();
    const nfts = useSelector(getMintedNFTs);
    const listedNFTs = useSelector(selectListedNFTs);
    const approvedNFTs = useSelector(selectApprovedNFTs);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllMintedNFTs());
            await dispatch(getListedNFTs());
            await dispatch(getApprovedNFTs());
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (nfts !== undefined && listedNFTs) {
            dispatch(filterListedNFTs({ listedNFTs }));
        }
    }, [nfts, listedNFTs, dispatch]);

    useEffect(() => {
        if (approvedNFTs) {
            dispatch(setApprovedState({ approvedNFTs }));
        }
    }, [approvedNFTs, dispatch]);

    return { nfts, listedNFTs };
};

export default useNFTData;
