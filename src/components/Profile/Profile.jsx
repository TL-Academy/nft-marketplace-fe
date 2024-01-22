import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserNfts } from '../../utils/ethers/ethers';
import Collection from '../Collection/Collection';
import { profileCollections } from '../../redux/profileNfts';
import { userWalletAddress } from '../../redux/walletReducer';

const Profile = () => {
    const dispatch = useDispatch();
    const userId = useSelector(userWalletAddress);
    const userCollections = useSelector(profileCollections);

    useEffect(() => {
        if (userId) {
            dispatch(getUserNfts(userId));
        }
    }, [dispatch, userId]);

    return (
        <div>
            {Object.entries(userCollections).map(([collectionName, nftsData]) => (
                <Collection
                    key={collectionName}
                    collectionName={collectionName}
                    nftsData={nftsData}
                />
            ))}
        </div>
    );
};

export default Profile;
