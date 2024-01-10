import { useState } from 'react';
import classes from './MintForm.module.css';
import pinJsonToIpfs from '../../services/pinJsontoIPFS';
import pinFileToIpfs from '../../services/pinFileToIpfs';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/notification';
import { mint } from '../../utils/mintNFT';
import addresses from '../../contracts/addresses.json';
import isFormValid from '../../validators/mintFormValidators';
import { useSelector } from 'react-redux';
import ConnectMetamask from '../ConnectMetamask';
import sendEmail from '../../services/sendEmail';

const collections = addresses['11155111']['NftCollections'];

const MintForm = () => {
    const initialValues = {
        name: '',
        description: '',
        collection: '',
    };
    const collectionsNames = Object.keys(collections);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialValues);
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const walletAddr = useSelector((state) => state.wallet.walletAddress);
    const { connectMetamask } = ConnectMetamask();

    const handleChange = (e) => {
        setFormData((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setFile(file);
        } else {
            setSelectedImage(null);
        }
        e.target.value = '';
    };

    // TODO: Fix when backend is finished
    // sendEmail()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // This is needed for form validation
        const formFields = [
            { name: 'Name', value: formData.name },
            { name: 'Description', value: formData.description },
            { name: 'Collection', value: formData.collection },
            { name: 'Image', value: file },
        ];
        const validatedFields = isFormValid(formFields);

        if (!window.etherum) {
            dispatch(
                addNotification({
                    message: 'Could not detect installed metamask',
                    status: 'Missing extension',
                }),
            );
            setFormData(initialValues);
            setSelectedImage(null);
            setFile(null);
            return;
        }

        if (!walletAddr) {
            dispatch(
                addNotification({
                    message: 'You are not logged in',
                    status: 'Authentication error',
                }),
            );
            setFormData(initialValues);
            setSelectedImage(null);
            setFile(null);
            try {
                connectMetamask();
            } catch (e) {
                console.error('Could not connect to metamask', e);
            }
            return;
        }

        if (validatedFields.isValid === false) {
            dispatch(
                addNotification({
                    message: `Please fill in ${validatedFields.field}`,
                    status: 'Error',
                }),
            );

            return;
        }

        dispatch(addNotification({ message: 'Minting NFT', status: 'in-progress' }));

        const ipfsHash = await pinFileToIpfs(file);

        if (ipfsHash) {
            const data = await pinJsonToIpfs(formData.name, formData.description, ipfsHash);
            const tokenHash = data['IpfsHash'];
            const contractAddress = collections[formData.collection].address;
            mint(tokenHash, contractAddress);
            dispatch(addNotification({ message: 'Minting NFT', status: 'success' }));
        } else {
            dispatch(addNotification({ message: 'Minting NFT', status: 'error' }));
        }

        // @audit send mail await sendMail()
        // await handleConnectionBetweenBeToFe();

        setFormData(initialValues);
        setSelectedImage(null);
        setFile(null);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsHovered(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setIsHovered(true);
    };

    const handleDragLeave = () => {
        setIsHovered(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovered(false);

        const file = e.dataTransfer.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setFile(file);
        }
    };

    const imgBorder = selectedImage ? '' : 'border border-dashed hover:border-solid';

    return (
        <div className={`${classes.responsive1}  m-auto w-full py-10 h-full`}>
            <div className={` ${classes.headingDiv} w-full gap-36 justify-center`}>
                <div className="flex flex-col h-full w-full gap-2 md:max-w-[600px] ">
                    <span className="font-semibold text-3xl dark:text-white">Create an NFT</span>
                    <span className="text-base dark:text-white">
                        Once your item is minted you will not be able to change any of its
                        information.
                    </span>
                </div>
                <div
                    className={`${classes.hideDiv} flex flex-col h-full w-full gap-2 md:max-w-[600px]`}
                ></div>
            </div>
            <form
                onSubmit={handleSubmit}
                className={`${classes.responsive1} w-full h-full md:flex gap-36 justify-center relative pt-8`}
            >
                {/* left side form - drag and drop file upload */}
                <div className="w-full h-full md:max-w-[600px]">
                    <div
                        className={`relative ${imgBorder} border-slate-500 dark:hover:bg-zinc-800 rounded-lg flex flex-col items-center justify-center cursor-pointer aspect-square `}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {selectedImage && isHovered && <div className={classes.overlay}></div>}
                        {selectedImage && isHovered && (
                            <div className={classes.overlayAbove}>
                                <i
                                    className="fa-solid fa-trash fa-xl text-white z-100 absolute top-7 right-4 cursor-pointer"
                                    onClick={() => {
                                        setSelectedImage(null);
                                    }}
                                ></i>
                            </div>
                        )}
                        <input
                            type="file"
                            id="media"
                            className="hidden "
                            onChange={handleImageChange}
                        />

                        <label
                            htmlFor="media"
                            className="absolute inset-0 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all duration-300"
                        >
                            {selectedImage ? (
                                <div className="w-full h-full">
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 text-gray-400 dark:text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4v16m8-8H4"
                                        ></path>
                                    </svg>
                                    <span className="text-gray-600 dark:text-white">
                                        Drag and drop media
                                    </span>
                                    <span className="text-gray-600 dark:text-white">
                                        Or
                                        <span className="text-indigo-600 dark:text-indigo-400 mx-1">
                                            Browse
                                        </span>
                                        your files.
                                    </span>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                {/* right side form */}
                <div className="flex flex-col h-full w-full gap-8 mb-6 xs:max-w-[unset] md:max-w-[600px]">
                    <div className="flex flex-col">
                        <label
                            className="flex items-center font-bold mb-3 dark:text-white"
                            htmlFor="name"
                        >
                            Name*
                        </label>
                        <input
                            className="flex h-12 w-full items-center transition-all duration-300 rounded-xl p-3 text-md border border-level-2 outline-none dark:bg-d-primary dark:text-white"
                            placeholder="Name your NFT"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            className="flex flex-col font-bold mb-3 dark:text-white"
                            htmlFor="description"
                        >
                            Description*:
                        </label>
                        <textarea
                            placeholder="Enter a description"
                            className="h-auto w-full rounded-lg p-3 placeholder:text-secondary transition-all duration-300 dark:bg-d-primary outline-none min-h-[26px] text-[16px] leading-[26px] sm:font-[inherit] sm:leading-[inherit] sm:text-[inherit] border border-level-2 resize-none dark:text-white"
                            name="description"
                            id="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="flex flex-col">
                        <label
                            className="flex flex-col mb-3 font-bold dark:text-white"
                            htmlFor="collection"
                        >
                            Collection*
                        </label>
                        <select
                            className="p-4 bg-transparent hover:border-level-3 border transition-all duration-300 border-level-2 rounded-lg cursor-pointer dark:bg-d-primary dark:text-white"
                            name="collection"
                            id="collection"
                            value={formData.collection}
                            onChange={handleChange}
                        >
                            <option className="dark:text-white text-xl" value="">
                                ---------
                            </option>

                            {collectionsNames.map((collection, idx) => (
                                <option
                                    key={idx}
                                    name="option4"
                                    className="text-xl dark:text-white"
                                    value={collection}
                                >
                                    {collection}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className={`${classes.respnsiveBtn} text-center text-white text-xl font-bold bg-blue-500 px-12 py-3 rounded-lg self-end`}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};
export default MintForm;
