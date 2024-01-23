const priceFormat = (price) => {
    const formatted = Number(price).toFixed(2);
    return `${formatted} ETH`;
};

export default priceFormat;
