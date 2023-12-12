import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../ThemeSwitcher/themeSlice';

const useTheme = () => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    const toggleThemeHandler = () => {
        dispatch(toggleTheme());
    };
    return {
        theme,
        toggleTheme: toggleThemeHandler,
        isDark: theme === 'dark',
        isLight: theme === 'light',
    };
};

export default useTheme;
