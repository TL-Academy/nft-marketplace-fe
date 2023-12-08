/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // ...colors,
                'd-primary': '#211f1f',
                'd-secondary': '#27272a', // zinc-800
                blooey: '#2563eb', // blue-600
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
