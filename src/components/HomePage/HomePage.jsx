import useNFTData from '../../hooks/useNFTData';
import Collection from '../Collection/Collection';

const HomePage = () => {
    const { filtered } = useNFTData();

    return (
        <div>
            {Object.entries(filtered).map(([collectionName, nftsData]) => (
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
