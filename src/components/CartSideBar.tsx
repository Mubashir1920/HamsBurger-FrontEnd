"use client"

import { useEffect, useRef, useState } from "react"
import { BsArrowRight } from "react-icons/bs"
import { Link } from "react-router"
import { useLenis } from "lenis/react"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { CartItem } from "./CartItem"
import { useCartContext } from "../Store/Context/CartContext"

const CartSideBar = () => {
    const sideNavRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(false)
    const lenis = useLenis()

    const { cart, totalAmount, totalItem, deliveryCharges, updateQuantity, removeFromCart } = useCartContext()

    const handleIncrease = (id: string) => {
        const item = cart.find((item) => item.id === id)
        if (item) {
            updateQuantity(id, item.quantity + 1)
        }
    }

    const handleDecrease = (id: string) => {
        const item = cart.find((item) => item.id === id)
        if (item && item.quantity > 1) {
            updateQuantity(id, item.quantity - 1)
        }
    }

    const handleRemove = (id: string) => {
        removeFromCart(id)
    }

    // Calculate subtotal from cart context
    const subtotal = typeof totalAmount === "number" ? totalAmount : Number.parseFloat(totalAmount.toString()) || 0
    const deliveryFee = deliveryCharges
    const finalTotal = subtotal + deliveryFee

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
            {/* Toggle Button */}
            <button className="text-xl cursor-pointer relative">
                <HiOutlineShoppingBag onClick={() => setActive(true)} className={` ${active ? "hidden" : "block"}`} size={28} />
                {/* Cart Item Count Badge */}
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {typeof totalItem === "number" ? totalItem : Number.parseInt(totalItem.toString()) || 0}
                    </span>
                )}
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
                className={`fixed top-0 right-0 h-[100dvh] bg-black text-white text-3xl transition-transform duration-500 ease-in-out w-[80vw] sm:w-[50vw] lg:w-[35vw] px-5 z-20 ${active ? "translate-x-0" : "translate-x-full"
                    }`}
                data-lenis-prevent
            >
                <div className="flex flex-col h-full pt-10 pb-5">
                    {/* Header */}
                    <h1 className="bg-black flex justify-between mb-4">
                        <span className="leading-none px-1">CART</span>
                        <BsArrowRight onClick={() => setActive(false)} className="cursor-pointer mr-5" size={35} />
                    </h1>

                    {/* Scrollable Cart Items */}
                    <div className="flex-1 overflow-y-auto px-2 mb-4">
                        {cart.length > 0 ? (
                            <ul className="flex flex-col gap-5">
                                {/* Cart Items */}
                                {cart.map((item) => (
                                    <li key={item.id}>
                                        <CartItem
                                            id={item.id}
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                            image={item.image}
                                            selectedItems={item.selectedItems}
                                            onIncrease={handleIncrease}
                                            onDecrease={handleDecrease}
                                            onRemove={handleRemove}
                                            compact={true}
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
                        <div className="text-white">
                            <div className="space-y-2 text-[20px] mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>${deliveryFee.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-4 pt-2 border-t">
                                <span className="text-2xl">Total:</span>
                                <span className="text-2xl font-bold text-yellow-400">${finalTotal.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout" className="w-full text-[26px]" onClick={() => setActive(false)}>
                                <button className="hover:bg-red-800 bg-yellow-700 w-full transition-colors duration-300 uppercase cursor-pointer px-4 py-1 tracking-wide">
                                    CHECKOUT ({cart.length} {cart.length === 1 ? "item" : "items"})
                                </button>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default CartSideBar
