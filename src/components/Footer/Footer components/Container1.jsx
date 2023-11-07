const Container1 = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start px-4 pb-9 lg:px-20">
            <form className="w-full lg:w-1/2">
                <h2 className="text-2xl font-bold">Stay in the loop</h2>
                <p className="w-full lg:w-96 pt-4">
                    Join our mailing list to stay in the loop with our newest feature releases, NFT
                    drops, and tips and tricks for navigating in our marketplace.
                </p>
                <div className="flex flex-col lg:flex-row gap-4 pt-4">
                    <input
                        className="w-full lg:w-2/3 h-10 px-4 rounded text-black border border-gray-400"
                        type="text"
                        placeholder="Your email address"
                    />
                    <button className="w-full lg:w-1/3 h-10 bg-blue-500 mt-2 lg:mt-0 rounded hover:bg-lightBlue-400 transform transition duration-300">
                        Sign up
                    </button>
                </div>
            </form>
            <div className="text-center lg:w-1/3 mt-4 lg:mt-0">
                <h2 className="text-2xl font-bold">Join the community</h2>
                <ul className="flex flex-wrap justify-center pt-4 space-x-8 text-4xl">
                    <li className="mt-2 px-2 py-1 rounded hover:bg-lightBlue-400 transform scale-110 transition duration-300">
                        <a href={''}>
                            <i className="fab fa-twitter icon"></i>
                        </a>
                    </li>
                    <li className="mt-2 px-2 py-1 rounded hover:bg-lightBlue-400 transform scale-110 transition duration-300">
                        <a href={''}>
                            <i className="fab fa-instagram icon"></i>
                        </a>
                    </li>
                    <li className="mt-2 px-2 py-1 rounded hover:bg-lightBlue-400 transform scale-110 transition duration-300">
                        <a href={''}>
                            <i className="fab fa-discord icon"></i>
                        </a>
                    </li>
                    <li className="mt-2 px-2 py-1 rounded hover:bg-lightBlue-400 transform scale-110 transition duration-300">
                        <a href={''}>
                            <i className="fab fa-reddit icon"></i>
                        </a>
                    </li>
                    <li className="mt-2 px-2 py-1 rounded hover:bg-lightBlue-400 transform scale-110 transition duration-300">
                        <a href={''}>
                            <i className="fab fa-youtube icon"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Container1;
