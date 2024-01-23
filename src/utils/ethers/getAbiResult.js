import { ETHERSCAN_API_KEY } from "../../constants/constants";

const getAbiResult = async (contractAddress) => {
    return await fetch(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}}`,
    )
        .then((res) => res.json())
        .then((res) => res.result)
        .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));
}
export default getAbiResult;