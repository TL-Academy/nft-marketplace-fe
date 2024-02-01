import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectListedNFTs } from '../redux/getListedNFTS';
import { getMintedNFTs, filterListedNFTs, setApprovedState } from '../redux/collectionSlice';
import {
    getListedNFTs,
    getAllMintedNFTs,
    getApprovedNFTs,
    getCanceledNFTs,
} from '../utils/ethers/ethers';
import { selectApprovedNFTs } from '../redux/getApprovedNFTs';
import { selectAddress } from '../redux/walletReducer';
import { setUserNfts, profileCollections } from '../redux/profileNfts';
import {
    itemApprovedListener,
    itemListedListener,
    itemMintedListener,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    ItemBoughtListener
=======
    itemListedCancelListener,
>>>>>>> Stashed changes
=======
    itemListedCancelListener,
>>>>>>> Stashed changes
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
            try {
                await dispatch(getAllMintedNFTs());
                await dispatch(getListedNFTs());
                await dispatch(getApprovedNFTs());
                await dispatch(getCanceledNFTs());
                await dispatch(itemApprovedListener());
                await dispatch(itemListedListener());
                await dispatch(itemMintedListener());
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                await dispatch(ItemBoughtListener());
=======
                // await dispatch(itemListedCancelListener());
>>>>>>> Stashed changes
=======
                // await dispatch(itemListedCancelListener());
>>>>>>> Stashed changes
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (nfts !== undefined && listedNFTs) {
            dispatch(filterListedNFTs({ listedNFTs }));
        }
    }, [nfts, listedNFTs]);

    useEffect(() => {
        if (approvedNFTs) {
            dispatch(setApprovedState({ approvedNFTs }));
        }
    }, [approvedNFTs]);

    useEffect(() => {
        if (nfts) {
            dispatch(setUserNfts({ nfts, user: walletAddress }));
        }
    }, [nfts, walletAddress]);

    return { nfts, listedNFTs, approvedNFTs, userNFTs };
};

export default useNFTData;
