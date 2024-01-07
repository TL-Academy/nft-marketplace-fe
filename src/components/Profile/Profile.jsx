import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserNfts } from "../../utils/ethers/ethers";
import Collection from "../Collection/Collection";

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.wallet.walletAddress);
  const userCollections = useSelector((state) => state.userNfts.userNfts)
  
  useEffect(() => {
    if (userId) {
      dispatch(getUserNfts(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      {Object.entries(userCollections).map(([collectionName, nftsData]) => (
        <Collection key={collectionName} collectionName={collectionName} nftsData={nftsData}/>
      ))}  
    </div>
  );
};

export default Profile;
