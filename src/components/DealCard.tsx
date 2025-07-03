
import { useState } from "react";
import { type MenuItem } from "../utils/menu";
import ItemDetailsModal from "./ItemDetailsModal";

const DealCard = ({ card }: { card: MenuItem }) => {

    const [selectedItem, setSelectedItem] = useState<any | null>(null)

    const handleCardClick = (item: any) => setSelectedItem(item)
    const handleCloseModal = () => setSelectedItem(null)


    return (
        <>
            <div className="flex flex-col  lg:flex-row bg-black backdrop-blur-md rounded-xl overflow-hidden shadow-lg md:w-[80%] w-full  mx-auto">
                {/* Left Text Section */}
                <div className=" text-white flex flex-col justify-center items-center px-8 py-7 text-center lg:w-1/2">
                    <div className="border border-white/20 p-10 text-left rounded-md w-full ">
                        <h3 className="text-white text-4xl font-medium font-bebas mb-4">{card.title}</h3>
                        <p className="text-gray-400 text-sm capitalize leading-relaxed mb-4">{card.desc}</p>
                        <div className="mb-4 ">
                            <span className="text-2xl text-white/60 line-through font-semibold mr-2">${(card.price + 10).toFixed(2)}</span>
                            <span className="text-2xl font-semibold mr-2">${card.price}</span>
                        </div>
                        <button
                            className="bg-theme-red cursor-pointer hover:bg-yellow-700 duration-300 text-white font-bold py-2 px-6 rounded"
                            onClick={() => handleCardClick(card)}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="lg:w-1/2 w-full relative h-[400px]  ">
                    <img
                        src={card.image}
                        alt={card.title}
                        className="object-cover h-full w-full"
                    />
                </div>
            </div >
            <ItemDetailsModal
                category='Deals'
                isOpen={!!selectedItem}
                onClose={handleCloseModal}
                {...selectedItem}
            />
        </>
    );
};

export default DealCard;
