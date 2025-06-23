

import { useState } from 'react';
import { menuData } from '../utils/menu'
import { motion, AnimatePresence } from 'motion/react';
import { GoPlus } from 'react-icons/go';
import WaiterExtras from './WaiterExtras';
import WaiterItemDetailsModal from './WaiterItemDetailsModal';


const menutabs = Object.keys(menuData);
const tabs = [...menutabs, 'Extras']

const AddItemsWaitersMenu = () => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0])

    const [selectedItem, setSelectedItem] = useState<any | null>(null)

    const handleCardClick = (item: any) => setSelectedItem(item);
    const handleCloseModal = () => setSelectedItem(null);


    return (
        <section className="min-h-screen text-black bg-white flex flex-col items-center justify-baseline p-4" >
            <div className="max-w-xl w-full " >
                <h1 className="text-5xl font-bebas mb-6  text-left">Take Order</h1>
                <div className="flex flex-col  gap-4 items-center  ">
                    <div className='flex w-full  gap-2 ' >
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-2  text-lg pb-1 border-b-2 cursor-pointer  capitalize  ${activeTab === tab ? " border-b font-medium" : "border-transparent "}`}
                            >
                                {tab === "ChickenBurger" ? "Chicken Burger" : tab === "BeefBurger" ? "Beef Burger" : tab}
                            </button>
                        ))}
                    </div>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full rounded-lg"
                    >
                        {menuData[activeTab]?.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0">
                                <div className='w-[85%] items-center gap-4 flex'>
                                    <img className='w-20 h-20 rounded-lg' src={item.image} alt={item.title} />
                                    <div>
                                        <h2 className="text-xl font-semibold flex justify-between ">
                                            {item.title}
                                            <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                                        </h2>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                                <GoPlus onClick={() => handleCardClick(item)} className='cursor-pointer  hover:text-theme-red' size={30} />
                            </div>
                        ))}
                        {activeTab === 'Extras' && (
                            <WaiterExtras />
                        )}

                    </motion.div>
                </div>
            </div>
            <AnimatePresence>
                <WaiterItemDetailsModal
                    category={activeTab}
                    isOpen={!!selectedItem}
                    onClose={handleCloseModal}
                    {...selectedItem}
                />
            </AnimatePresence>
        </section>
    )
}

export default AddItemsWaitersMenu



