import Collection from '../Collection/Collection';
import { useSelector } from 'react-redux';
import { profileCollections } from '../../redux/profileNfts';

const Profile = () => {
    const userCollections = useSelector(profileCollections);

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
