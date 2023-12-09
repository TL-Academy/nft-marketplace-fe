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
        } else {
            htmlElementRef.current.classList.remove('dark');
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
            <span className={`material-symbols-outlined ${theme === 'dark' ? 'text-white' : ''}`}>
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
};

export default DarkMode;
