import './App.css';
import MintForm from './components/MintForm/MintForm';
import NavBar from './components/NavBar/NavBar';
import ConnectMetamask from './components/ConnectMetamask';
import NFTCard from './components/NFTCard/NFTCard';
import { Route, Routes } from 'react-router-dom'

// 
import ConnectMetamask from './components/ConnectMetamask';
import NFTCard from './components/NFTCard/NFTCard';

function App() {
    return (
        <>
            <NavBar />
            <main className='mx-auto w-full max-w-[2560px] px-4 sm:px-8 xxl:px-16'>
                <Routes>
                    <Route path='/create' element={<MintForm />} />
                    <Route path='/login' element={<ConnectMetamask />} />
                    <Route path='/card-info' element={<NFTCard />} />
                </Routes>
            </main>
        </>
    );
}
