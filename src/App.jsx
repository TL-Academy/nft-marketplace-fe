import './App.css';
import MintForm from './components/MintForm/MintForm';
import NavBar from './components/NavBar/NavBar';
import NFTCard from './components/NFTCard/NFTCard';
import { Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer.jsx";
import Collection from './components/Collection/Collection.jsx'
import { Provider } from 'react-redux';
import configureStore from './components/Collection/redux/store.js'
const store = configureStore();
function App() {
    return (
        <Provider store={store}>
            <NavBar />
            <main className="mx-auto w-full max-w-[2560px] px-4 sm:px-8 xxl:px-16">
                <Routes>
                    <Route path="/create" element={<MintForm />} />
                    <Route path="/card-info" element={<NFTCard />} />
                    <Route path='/collections' element={<Collection />} />
                    <Route path='/home' element={<Collection />} />
                </Routes>
            </main>
            <footer>
                <Footer/>
            </footer>
        </Provider>
    );
}

export default App;
