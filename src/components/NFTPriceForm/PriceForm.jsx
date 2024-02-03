import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { addNotification } from '../../redux/notification';

const PriceForm = ({ onSubmit, tokenId, address, onClose }) => {
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (price <= 0 || isNaN(price)) {
            setError('Please enter a valid price greater than 0.');
            return;
        }
        addNotification({
            message: 'Listing in progress',
            status: 'in-progress'
        });

        try {
            onSubmit(tokenId, address, price);
            onClose();
            addNotification({
                message: 'Listing successful',
                status: 'success'
            });
        } catch (error) {
            addNotification({
                message: 'Error in listing',
                status: 'error'
            });
        }
    };

    const onChangeHandler = (e) => {
        setPrice(e.target.value);
        setError(null);
    };

    return (
        <form
            className="flex flex-col justify-center items-center gap-4 py-2"
            onSubmit={handleSubmit}
        >
            <label className="text-2xl font-semibold" htmlFor="price">
                Set NFT Price
            </label>
            {error && <p className="text-red-500 font-bold">{error}</p>}
            <input
                ref={inputRef}
                className="border-2 border-slate-500 rounded-md px-2 py-1 text-2xl [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                value={price}
                onChange={onChangeHandler}
                type="number"
                id="price"
            />
            <button className="bg-blooey text-white py-1 px-16 rounded-md text-2xl font-semibold">
                List
            </button>
        </form>
    );
};

export default PriceForm;
