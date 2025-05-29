import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuData } from "../utils/menu";

const tabs = Object.keys(menuData);

const Menu: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]); // default to first tab

    const items = menuData[activeTab];

    return (
        <section className="text-white py-16 px-4">
            <div className="text-center mb-10">
                <p className="text-red-500 italic mb-2">Our menu</p>
                <h2 className="text-4xl md:text-6xl font-bebas uppercase">
                    Delicious Tasty Dishes
                </h2>
                <div className="flex flex-wrap justify-center border-y md:mx-20 py-3 font-bebas mt-10 gap-4 overflow-hidden text-2xl uppercase tracking-wide">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-2 pb-1 border-b-2 cursor-pointer transition-all capitalize duration-300 ${activeTab === tab
                                ? "border-red-500 text-red-500"
                                : "border-transparent hover:text-red-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2">
                <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-theme-gray" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="md:col-span-2 grid md:grid-cols-2"
                    >

                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-6 ${idx % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}
                            >
                                <div className="mb-3 border-b border-theme-gray pb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-white text-3xl uppercase font-bebas tracking-wide">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center space-x-2">
                                            {item.isNew && (
                                                <span className="bg-theme-red text-xs text-white font-bold px-2 py-0.5">
                                                    NEW
                                                </span>
                                            )}
                                            <span className="font-bold text-lg">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-theme-gray capitalize text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center">
                <button className="mt-8 bg-theme-red text-white text-md tracking-tight font-medium py-2 px-6 rounded-md hover:bg-theme-red/80 transition duration-300 ease-in-out">
                    Download PDF Menu
                </button>
            </div>
        </section>
    );
};

export default Menu;
