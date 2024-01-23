import { useState } from 'react';
import { selectAddress } from '../../redux/walletReducer';
import { useSelector } from 'react-redux';
import { useWallets } from "@web3-onboard/react"
import { ethers } from 'ethers';
import addresses from '../../contracts/addresses.json';

import priceFormat from '../../utils/priceFormat';
import Modal from '../Modal/Modal';
import PriceForm from '../NFTPriceForm/PriceForm';

const NFTCard = ({
    cardImg,
    cardName,
    cardPrice,
    lastSoldPrice, owner, contractAddress, cardId,
    btnText,
    onClickHandler,
    tokenId,
    // address,
    listed,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [approveButtonText, setApproveButtonText] = useState("Approve")

    const address = useSelector(selectAddress);
    const connectedWallets = useWallets();
    const marketplaceAddress = addresses['11155111']['Marketplace']['address']
    const [showModal, setShowModal] = useState(false);

    const priceFormat = (price) => {
        const formatted = Number(price).toFixed(2);
        return `${formatted} ETH`;
    };

    const toggleModal = () => {
        setShowModal(!showModal);
        setIsHovered(false);
    };

    function buyButton() {
        return (
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
        )
    }

    function approveButton() {
        return (
            <div className="p-0 pt-1 w-full">
                <button
                    className="w-full py-1 font-bold text-slate-200 bg-blue-700 border-r-2"
                    onClick={async () => {
                        const injectedProvider = connectedWallets[0].provider;
                        const provider = new ethers.providers.Web3Provider(injectedProvider);
                        const signer = provider.getSigner();
                        const abi = await fetch(`https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`,)
                            .then((res) => res.json())
                            .then((res) => res.result)
                            .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));
                        const contract = new ethers.Contract(contractAddress, abi, signer);
                        try {
                            const approved = await contract.getApproved(i);
                            if (approved === marketplaceAddress) {
                                setApproveButtonText("Approved")
                            } else {
                                await contract.approve(marketplaceAddress, cardId)
                                    .then(setApproveButtonText("Approved"))
                                    .catch(e => console.log(e))
                            }
                        } catch (error) {
                            console.error("Error approving", error);
                        }
                    }
                    }
                >
                    {approveButtonText}
                </button>
            </div>
        )
    }

    function cardButton(){
        return  (
            <div className="p-0 pt-1">
                <button
                    onClick={() => {
                        !listed ? toggleModal() : null;
                    }}
                    className={`${
                        listed ? 'w-3/4' : 'w-full'
                    } py-1 font-bold text-slate-200 bg-blue-700 ${
                        listed ? 'border-r-2' : ''
                    }`}
                >
                    {listed ? 'Buy' : listed === false ? 'List' : 'Approve'} NFT
                </button>
                {listed && (
                    <button className="w-1/4 py-1 bg-blue-700">
                        <i
                            className="fa-solid fa-cart-shopping"
                            style={{ color: '#f5f5f5' }}
                        ></i>
                    </button>
                )}
            </div>
        )
    }

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
                            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110' : ''
                                }`}
                            src={`https://ipfs.io/ipfs/${cardImg}`}
                            alt={`NFT card - ${cardName}`}
                        />
                    </div>
                </div>
                <div className="px-3 pt-3">
                    <p className="mb-2 font-bold dark:text-white">{cardName}</p>
                    <p className="font-bold pb-0 dark:text-white">{priceFormat(cardPrice)}</p>
                </div>
                <p
                    className={`${isHovered ? 'hidden' : 'px-3 pb-3 pt-0'
                        } text-slate-600 dark:text-slate-400`}
                >
                    Last sale: {priceFormat(lastSoldPrice)}
                </p>
                {isHovered && cardButton()}

                {showModal && btnText === 'List' && (
                    <Modal onClose={toggleModal}>
                        <PriceForm
                            onSubmit={onClickHandler}
                            tokenId={tokenId}
                            address={address}
                            onClose={toggleModal}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default NFTCard;
