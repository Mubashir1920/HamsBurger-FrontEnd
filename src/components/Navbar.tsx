import { useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import MobileNav from "./MobileNav";
import CartSideBar from "./CartSideBar";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const { scrollY } = useScroll();
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
    const [topNoticeVisible, setTopNoticeVisible] = useState(true);

    // Scroll direction detection
    useMotionValueEvent(scrollY, "change", useCallback((current) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (current > previous && scrollDirection !== "down") {
            setScrollDirection("down");
        } else if (current < previous && scrollDirection !== "up") {
            setScrollDirection("up");
        }
    }, [scrollDirection, scrollY]));

    // Close top notice
    const handleCloseNotice = useCallback(() => {
        setTopNoticeVisible(false);
    }, []);

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: scrollDirection === "down" ? -100 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/65 backdrop-blur-lg text-white border-b border-b-white/40 px-5 font-bebas"
        >
            {/* Top Notice */}
            <AnimatePresence>
                {topNoticeVisible && (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-yellow-500 text-black flex justify-center items-center px-4 py-2 text-sm md:text-lg relative"
                    >
                        <span>This site is under work 🚧</span>
                        <button
                            onClick={handleCloseNotice}
                            aria-label="Close notice"
                            className="ml-4 hover:text-red-600 absolute right-4 transition"
                        >
                            <IoClose size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

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
                    {["/", "/menu", "/aboutus", "/contact"].map((path, idx) => (
                        <li key={path} className="cursor-pointer hover:text-red-800">
                            <Link to={path}>{["HOME", "MENU", "ABOUT US", "CONTACT"][idx]}</Link>
                        </li>
                    ))}
                </ul>

                {/* Cart & Mobile Nav */}
                <div className="flex items-center gap-4 text-sm">
                    <CartSideBar />
                    <MobileNav />
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
