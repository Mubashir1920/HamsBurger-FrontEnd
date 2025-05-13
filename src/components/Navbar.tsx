"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { HiOutlineMenuAlt3, HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router";

const Navbar = () => {
    const { scrollY } = useScroll();
    const [scrollDirection, setScrollDirection] = useState("up");

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous: number = scrollY.getPrevious() ?? 0;
        if (current > previous) {
            setScrollDirection("down");
        } else {
            setScrollDirection("up");
        }
    });

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: scrollDirection === "down" ? -100 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/65 backdrop-blur-lg text-white border-b border-y-white/40 px-10 py-4 shadow-md font-bebas"
        >
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-2xl bg-black">
                    <span className="leading-none px-1">HAMS</span>
                    <span className="bg-theme-red px-1">BURGERS</span>
                </h1>

                {/* Nav Links */}
                <ul className="hidden md:flex  space-x-6 tracking-wide   text-2xl items-center">
                    <li className="cursor-pointer hover:text-red-800">
                        <Link to="/">HOME</Link>
                    </li>
                    <li className="cursor-pointer hover:text-red-800">
                        <Link to="/menu">MENU</Link>
                    </li>
                    <li className="cursor-pointer hover:text-red-800">
                        <Link to="/aboutus">ABOUT US</Link>
                    </li>
                    <li className="cursor-pointer hover:text-red-800">
                        <Link to="/contact">CONTACT</Link>
                    </li>
                </ul>

                {/* Button + Menu Icon */}
                <div className="flex items-center space-x-4  text-sm">
                    <button className="bg-red-800 uppercase cursor-pointer px-4 py-2 text-xl tracking-wide rounded-md transition">
                        Order Online
                    </button>
                    <button className="text-xl cursor-pointer">
                        <HiOutlineShoppingBag size={28} />
                    </button>
                    <button className="text-xl md:hidden" >
                        <HiOutlineMenuAlt3 size={28} />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
