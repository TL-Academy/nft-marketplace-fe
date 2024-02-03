import './App.css';
import MintForm from './components/MintForm/MintForm';
import NavBar from './components/NavBar/NavBar';
import NFTCard from './components/NFTCard/NFTCard';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import useTheme from './hooks/useTheme.js';
import Notifications from './components/Notification/Notfications.jsx';
import Profile from './components/Profile/Profile.jsx';
import Collections from './components/Collection/Collections/Collections.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import useNFTData from './hooks/useNFTData.js';

function App() {
    const { isDark } = useTheme();
    useNFTData();

    return (
        <div className={`${isDark ? 'dark' : 'light'}`}>
            <NavBar />
            <main className="mx-auto w-full max-w-[2560px] transition-all duration-300 px-4 sm:px-8 xxl:px-16 dark:bg-d-primary">
                <Notifications />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<MintForm />} />
                    <Route path="/card-info" element={<NFTCard />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
