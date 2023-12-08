import './App.css';
import MintForm from './components/MintForm/MintForm';
import NavBar from './components/NavBar/NavBar';
import NFTCard from './components/NFTCard/NFTCard';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import Collection from './components/Collection/Collection.jsx';

function App() {
    return (
        <>
            <NavBar />
            <main className="mx-auto w-full max-w-[2560px] px-4 sm:px-8 xxl:px-16 dark:bg-d-primary">
                <Routes>
                    <Route path="/create" element={<MintForm />} />
                    <Route path="/card-info" element={<NFTCard />} />
                    <Route path="/collections" element={<Collection />} />
                    <Route path="/home" element={<Collection />} />
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default App;
