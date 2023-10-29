import './App.css';
import MintForm from './components/MintForm/MintForm';
import NFTCard from './components/NFTCard/NFTCard';

function App() {
    return (
        <main className="mx-auto w-full max-w-[2560px] px-4 sm:px-8 xxl:px-16">
            <MintForm />
            {/* <NFTCard /> */}
        </main>
    );
}

export default App;
