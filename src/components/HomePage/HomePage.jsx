import useNFTData from '../../hooks/useNFTData';
import Collection from '../Collection/Collection';

const HomePage = () => {
    const { nfts } = useNFTData();

    const filteredNFTs = Object.fromEntries(
        Object.entries(nfts).map(([collectionName, nftsData]) => [
            collectionName,
            nftsData.filter((mintedNFT) => mintedNFT.listed),
        ]),
    );

    return (
        <div>
            {Object.entries(filteredNFTs).map(([collectionName, nftsData]) => (
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
