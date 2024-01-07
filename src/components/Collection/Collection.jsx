import NFTCard from '../NFTCard/NFTCard';
import classes from './Collection.module.css';
import { useSelector } from 'react-redux';
import { getAllMintedNFTs } from '../../utils/ethers/ethers';

const Collection = () => {
    getAllMintedNFTs()
    const mintedNFTs = useSelector((state) => state.nfts.mintedNFTs)
    return (
        <div className="flex flex-col h-full bg-white dark:bg-d-primary transition-all duration-300">
            <div className="h-[340px] flex flex-col justify-end">
                <div className={`flex items-end sm:mb-6`}>
                    <div className={`flex flex-col`}>
                        <div className="flex mb-4 ">
                            <img
                                className="h-28 w-28"
                                src="https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=256"
                            />
                        </div>
                        <div className="flex items-start">
                            <h1 className="font-semibold text-2xl dark:text-white">
                                Some Text Heading
                            </h1>
                        </div>
                    </div>
                    <div
                        className={`ml-auto justify-end space-x-8 sm:text-lg ${classes.responsiveDesktop}`}
                    >
                        <div className="flex flex-col">
                            <span className="font-bold text-base dark:text-white">---- ETH</span>
                            <span className="text-slate-600 text-base font-semibold dark:text-white">
                                Total volume
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base dark:text-white">---- ETH</span>
                            <span className="text-slate-600 text-base font-semibold dark:text-white">
                                Floor price
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base dark:text-white">---- WETH</span>
                            <span className="text-slate-600 text-base font-semibold dark:text-white">
                                Best offer
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base dark:text-white">-%</span>
                            <span className="text-slate-600 text-base font-semibold dark:text-white">
                                Listed
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base dark:text-white">----</span>
                            <span className="text-slate-600 text-base font-semibold dark:text-white">
                                Owners
                            </span>
                        </div>
                    </div>
                    <hr className="mt-3" />
                </div>
            </div>
            <div className="mb-2 mt-3">
                <div className="flex justify-between items-start flex-col">
                    <div className="flex relative flex-col">
                        <p className="font-semibold dark:text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum harum
                            neque vitae doloribus aperiam expedita quidem assumenda quos, saepe
                            dolorum sapiente mollitia voluptatum provident! Facere, ab. Repellat
                            explicabo doloribus quod.
                        </p>
                    </div>
                </div>
            </div>
            <hr className="mt-1 mb-4" />
            <div className="flex flex-wrap -mx-4">
            {Object.values(mintedNFTs).map((nft, index) => (
    <NFTCard
        key={index}
        cardImg={nft.image} 
        cardName={nft.name}  
        cardPrice={nft.cardPrice}  
        lastSoldPrice={nft.lastSoldPrice} 
    />
))}
            </div>
        </div>
    );
};

export default Collection;
