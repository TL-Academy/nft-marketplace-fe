import { useState } from 'react';

const NavBar = () => {

  return (
    <nav className="bg-black fixed w-full z-20 top-0 left-0 border-b">
      <div className="flex flex-wrap items-center justify-between mx-10 p-4">
        <a href="/" className="flex items-center mr-5">
          <span className="font-semibold text-2xl text-white">
            NFT Academy
          </span>
        </a>
      <div
    className="inline-block h-[40px] min-h-[1em] mr-5 w-0.5 self-stretch bg-gray-700 opacity-100 dark:opacity-50"></div>
        <div className="w-full md:w-auto md:order-0">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
            <li>
              <a
                href="/home"
                className="block py-2 pl-3 pr-4 font-bold text-white rounded md:hover:bg-transparent md:hover:text-gray-400 md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/collections"
                className="block py-2 pl-3 pr-4 font-bold text-white rounded md:hover:bg-transparent md:hover:text-gray-400 md:p-0"
              >
                Collections
              </a>
            </li>
            <li>
              <a
                href="/mint"
                className="block py-2 pl-3 pr-4 font-bold text-white rounded md:hover:bg-transparent md:hover:text-gray-400 md:p-0"
              >
                Mint
              </a>
            </li>
          </ul>
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <a
            type="button"
            href='/login'
            className="text-white bg-zinc-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:hover:bg-zinc-700"
          >
            Login
          </a>
          <a
            href='/login'
            className="text-white bg-zinc-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:hover:bg-zinc-700"
          >
            <img className='max-h-5 max-w-5' src="./public/profile-icon-white-7.jpg" alt="Profile Icon" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
