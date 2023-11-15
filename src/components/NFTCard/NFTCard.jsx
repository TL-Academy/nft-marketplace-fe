import { useState } from 'react';

const NFTCard = ({ cardImg, cardName, cardPrice, lastSoldPrice }) => {
    const [isHovered, setIsHovered] = useState(false);

    const priceFormat = (price) => {
        const formatted = Number(price).toFixed(2);
        return `${formatted} ETH`;
    };

    return (
        <div className="flex mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-3/4">
                <div
                    className="shadow-xl rounded-lg overflow-hidden cursor-pointer "
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative">
                        <div className="h-64 overflow-hidden rounded-lg">
                            <img
                                className={`w-full h-full object-cover transition-all duration-500 ${
                                    isHovered ? 'scale-110' : ''
                                }`}
                                src={cardImg}
                                alt={`NFT card - ${cardName}`}
                            />
                        </div>
                    </div>
                    <div className="px-3 pt-3">
                        <p className="mb-2 font-bold">{cardName}</p>
                        <p className="font-bold pb-0">{priceFormat(cardPrice)}</p>
                    </div>
                    <p className={`${isHovered ? 'hidden' : 'px-3 pb-3 pt-0'} text-slate-600`}>
                        Last sale: {priceFormat(lastSoldPrice)}
                    </p>
                    {isHovered && (
                        <div className="p-0 pt-1">
                            <button className="w-3/4 py-1 text-slate-200 bg-blue-700 border-r-2">
                                Buy now
                            </button>

                            <button className="w-1/4 py-1 bg-blue-700">
                                <i
                                    className="fa-solid fa-cart-shopping"
                                    style={{ color: '#f5f5f5' }}
                                ></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
