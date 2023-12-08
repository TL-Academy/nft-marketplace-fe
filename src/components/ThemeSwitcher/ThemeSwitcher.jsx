import { useState, useEffect, useRef } from 'react';

const DarkMode = () => {
    const htmlElementRef = useRef(document.documentElement);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            htmlElementRef.current.classList.add('dark');
        } else {
            htmlElementRef.current.classList.remove('dark');
        }
    }, [theme]);

    const toggleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
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
