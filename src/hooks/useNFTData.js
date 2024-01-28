import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectListedNFTs } from '../redux/getListedNFTS';
import { getMintedNFTs, filterListedNFTs, setApprovedState } from '../redux/collectionSlice';
import { getListedNFTs, getAllMintedNFTs, getApprovedNFTs } from '../utils/ethers/ethers';
import { selectApprovedNFTs } from '../redux/getApprovedNFTs';
import { selectAddress } from '../redux/walletReducer';
import { setUserNfts, profileCollections } from '../redux/profileNfts';
import {
    itemApprovedListener,
    itemListedListener,
    itemMintedListener,
} from '../services/eventListeners/listener';

const useNFTData = () => {
    const dispatch = useDispatch();
    const nfts = useSelector(getMintedNFTs);
    const listedNFTs = useSelector(selectListedNFTs);
    const approvedNFTs = useSelector(selectApprovedNFTs);
    const userNFTs = useSelector(profileCollections);

    const walletAddress = useSelector(selectAddress);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllMintedNFTs());
            await dispatch(getListedNFTs());
            await dispatch(getApprovedNFTs());
            await dispatch(itemApprovedListener());
            await dispatch(itemListedListener());
            await dispatch(itemMintedListener(walletAddress));
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

    useEffect(() => {
        if (nfts) {
            dispatch(setUserNfts({ nfts, user: walletAddress }));
        }
    }, [nfts, walletAddress, dispatch]);

    return { nfts, listedNFTs, approvedNFTs, userNFTs };
};

export default useNFTData;
