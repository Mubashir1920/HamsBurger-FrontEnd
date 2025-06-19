import { useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Link } from "react-router";
import MobileNav from "./MobileNav";
import CartSideBar from "./CartSideBar";
import { HiOutlineShoppingBag } from "react-icons/hi"
import { useCartContext } from "../Store/Context/CartContext";


type NavItem = {
    label: string;
    path: string;
};

const navItems: NavItem[] = [
    { label: "HOME", path: "/" },
    { label: "MENU", path: "/menu" },
    { label: "ABOUT US", path: "/aboutus" },
    { label: "CONTACT", path: "/contact" },
    { label: "CHECKOUT", path: "/checkout" },
];


const Navbar = () => {
    const { scrollY } = useScroll();
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

    const { active, setActive, cart, totalItem } = useCartContext()

    // Scroll direction detection
    useMotionValueEvent(scrollY, "change", useCallback((current) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (current > previous && scrollDirection !== "down") {
            setScrollDirection("down");
        } else if (current < previous && scrollDirection !== "up") {
            setScrollDirection("up");
        }
    }, [scrollDirection, scrollY]));

    return (
        <>
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: scrollDirection === "down" ? -100 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-40 bg-black/65 backdrop-blur-lg text-white border-b border-b-white/40 px-5 font-bebas"
            >
                {/* Main Navbar */}
                <div className="container mx-auto flex items-center justify-between py-6">
                    {/* Logo */}
                    <h1 className="text-2xl bg-black">
                        <Link to='/'>
                            <span className="leading-none px-1">HAMS</span>
                            <span className="bg-theme-red px-1">BURGERS</span>
                        </Link>
                    </h1>

                    {/* Nav Links */}
                    <ul className="hidden md:flex space-x-6 tracking-wide text-2xl items-center">
                        {navItems.map((item) => (
                            <li key={item.path} className="cursor-pointer hover:text-red-800">
                                <Link to={item.path}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>

                    {/* Cart & Mobile Nav */}
                    <div className="flex items-center gap-4 text-sm">
                        <button className="text-xl cursor-pointer relative">
                            <HiOutlineShoppingBag onClick={() => setActive(!active)} className={`hover:text-yellow-600 duration-300 transition-colors ${active ? "hidden" : "block"}`} size={28} />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {typeof totalItem === "number" ? totalItem : Number.parseInt(totalItem.toString()) || 0}
                                </span>
                            )}
                        </button>
                        <MobileNav />
                    </div>
                </div>
            </motion.nav>
            <CartSideBar />
        </>
    );
};

export default Navbar;
