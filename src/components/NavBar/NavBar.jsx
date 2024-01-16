import { useState } from 'react';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import ConnectMetamask from '../ConnectMetamask';
import DarkMode from '../ThemeSwitcher/ThemeSwitcher';
import handleWalletAddress from '../../utils/getWalletAddress';

const NavBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const { isConnecting, wallet, connectMetamask, disconnectMetamask } = ConnectMetamask();

    return (
        <nav className="bg-blooey transition-all duration-300 w-full top-0 left-0 border-b border-black dark:border-d-secondary dark:bg-d-primary">
            <div className="flex flex-wrap items-center justify-between mx-9 p-4">
                <Link to="/" className="flex items-center mr-5">
                    <span
                        className={`font-semibold text-2xl text-white inline-block ${classes.logoResponsive}`}
                    >
                        NFT Academy
                    </span>
                </Link>
                <div
                    className={`h-[40px] min-h-[1em] mr-5 w-0.5 self-stretch bg-white dark:bg-gray-700 opacity-100 ${classes.line}`}
                ></div>
                <div
                    className={`w-full md:w-auto md:order-0 ${classes.navbarlinks} ${
                        isMenuOpen ? 'flex' : ''
                    }`}
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:z-auto">
                        <li>
                            <Link
                                to="/home"
                                className="block py-2 pl-3 pr-4 font-bold text-white rounded md:hover:bg-transparent md:hover:text-gray-400 md:p-0"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/collections"
                                className="block py-2 pl-3 pr-4 font-bold text-white rounded md:hover:bg-transparent md:hover:text-gray-400 md:p-0"
                            >
                                Collections
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/create"
                                className="block py-2 pl-3 pr-4 font-bold text-white rounded md:hover:bg-transparent md:hover:text-gray-400 md:p-0"
                            >
                                Mint
                            </Link>
                            {isMenuOpen ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (wallet) {
                                            disconnectMetamask(wallet);
                                        } else {
                                            connectMetamask();
                                        }
                                    }}
                                    className={`text-white bg-zinc-800 font-medium rounded-lg text-sm px-4 py-2 text-center ${classes.loginResponsive}`}
                                >
                                    {isConnecting
                                        ? 'Connecting...'
                                        : wallet
                                          ? `${handleWalletAddress(wallet)}`
                                          : 'Login'}
                                </button>
                            ) : (
                                ''
                            )}
                        </li>
                    </ul>
                </div>
                <div className="ml-auto flex items-center space-x-3">
                    <a
                        href="#"
                        className={`${classes.toggleButton}`}
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    >
                        <img src="./public/hamburger-menu.png" />
                    </a>
                    {!isMenuOpen ? (
                        <button
                            type="button"
                            onClick={() => {
                                if (wallet) {
                                    disconnectMetamask(wallet);
                                } else {
                                    connectMetamask();
                                }
                            }}
                            className={`text-black bg-white dark:text-white dark:bg-d-secondary font-medium rounded-lg text-sm px-4 py-[10px] text-center ${classes.loginResponsive}`}
                        >
                            {isConnecting
                                ? '...'
                                : wallet
                                  ? `${handleWalletAddress(wallet)}`
                                  : 'Login'}
                        </button>
                    ) : (
                        ''
                    )}
                    <Link
                        to="/profile"
                        className={`text-black bg-white dark:text-white dark:bg-d-secondary font-medium rounded-lg text-sm px-4 py-2 text-center ${classes.profileButton}`}
                    >
                        <span className="material-symbols-outlined">account_circle</span>
                    </Link>
                    <DarkMode />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
