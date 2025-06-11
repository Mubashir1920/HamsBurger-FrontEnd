import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Extras, menuData } from "../utils/menu"
import MenuCard from "../components/MenuCard"
import ItemDetailsModal from "../components/ItemDetailsModal"

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
        <section className="text-white max-w-6xl mx-auto flex flex-col justify-center py-16 px-4">
            <div className="text-left mb-10">
                <h2 className="text-4xl md:text-6xl font-bebas uppercase">ORDER ONLINE OR TAKEAWAY</h2>
                <p>
                    Our Delicious Food Filled With Yummy taste and Love at Your Doorsteps. Order Now
                </p>
                <div className="flex flex-wrap gap-4 justify-start md:justify-center border-y py-3 font-bebas mt-10  text-2xl uppercase tracking-wide">
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
            </div>

            <AnimatePresence mode="popLayout">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap md:justify-start gap-4 justify-center sm:gap-6"
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
                    category={selectedCategory} // Pass the category to the modal
                    Extras={Extras}
                    {...selectedItem}
                />
            </AnimatePresence>
        </section>
    )
}

export default OrderOnline
