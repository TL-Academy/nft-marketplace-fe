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
    lastSoldPrice, owner, cardId,
    // btnText,
    onClickHandler,
    tokenId,
    address,
    listed,
    price
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [approveButtonText, setApproveButtonText] = useState("Approve")
    const [btnText, setBtnText] = useState("List")

    const walletAddress = useSelector(selectAddress);
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

    async function getContract(_address) {
        const injectedProvider = connectedWallets[0].provider;
        const provider = new ethers.providers.Web3Provider(injectedProvider);
        const signer = provider.getSigner();
        const abi = await fetch(`https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${_address}`)
            .then((res) => res.json())
            .then((res) => res.result)
            .catch((e) => console.error('Error getting the ABI from Etherscan: ', e));
        return new ethers.Contract(_address, abi, signer);
    }


    // if walletAddress != owner and is listed => btn text (& onClick) = 'buy nft'
    // price should be parsed, currently throws "invalid BigNumber value"
    async function buyNFT() {
        const contract = await getContract('0x5326a710Bd17DF352bb8e806d855A5cA6b75D61D'); // don't hardcode 
        try {
            // show notification that tx is happening
            await contract.buyItem(address, cardId, { value: price, gasLimit: 3000000 });
            // show notification that tx succesfull
        } catch (error) {
            // show notification that tx failed
            console.error("Error buying", error);
        }
    }

    // if walletAddress == owner and is listed => btn text (& onClick)  = 'cancel listing / uldate listing'
    async function cancelListing() {
        const contract = await getContract('0x5326a710Bd17DF352bb8e806d855A5cA6b75D61D'); // don't hardcode
        try {
            // tx notification happening
            contract.cancelListing(address, cardId,)
            // tx notification success
        } catch (error) {
            // tx notification error
            console.error("Error delisting", error);
        }
    }
    
    // if walletAddress == owner and is listed => btn text (& onClick)  = 'cancel listing / uldate listing'
    async function updateListing(){
        const contract = await getContract('0x5326a710Bd17DF352bb8e806d855A5cA6b75D61D'); // don't hardcode
        try {
            // tx notification happening
            const newPrice = "???" // should be correct price
            contract.updateListing(address, cardId, newPrice)
            // tx notification success
        } catch (error) {
            // tx notification error
            console.error("Error delisting", error);
        }
    }

    // if walletAddress == owner and is approved => btn text (& onClick)  = 'list NFT'
    async function listNFT() {
        const contract = await getContract('0x5326a710Bd17DF352bb8e806d855A5cA6b75D61D'); // don't hardcode
        try {
            // tx notification happening
            contract.listItem(address, cardId,)
            // tx notification success
        } catch (error) {
            // tx notification error
            console.error("Error buying", error);
        }
    }

    // if walledAddress == owner and is not approved => btn text (& onClick)  = 'approve NFT'
    async function approveNFT() {
        const contract = await getContract(address);
        try {
            const approved = await contract.getApproved(cardId); // better to check the events for whether it is aproved?
            if (approved === marketplaceAddress) {
            } else {
                // approving notification
                await contract.approve(marketplaceAddress, cardId)
                    .then(
                    // approve succesfull notification
                    // btn text & onClick: approve -> list;
                )
                    // approve error notification
                    .catch(e => console.log(e))
            }
        } catch (error) {
            // cant get approved
            console.error("Error approving", error);
        }
    }

    // should be one button, text and onClick change depending on condition
    function buyButton() {
        return (
            <div className="p-0 pt-1">
                <button
                    className="w-3/4 py-1 font-bold text-slate-200 bg-blue-700 border-r-2"
                    onClick={buyNFT}
                >
                    Buy now
                </button>

                <button
                    className="w-1/4 py-1 bg-blue-700"
                    onClick={buyNFT}
                >
                    <i
                        className="fa-solid fa-cart-shopping"
                        style={{ color: '#f5f5f5' }}
                    ></i>
                </button>
            </div>
        )
    }

    function chavdarButton() {
        return (
            <>
                <button
                    onClick={() => {
                        !listed ? toggleModal() : null;
                    }}
                    className={`${listed ? 'w-3/4' : 'w-full'
                        } py-1 font-bold text-slate-200 bg-blue-700 ${listed ? 'border-r-2' : ''
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
            </>
        )
    }

    function listModal() {
        return (
            <Modal onClose={toggleModal}>
                <PriceForm
                    onSubmit={onClickHandler}
                    tokenId={tokenId}
                    address={address}
                    onClose={toggleModal}
                />
            </Modal>
        )
    }

    function cardData() {
        return (
            <>
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
            </>
        )
    }

    
    function cardButton() {
        return (
            <div className="p-0 pt-1">
                {/* {approveButton()} */}
                {buyButton()}
                {/* {chavdarButton()} */}
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
                {cardData()}

                {isHovered && cardButton()}

                {showModal && btnText === 'List' && listModal()}
            </div>
        </div>
    );
};

export default NFTCard;
