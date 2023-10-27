import { useState } from 'react';
import classes from './MintForm.module.css';

const MintForm = () => {
    const initialValues = {
        name: '',
        description: '',
        collection: '',
    };
    const [formData, setFormData] = useState(initialValues);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

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
        } else {
            setSelectedImage(null);
        }
        e.target.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: add logic to save the NFT
        console.log(formData);
        setFormData(initialValues);
    };

    const imgBorder = selectedImage
        ? ''
        : 'border border-dashed hover:border-solid';

    return (
        <div className='m-auto w-full pt-[136px] h-full'>
            <div className='w-full flex gap-36 justify-center '>
                <div className='flex flex-col h-full w-full gap-2 md:max-w-[600px] '>
                    <span className='font-semibold text-3xl'>
                        Create an NFT
                    </span>
                    <span className='text-base'>
                        Once your item is minted you will not be able to change
                        any of its information.
                    </span>
                </div>
                <div className='flex flex-col h-full w-full gap-2 md:max-w-[600px]'></div>
            </div>
            <form
                onSubmit={handleSubmit}
                className='w-full h-full flex gap-36 justify-center relative pt-8'
            >
                {/* left side form - drag and drop file upload */}
                <div className='w-full h-full md:max-w-[600px]'>
                    <div
                        className={`relative ${imgBorder} border-slate-500 rounded-lg flex flex-col items-center justify-center cursor-pointer aspect-square `}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {selectedImage && isHovered && (
                            <div className={classes.overlay}></div>
                        )}
                        {selectedImage && isHovered && (
                            <div className={classes.overlayAbove}>
                                <i
                                    className='fa-solid fa-trash fa-xl text-white z-100 absolute top-7 right-4 cursor-pointer'
                                    onClick={() => {
                                        setSelectedImage(null);
                                    }}
                                ></i>
                            </div>
                        )}
                        <input
                            type='file'
                            id='media'
                            className='hidden'
                            onChange={handleImageChange}
                        />

                        <label
                            htmlFor='media'
                            className='absolute inset-0 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-slate-100 transition-all duration-300'
                        >
                            {selectedImage ? (
                                <div className='w-full h-full'>
                                    <img
                                        src={selectedImage}
                                        alt='Selected'
                                        className='w-full h-full object-cover rounded-lg'
                                    />
                                </div>
                            ) : (
                                <>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-12 h-12 text-gray-400'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M12 4v16m8-8H4'
                                        ></path>
                                    </svg>
                                    <span className='text-gray-600'>
                                        Drag and drop media
                                    </span>
                                    <span className='text-indigo-600'>
                                        Browse
                                    </span>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                {/* right side form */}
                <div className='flex flex-col h-full w-full gap-8 xs:max-w-[unset] md:max-w-[600px]'>
                    <div className='flex flex-col'>
                        <label
                            className='flex items-center mb-3'
                            htmlFor='name'
                        >
                            Name *
                        </label>
                        <input
                            className='flex h-12 w-full items-center rounded-xl p-3 text-md border border-level-2 transition duration-200 hover:border-level-3 focus-within:shadow-none focus-within:hover:shadow-none focus-within:border-level-3'
                            placeholder='Name your NFT'
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label
                            className='flex flex-col mb-3'
                            htmlFor='description'
                        >
                            Description:
                        </label>
                        <textarea
                            placeholder='Enter a description'
                            className='h-auto w-full rounded-lg p-3 placeholder:text-secondary bg-transparent outline-none min-h-[26px] text-[16px] leading-[26px] sm:font-[inherit] sm:leading-[inherit] sm:text-[inherit] border border-level-2 transition duration-200 hover:border-level-3 focus-within:shadow-none focus-within:hover:shadow-none focus-within:border-level-3 no-scrollbar resize-none'
                            name='description'
                            id='description'
                            rows='4'
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className='flex flex-col'>
                        <label
                            className='flex flex-col mb-3'
                            htmlFor='collection'
                        >
                            Collection *
                        </label>
                        <select
                            className='p-4 bg-transparent hover:border-level-3 border border-level-2 rounded-lg cursor-pointer'
                            name='collection'
                            id='collection'
                            value={formData.collection}
                            onChange={handleChange}
                        >
                            <option value=''>---------</option>
                            <option
                                name='option1'
                                className='text-xl'
                                value='1'
                            >
                                Option-1
                            </option>
                            <option
                                name='option2'
                                className='text-xl'
                                value='2'
                            >
                                Option-2
                            </option>
                            <option
                                name='option3'
                                className='text-xl'
                                value='3'
                            >
                                Option-3
                            </option>
                            <option
                                name='option4'
                                className='text-xl'
                                value='4'
                            >
                                Option-4
                            </option>
                        </select>
                    </div>
                    <button className='text-center text-white text-xl font-bold bg-blue-500 px-12 py-3 rounded-lg self-end'>
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MintForm;
