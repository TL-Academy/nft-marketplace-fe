import './App.css';
import MintForm from './components/MintForm/MintForm';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom'
function App() {
    return (
        <>
            <NavBar />
            <main className='mx-auto w-full max-w-[2560px] px-4 sm:px-8 xxl:px-16'>
                <Routes>
                    <Route path='/create' element={<MintForm />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
