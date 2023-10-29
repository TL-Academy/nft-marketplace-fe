import React, { useState } from 'react';
import nftImg from '../../../public/nftImage.jpg';

const NFTCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex mt-24">
            <div className="w-1/5 h-full">
                <p>aside</p>
            </div>
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
                                src={nftImg}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="px-3 pt-3">
                        <p className="mb-2 font-bold">1234</p>
                        <p className="font-bold pb-0">29.09 ETH</p>
                    </div>
                    <p className={`${isHovered ? 'hidden' : 'px-3 pb-3 pt-0'} text-slate-600`}>
                        Last sale: 23.01 ETH
                    </p>
                    {isHovered && (
                        <div className="p-0 pt-1">
                            <button className="w-3/4 py-2 text-slate-200 bg-blue-700 border-r-2">
                                Buy now
                            </button>

                            <button className="w-1/4 py-2 bg-blue-700">
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
