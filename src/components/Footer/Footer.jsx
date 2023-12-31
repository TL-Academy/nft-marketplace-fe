import Container1 from './components/Container1.jsx';
import Container2 from './components/Container2.jsx';
import Container3 from './components/Container3.jsx';

const Footer = () => {
    return (
        <div className="bg-blooey dark:bg-d-secondary py-8 text-white transition-all duration-300">
            <Container1 />
            <hr className="w-full h-1 bg-blue-300 dark:bg-d-secondary" />
            <Container2 />
            <hr className="w-full h-1 bg-blue-300 dark:bg-d-secondary" />
            <Container3 />
        </div>
    );
};

export default Footer;
