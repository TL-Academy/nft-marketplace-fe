const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

const getAbiResult = async (contractAddress) => {
    return await fetch(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`,
    )
        .then((res) => res.json())
        .then((res) => res.result)
        .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));
};
export default getAbiResult;
