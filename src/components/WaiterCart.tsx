
import { useEffect, useRef } from "react"
import { Link } from "react-router"

import { BsArrowRight } from "react-icons/bs"
import { HiOutlineShoppingBag } from "react-icons/hi"


import { useLenis } from "lenis/react"
import { useWaiterCartContext } from "../Store/Context/WaiterCartContext"
import { WaiterCartItem } from "./WaiterCartItem"

const WaiterCart = () => {

    const { cart, active, setActive, totalAmount, totalItem, removeFromCart } = useWaiterCartContext()


    const sideNavRef = useRef<HTMLDivElement>(null)
    const lenis = useLenis()

    const handleRemove = (id: string) => {
        removeFromCart(id)
    }

    // Calculate subtotal from cart context
    const subtotal = typeof totalAmount === "number" ? totalAmount : Number.parseFloat(totalAmount.toString()) || 0
    const finalTotal = subtotal

    useEffect(() => {
        if (active) {
            document.body.style.overflow = "hidden"
            lenis?.stop()
        } else {
            document.body.style.overflow = "auto"
            lenis?.start()
        }
    }, [active, lenis])


    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
                setActive(false)
            }
        }

        const handleEsc = (event: any) => {
            if (event.key === "Escape") {
                setActive(false)
            }
        }

        if (active) {
            document.addEventListener("mousedown", handleClickOutside)
            document.addEventListener("keyup", handleEsc)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keyup", handleEsc)
        }
    }, [active])

    return (
        <>
            {/* Floating Cart Icon */}
            <div
                onClick={() => setActive(!active)}
                className={`${Number(totalItem) > 0 ? "block" : "hidden"} fixed bottom-7 animate-bounce right-10 text-white bg-black p-4 z-30 cursor-pointer rounded-full shadow-lg`}
            >
                <div className="relative "  >
                    <HiOutlineShoppingBag size={22} />
                    <span className="bg-theme-red absolute -top-5 -left-4 text-[13px] rounded-full h-5 w-5 text-center " >     {totalItem}
                    </span>
                </div>
            </div>

            {/* Cart Icon For Navbar */}
            <button className="text-xl cursor-pointer relative">
                <HiOutlineShoppingBag onClick={() => setActive(!active)} className={`hover:text-yellow-600 duration-300 transition-colors ${active ? "hidden" : "block"}`} size={24} />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {typeof totalItem === "number" ? totalItem : Number.parseInt(totalItem.toString()) || 0}
                    </span>
                )}
            </button>


            {/* Background Overlay */}
            {active && (
                <div
                    className="fixed top-0 left-0 w-full h-[200dvh] bg-black/50 bg-opacity-50 z-40"
                    onClick={() => setActive(false)}
                />
            )}

            {/* Side Nav */}
            <div
                ref={sideNavRef}
                className={`fixed font-bebas z-50 mx-auto   bottom-0 h-[90dvh] bg-white text-black text-3xl transition-transform duration-500 ease-in-out  lg:w-[50%] w-[calc(100%-40px)] px-5 left-[50%]  -translate-x-[50%] ${active ? "translate-y-0" : "translate-y-full"
                    }`}
                data-lenis-prevent
            >
                <div className="flex flex-col h-full pt-10 pb-5">
                    {/* Header */}
                    <h1 className=" flex justify-between mb-4">
                        <span className="leading-none px-1">CART</span>
                        <BsArrowRight onClick={() => setActive(false)} className="cursor-pointer rotate-90 mr-5" size={24} />
                    </h1>

                    {/* Scrollable Cart Items */}
                    <div className="flex-1 overflow-y-auto px-2 mb-4">
                        {cart.length > 0 ? (
                            <ul className="flex flex-col gap-5">
                                {/* Cart Items */}
                                {cart.map((item) => (
                                    <li key={item.id}>
                                        <WaiterCartItem
                                            id={item.id}
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                            image={item.image}
                                            selectedItems={item.selectedItems}
                                            onRemove={handleRemove}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <HiOutlineShoppingBag size={64} className="mb-4 opacity-50" />
                                <p className="text-xl">Your cart is empty</p>
                                <p className="text-sm mt-2">Add some delicious items to get started!</p>
                            </div>
                        )}
                    </div>

                    {/* Cart Summary and Checkout */}
                    {cart.length > 0 ? (
                        <div className="text-black">
                            <div className="flex justify-between items-center mb-4 pt-2 border-t">
                                <span className="text-2xl">Total:</span>
                                <span className="text-2xl ">${finalTotal.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout" className="w-full text-[26px]" onClick={() => setActive(false)}>
                                <button className="bg-black text-white  w-full uppercase cursor-pointer px-4 py-2 font-light tracking-wide">
                                    PLACE ORDER ({cart.length} {cart.length === 1 ? "item" : "items"})
                                </button>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default WaiterCart
