import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { menuData } from "../utils/menu"
import MenuCard from "../components/MenuCard"
import ItemDetailsModal from "../components/ItemDetailsModal"
import FloatingCart from "../components/FloatingCart"

const tabs = Object.keys(menuData)

const OrderOnline: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0])
    const [selectedItem, setSelectedItem] = useState<any | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>("")


    const handleCardClick = (item: any) => {
        setSelectedItem(item)
        setSelectedCategory(activeTab) // Store the category when item is selected
    }

    const handleCloseModal = () => {
        setSelectedItem(null)
        setSelectedCategory("")
    }

    const handleAddToCart = (quantity: number) => {
        alert(`${quantity} item(s) added to cart!`)
        setSelectedItem(null)
        setSelectedCategory("")
    }

    return (
        <section className=" container mx-auto  justify-center py-16 px-4">
            <h2 className="text-4xl md:text-6xl font-bebas uppercase">ORDER ONLINE OR TAKEAWAY</h2>
            <p>
                Our Delicious Food Filled With Yummy taste and Love at Your Doorsteps. Order Now
            </p>

            <AnimatePresence mode="popLayout">
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
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap  gap-4 justify-center sm:gap-8"
                >

                    {menuData[activeTab]?.map((item, index) => (
                        <MenuCard key={index} {...item} onClick={() => handleCardClick(item)} />
                    ))}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence >
                <ItemDetailsModal
                    isOpen={!!selectedItem}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart}
                    category={selectedCategory}
                    {...selectedItem}
                />
            </AnimatePresence>

            <FloatingCart />
        </section>
    )
}

export default OrderOnline
