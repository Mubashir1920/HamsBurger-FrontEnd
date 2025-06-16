import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'

import ItemDetailsModal from './ItemDetailsModal'
import MenuCard from './MenuCard'
import { menuData } from '../utils/menu'

const tabs: string[] = menuData ? Object.keys(menuData) : []

const HomeMenu: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0])
    const [selectedItem, setSelectedItem] = useState<any | null>(null)

    const handleCardClick = (item: any) => setSelectedItem(item)
    const handleCloseModal = () => setSelectedItem(null)

    console.log(selectedItem);


    return (
        <>
            <section className="py-12 px-4 text-center">
                <p className="text-red-500 italic mb-2 text-lg">Our menu</p>
                <h2 className="text-white text-6xl font-bebas font-medium mb-6">THE HOT ITEMS</h2>

                <div className="flex flex-wrap text-xl max-w-fit mx-auto sticky top-20 z-[10] bg-black/70 backdrop-blur-lg mb-10 gap-4 justify-baseline sm:justify-center  md:px-10 px-4  rounded-lg py-5 font-bebas mt-10  sm:text-2xl uppercase tracking-wide">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-2 pb-1 border-b-2 cursor-pointer transition-all capitalize duration-300 ${activeTab === tab ? "border-red-500 text-red-500" : "border-transparent hover:text-red-500"
                                }`}
                        >
                            {tab === "ChickenBurger" ? "Chicken Burger" : tab === "BeefBurger" ? "Beef Burger" : tab}
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4"
                    >
                        {menuData[activeTab]?.slice(0, 3).map((item, index) => (
                            <MenuCard key={index} {...item} onClick={() => handleCardClick(item)} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <Link
                    to="/menu"
                    className="mt-8 inline-block bg-theme-red text-white text-lg tracking-tight font-medium py-2 px-6 rounded-md hover:bg-theme-red/80 transition"
                >
                    View Full Menu
                </Link>
            </section>


            <AnimatePresence>
                <ItemDetailsModal
                    category={activeTab}
                    isOpen={!!selectedItem}
                    onClose={handleCloseModal}
                    {...selectedItem}
                />
            </AnimatePresence>
        </>
    )
}

export default HomeMenu
