import NFTCard from '../NFTCard/NFTCard';
import classes from './Collection.module.css';
import { useSelector } from 'react-redux';
import { getAllMintedNFTs } from './ethers/ethers';

const Collection = () => {
    getAllMintedNFTs()
    const mintedNFTs = useSelector((state) => state.nfts.mintedNFTs)
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="h-[340px] flex flex-col justify-end">
                <div className={`flex items-end sm:mb-6`}>
                    <div className={`flex flex-col`}>
                        <div className="flex mb-4">
                            <img
                                className="h-28 w-28"
                                src="https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=256"
                            />
                        </div>
                        <div className="flex items-start">
                            <h1 className={`font-semibold text-2xl`}>Some Text Heading</h1>
                        </div>
                    </div>
                    <div
                        className={`ml-auto justify-end space-x-8 sm:text-lg ${classes.responsiveDesktop}`}
                    >
                        <div className="flex flex-col">
                            <span className="font-bold text-base">---- ETH</span>
                            <span className="text-slate-600 text-base font-semibold">Total volume</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base">---- ETH</span>
                            <span className="text-slate-600 text-base font-semibold">Floor price</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base">---- WETH</span>
                            <span className="text-slate-600 text-base font-semibold">Best offer</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base">-%</span>
                            <span className="text-slate-600 text-base font-semibold">Listed</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base">----</span>
                            <span className="text-slate-600 text-base font-semibold">Owners</span>
                        </div>
                    </div>
					<hr className="mt-3"/>
                </div>
				<div className={`flex-col bg-white mt-3 ${classes.responsivePhone}`}>
				<hr className="mt-2 mb-3"/>
                        <div className="flex flex-row text-center justify-center">
                            <div className={`flex items-end mb-2`}>
                                <div className={`flex flex-col mr-5`}>
                                    <span className="font-bold">---- ETH</span>
                                    <span className="text-slate-600 text-sm  font-semibold">Total volume</span>
                                </div>
                                <div className="flex flex-col mr-5">
                                    <span className="font-bold">---- ETH</span>
                                    <span className="text-slate-600 text-sm font-semibold">Floor price</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold">---- WETH</span>
                                    <span className="text-slate-600 text-sm font-semibold">Best offer</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row text-center justify-center">
                            <div className={`flex items-end`}>
                                <div className={`flex flex-col mr-6`}>
                                    <span className="font-bold">-%</span>
                                    <span className="text-slate-600 text-sm font-semibold">Listed</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold">----</span>
                                    <span className="text-slate-600 text-sm font-semibold">Owners</span>
                                </div>
                            </div>
                        </div>
					<hr className="mt-3" />
                    </div>
            </div>
            <div className="mb-2 mt-3">
                <div className="flex justify-between items-start flex-col">
                    <div className="flex relative flex-col">
                        <p className="font-semibold">
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
        cardImg={nft.image}  // Replace 'cardImg' with the actual property name in your data
        cardName={nft.name}  // Replace 'cardName' with the actual property name in your data
        cardPrice={nft.cardPrice}  // Replace 'cardPrice' with the actual property name in your data
        lastSoldPrice={nft.lastSoldPrice}  // Replace 'lastSoldPrice' with the actual property name in your data
    />
))}
            </div>
        </div>
    );
};

export default Collection;
