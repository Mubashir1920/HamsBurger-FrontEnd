

import { useEffect, useRef, useState } from "react"
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router";
import { useLenis } from "lenis/react";
import { LuArrowUpRight } from "react-icons/lu";

type MenuItem = {
    name: string;
    path: string;
};


const menuItems: MenuItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/aboutus' },
    { name: 'Contact', path: '/contact' },
    { name: 'Checkout', path: '/checkout' },
];

const MobileNav = () => {

    const sideNavRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const lenis = useLenis();
    const pathname = window.location.pathname;


    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
            lenis?.stop();
        } else {
            document.body.style.overflow = 'auto';
            lenis?.start();
        }
    }, [active]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
                setActive(false);
            }
        };
        const handleEsc = (event: any) => {
            if (event.key == 'Escape') {
                setActive(false)
            }
        }

        if (active) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keyup', handleEsc)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keyup', handleEsc)
        };
    }, [active]);

    return (
        <>
            {/* Toggle Button */}
            <button className="text-xl  cursor-pointer md:hidden">
                <HiOutlineMenuAlt3 onClick={() => setActive(true)} className={`${active ? 'hidden' : 'block'}`} size={28} />
            </button>

            {/* Background Overlay */}
            {active && (
                <div
                    className="fixed top-0 left-0 w-full h-[100dvh] bg-black/50 bg-opacity-50 z-10"
                    onClick={() => setActive(false)}
                />
            )}

            {/* Side Nav */}
            <div
                ref={sideNavRef}
                className={`fixed   top-0  right-0 h-[100dvh]  bg-black text-white text-3xl  transition-transform duration-500 ease-in-out   w-[100vw] sm:w-[50vw] px-10 z-20  ${active ? 'translate-x-0' : 'translate-x-full'}`}
            >

                <div className='relative  h-full flex flex-col pt-15 '>
                    <Link to="/" onClick={() => setActive(false)} className="mb-10 cursor-pointer">
                        <h1 className=" bg-black " >
                            <span className="leading-none px-1">HAMS</span>
                            <span className="bg-theme-red px-1">BURGERS</span>
                        </h1>
                    </Link>
                    <IoCloseOutline onClick={() => setActive(false)} className={` absolute right-5 cursor-pointer top-10 ${active ? 'block' : 'hidden'}`} size={35} />


                    <ul className="flex flex-col gap-5  mt-20">
                        {menuItems.map((item) => (
                            <li key={item.name} className="group overflow-hidden relative">
                                <Link
                                    onClick={() => setActive(false)}
                                    to={item.path}
                                >
                                    <LuArrowUpRight className={`${pathname == item.path ? 'opacity-100 ml-0 text-theme-red ' : ''} inline-block opacity-0 group-hover:opacity-100 transition-all -ml-6 group-hover:ml-0 duration-300`} />
                                    {item.name}
                                </Link>
                            </li>
                        ))}

                    </ul>

                    <Link to="/menu" className="absolute bottom-5 w-full" onClick={() => setActive(false)} >
                        <button className="bg-red-800 hover:bg-yellow-700 w-full    transition-colors duration-300 uppercase cursor-pointer px-4 py-1  tracking-wide  ">
                            Order Online
                        </button>
                    </Link>
                </div>
            </div >
        </>
    );
};

export default MobileNav;
