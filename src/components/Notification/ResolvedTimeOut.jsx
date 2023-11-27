import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeResolved } from '../../app/notification'; 

export default function ResolvedTimeOut({ signature, message }) {

    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(removeResolved(signature));
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <p className='text-green-500 break-words w-full animate-pulse text-center'>Resolved: {message}</p>
    )
}