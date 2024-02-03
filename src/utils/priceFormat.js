import { ethers } from 'ethers';

const priceFormat = (price) => {
    return ethers.utils.formatEther(price);
};

export default priceFormat;
