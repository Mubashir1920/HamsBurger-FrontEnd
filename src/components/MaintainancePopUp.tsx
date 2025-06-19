import { useState } from 'react';
import { IoMdClose } from 'react-icons/io'; 

const MaintainancePopUp = () => {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg  flex items-center justify-center z-50">
            <div className="relative bg-yellow-600 rounded-lg p-6 max-w-md w-full text-center shadow-xl">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 text-white rounded-xl cursor-pointer bg-black p-3 transition"
                    aria-label="Close"
                >
                    <IoMdClose size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-4">Under Working!</h2>
                <p className=" mb-6">
                    The Site is currently undergoing updates. We apologize for the inconvenience and appreciate your patience.
                </p>
            </div>
        </div>
    );
};

export default MaintainancePopUp;
