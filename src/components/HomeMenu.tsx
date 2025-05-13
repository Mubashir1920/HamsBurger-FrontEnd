import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'

import ItemDetailsModal from './ItemDetailsModal'
import MenuCard from './MenuCard'
import { menuData, Extras } from '../utils/menu'

const tabs: string[] = menuData ? Object.keys(menuData) : []

const HomeMenu: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0])
    const [selectedItem, setSelectedItem] = useState<any | null>(null)

    const handleCardClick = (item: any) => setSelectedItem(item)
    const handleCloseModal = () => setSelectedItem(null)
    const handleAddToCart = () => {
        alert('Item added to cart!')
        setSelectedItem(null)
    }


    return (
        <>
            <section className="py-12 px-4 text-center">
                <p className="text-red-500 italic mb-2 text-lg">Our menu</p>
                <h2 className="text-white text-6xl font-bebas font-medium mb-6">THE HOT ITEMS</h2>

                <div className="flex justify-center gap-8 space-x-6 mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative font-bebas text-2xl cursor-pointer tracking-wide hover:text-red-500 duration-300 ${activeTab === tab ? 'text-red-500' : ''}`}
                        >
                            {tab}
                            {activeTab === tab && <span className="block h-[2px] bg-red-500 mt-1"></span>}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4"
                    >
                        {menuData[activeTab]?.slice(0, 6).map((item, index) => (
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

            {/* ✅ Modal OUTSIDE the section to prevent body scroll */}
            {/* <AnimatePresence> */}
                <ItemDetailsModal
                    isOpen={!!selectedItem}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart}
                    {...selectedItem}
                    Extras={Extras}
                />
            {/* </AnimatePresence> */}
        </>
    )
}

export default HomeMenu
