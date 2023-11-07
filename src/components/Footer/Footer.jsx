import Container1 from "./components/Container1.jsx";
import Container2 from "./components/Container2.jsx";
import Container3 from "./components/Container3.jsx";

const Footer = () => {
    return (
        <div className="bg-blue-600 py-8 text-white">
            <Container1 />
            <hr className="w-full h-1 bg-blue-300" />
            <Container2 />
            <hr className="w-full h-1 bg-blue-300" />
            <Container3 />
        </div>
    );
};

export default Footer;