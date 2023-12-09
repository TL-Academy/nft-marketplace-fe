import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectTheme } from './themeSlice';

const DarkMode = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const htmlElementRef = useRef(document.documentElement);

    useEffect(() => {
        if (theme === 'dark') {
            htmlElementRef.current.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElementRef.current.classList.remove('dark');
            localStorage.removeItem('theme');
        }
    }, [theme]);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            htmlElementRef.current.classList.add('dark');
        }
    }, [theme]);

    const toggleThemeSwitch = () => {
        dispatch(toggleTheme());
    };

    return (
        <button
            onClick={toggleThemeSwitch}
            className="bg-white px-4 py-2 flex items-center justify-center dark:bg-d-secondary rounded-lg"
        >
            <span class={`material-symbols-outlined ${theme === 'dark' ? 'text-white' : ''}`}>
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
};

export default DarkMode;
