const getAbi = async (contractAddr) => {
    return await fetch(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddr}`,
    )
        .then((res) => res.json())
        .then((res) => {
            return JSON.parse(res.result);
        })
        .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));
};
export default getAbi;
