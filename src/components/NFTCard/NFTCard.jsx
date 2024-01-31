import { useState } from 'react';

import Modal from '../Modal/Modal';
import PriceForm from '../NFTPriceForm/PriceForm';

const NFTCard = ({
    cardImg,
    cardName,
    lastSoldPrice,
    onClickHandler,
    tokenId,
    address,
    listed,
    price,
    btnText,
    approved,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
        setIsHovered(false);
    };

    const button = {
        List: onClickHandler,
        Approve: () => onClickHandler(address, tokenId),
        Cancel: () => onClickHandler(address, tokenId),
    };

    const handleClick = () => {
        if (approved && !listed) {
            toggleModal();
            return;
        }
        const func = button[btnText];
        func();
    };

    function cardButton() {
        return (
            <>
                <button
                    onClick={handleClick}
                    className={`${
                        listed ? 'w-3/4' : 'w-full'
                    } py-1 font-bold text-slate-200 bg-blue-700 ${listed ? 'border-r-2' : ''}`}
                >
                    {btnText} NFT
                </button>
                {listed && (
                    <button className="w-1/4 py-1 bg-blue-700">
                        <i className="fa-solid fa-cart-shopping" style={{ color: '#f5f5f5' }}></i>
                    </button>
                )}
            </>
        );
    }

    function listModal() {
        return (
            <Modal onClose={toggleModal}>
                <PriceForm
                    onSubmit={button.List}
                    tokenId={tokenId}
                    address={address}
                    onClose={toggleModal}
                />
            </Modal>
        );
    }

    function cardData() {
        return (
            <>
                <div className="relative">
                    <div className="sm:h-64 h-44 overflow-hidden rounded-lg">
                        <img
                            className={`w-full h-full object-cover transition-all duration-500 ${
                                isHovered ? 'scale-110' : ''
                            }`}
                            src={`https://ipfs.io/ipfs/${cardImg}`}
                            alt={`NFT card - ${cardName}`}
                        />
                    </div>
                </div>
                <div className="px-3 pt-3">
                    <p className="mb-2 font-bold dark:text-white">{cardName}</p>
                    <p className="font-bold pb-0 dark:text-white">
                        {price ? `${price} ETH` : 'Not listed'}
                    </p>
                </div>
                <p
                    className={`${
                        isHovered ? 'hidden' : 'px-3 pb-3 pt-0'
                    } text-slate-600 dark:text-slate-400`}
                >
                    Last sale: {lastSoldPrice ? lastSoldPrice : 'Not sold yet'}
                </p>
            </>
        );
    }

    return (
        <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2 mb-4">
            <div
                className="shadow-xl rounded-lg overflow-hidden cursor-pointer dark:bg-d-secondary"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {cardData()}

                {isHovered && cardButton()}

                {showModal && btnText === 'List' && listModal()}
            </div>
        </div>
    );
};

export default NFTCard;
