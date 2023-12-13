import { useState } from 'react';

const NFTCard = ({ cardImg, cardName, cardPrice, lastSoldPrice }) => {
    const [isHovered, setIsHovered] = useState(false);

    const priceFormat = (price) => {
        const formatted = Number(price).toFixed(2);
        return `${formatted} ETH`;
    };

    return (
        <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2 mb-4">
            <div
                className="shadow-xl rounded-lg overflow-hidden cursor-pointer dark:bg-d-secondary"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative">
                    <div className="sm:h-64 h-44 overflow-hidden rounded-lg">
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
                    <p className="mb-2 font-bold dark:text-white">{cardName}</p>
                    <p className="font-bold pb-0 dark:text-white">{priceFormat(cardPrice)}</p>
                </div>
                <p
                    className={`${
                        isHovered ? 'hidden' : 'px-3 pb-3 pt-0'
                    } text-slate-600 dark:text-slate-400`}
                >
                    Last sale: {priceFormat(lastSoldPrice)}
                </p>
                {isHovered && (
                    <div className="p-0 pt-1">
                        <button className="w-3/4 py-1 font-bold text-slate-200 bg-blue-700 border-r-2">
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
    );
};

export default NFTCard;
