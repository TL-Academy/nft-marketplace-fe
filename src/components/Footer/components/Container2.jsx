const Container2 = () => {
    return (
        <div className="py-8 px-4 lg:px-20 flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/4 text-center pr-9 pb-4 lg:pb-0">
                <a href={''}>
                    <i className="fas fa-shopping-bag text-4xl icon"></i>
                </a>
                <h2 className="text-xl lg:text-2xl pb-2">NFT Marketplace</h2>
                <p className="max-w-xl">
                    Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy,
                    sell, and discover exclusive digital items.
                </p>
            </div>
            <div className="lg:w-1/4 pb-4 lg:pb-0">
                <h4 className="text-2xl pb-8 font-bold">Marketplace</h4>
                <ul className="flex flex-col gap-4">
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            Art
                        </a>
                    </li>
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            Games
                        </a>
                    </li>
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            Memberships
                        </a>
                    </li>
                </ul>
            </div>
            <div className="lg:w-1/4 pb-4 lg:pb-0">
                <h4 className="text-2xl pb-8 font-bold">My Account</h4>
                <ul className="flex flex-col gap-4">
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            Profile
                        </a>
                    </li>
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            Watchlist
                        </a>
                    </li>
                </ul>
            </div>
            <div className="lg:w-1/4 pb-4 lg:pb-0">
                <h4 className="text-2xl pb-8 font-bold">Resources</h4>
                <ul className="flex flex-col gap-4">
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            Blog
                        </a>
                    </li>
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            Learn
                        </a>
                    </li>
                </ul>
            </div>
            <div className="lg:w-1/4 pb-4 lg:pb-0">
                <h4 className="text-2xl pb-8 font-bold">Learn</h4>
                <ul className="flex flex-col gap-4">
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            What is an NFT?
                        </a>
                    </li>
                    <li>
                        <a
                            href={''}
                            className="hover:font-bold transform hover:scale-110 hover:transition duration-300"
                        >
                            How to buy an NFT?
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Container2;