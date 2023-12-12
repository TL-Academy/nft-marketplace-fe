import useTheme from '../../hooks/useTheme';

const DarkMode = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="bg-white px-4 py-2 flex items-center justify-center dark:bg-d-secondary rounded-lg"
        >
            <span className={`material-symbols-outlined ${theme === 'dark' ? 'text-white' : ''}`}>
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
};

export default DarkMode;
