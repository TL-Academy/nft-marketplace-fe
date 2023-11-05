import './App.css';
import MintForm from './components/MintForm/MintForm';

//
import ConnectMetamask from './components/ConnectMetamask';
import NFTCard from './components/NFTCard/NFTCard';
import Footer from './components/Footer/Footer.jsx';

function App() {
    return (
        <div>
            <main className="mx-auto w-full max-w-[2560px] px-4 sm:px-8 xxl:px-16">
                <ConnectMetamask />
                <MintForm />
                <NFTCard />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
