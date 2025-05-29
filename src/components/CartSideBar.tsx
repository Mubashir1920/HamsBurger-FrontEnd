

import { useEffect, useRef, useState } from "react"
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router";
import { useLenis } from "lenis/react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CartItem } from "./CartItem";


type MenuItem = {
    name: string;
    path: string;
};


const menuItems: MenuItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/aboutus' },
    { name: 'Contact', path: '/contact' },
];

const CartSideBar = () => {

    const sideNavRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const lenis = useLenis();
    const [cartItems, setCartItems] = useState([
        {
            id: "1",
            name: "Beef Burger",
            price: 29.99,
            quantity: 2,
            image: "/assets/burgers/beef.jpeg",
            variant: "Navy Blue",
            size: "Medium",
        },
        {
            id: "2",
            name: "Chicken Burger",
            price: 89.99,
            quantity: 1,
            image: "/assets/burgers/beef.jpeg",
            variant: "Black",
        },
        {
            id: "2",
            name: "Beef Peopone Pizza",
            price: 89.99,
            quantity: 1,
            image: "/assets/burgers/beef.jpeg",
            variant: "Black",
        },
        {
            id: "2",
            name: "Wireless Bluetooth Headphones",
            price: 89.99,
            quantity: 1,
            image: "/assets/burgers/beef.jpeg",
            variant: "Black",
        },
    ])

    const handleIncrease = (id: string) => {
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
    }

    const handleDecrease = (id: string) => {
        setCartItems((items) =>
            items.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
        )
    }

    const handleRemove = (id: string) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }


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
        if (active) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [active]);

    return (
        <>
            {/* Toggle Button */}
            <button className="text-xl cursor-pointer ">
                <HiOutlineShoppingBag onClick={() => setActive(true)} className={`${active ? 'hidden' : 'block'}`} size={28} />
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
                className={`fixed   top-0  right-0 h-[100dvh]  bg-black text-white text-3xl  transition-transform duration-500 ease-in-out   w-[80vw] sm:w-[50vw] lg:w-[35vw]  px-5 z-20 ${active ? 'translate-x-0' : 'translate-x-full'}`}
                data-lenis-prevent

            >
                <div className="flex flex-col h-full pt-10 pb-5">
                    {/* Header */}
                    <h1 className="bg-black flex justify-between mb-4">
                        <span className="leading-none px-1">CART</span>
                        <BsArrowRight onClick={() => setActive(false)} className="cursor-pointer mr-5" size={35} />
                    </h1>

                    {/* Scrollable Cart Items */}
                    <div className="flex-1  overflow-y-auto px-2 mb-4">
                        <ul className="flex flex-col gap-5">
                            {/* Cart Items */}
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                    image={item.image}
                                    onIncrease={handleIncrease}
                                    onDecrease={handleDecrease}
                                    onRemove={handleRemove}
                                    compact={true}
                                />
                            ))}
                        </ul>
                    </div>
                    {cartItems.length > 0 && (
                        <div className="text-white">
                            <div className="space-y-2 text-[20px]  mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    {/* <span>${subtotal.toFixed(2)}</span> */}
                                    <span>$304</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>$3.99</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-4 pt-2 border-t">
                                <span className="text-lg ">Total:</span>
                                {/* <span className="text-lg font-bold text-red-800">${(subtotal + 3.99).toFixed(2)}</span> */}
                                <span className="text-lg font-bold text-red-800">$307</span>
                            </div>
                            <Link to="/checkout" className="w-full text-[26px] " onClick={() => setActive(false)}>
                                <button className="hover:bg-red-800 bg-yellow-700 w-full transition-colors duration-300 uppercase cursor-pointer px-4 py-1 tracking-wide">
                                    CHECKOUT
                                </button>
                            </Link>
                        </div>
                    )}

                    {/* Footer Buttons */}
                    {/* <div className="flex flex-col text-[26px] gap-2">
                        <Link to="/cart" className="w-full" onClick={() => setActive(false)}>
                            <button className="bg-red-800 hover:bg-yellow-700 w-full transition-colors duration-300 uppercase cursor-pointer px-4 py-1 tracking-wide">
                                VIEW CART
                            </button>
                        </Link>
                        <Link to="/checkout" className="w-full" onClick={() => setActive(false)}>
                            <button className="hover:bg-red-800 bg-yellow-700 w-full transition-colors duration-300 uppercase cursor-pointer px-4 py-1 tracking-wide">
                                CHECKOUT
                            </button>
                        </Link>
                    </div> */}
                </div>
            </div >
        </>
    );
};

export default CartSideBar;
