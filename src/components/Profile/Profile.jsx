import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserNfts } from "../../utils/ethers/ethers";
import Collection from "../Collection/Collection";

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.wallet.walletAddress);

  useEffect(() => {
    if (userId) {
      dispatch(getUserNfts(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      <Collection />
    </div>
  );
};

export default Profile;
