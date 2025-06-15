"use client"

import type React from "react"

import { useEffect, useState, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "lenis/react"

import { IoMdClose } from "react-icons/io"
import { IoReload } from "react-icons/io5"
import { FiMinus, FiPlus } from "react-icons/fi"

import { useCartContext } from "../Store/Context/CartContext"

import type { DealItem, ExtraItem, SizeOption } from "../utils/menu"
import { Flavours } from "../utils/menu"
import ExtraItems from "./Extras"

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}

const modal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
}

interface ItemDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    image: string
    title: string
    desc: string
    price: number
    sizes: SizeOption[]
    category: string
    dealItems?: DealItem[]
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
    isOpen,
    onClose,
    image,
    title,
    desc,
    price,
    sizes,
    category,
    dealItems,
}) => {
    const [quantity, setQuantity] = useState<number>(1)

    const [mealtype, setMealType] = useState<string>("simple") // For Simple Burgers
    const [pizzaSizes, setPizzaSizes] = useState<(SizeOption | null)[]>([])

    const [selectedDealData, setSelectedDealData] = useState({
        selectedFlavours: {}, // { '0': ['flavour1', 'flavour2'], ... }
        defaultItems: [], // [{ name: 'French Fries (Regular)', quantity: 2 }, ...]
    })

    const [selectedExtras, setSelectedExtras] = useState<ExtraItem[]>([])

    const { addToCart } = useCartContext()

    const lenis = useLenis()
    const isInitialized = useRef(false)

    // Simplified quantity handlers
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    }

    const resetQuantity = () => {
        setQuantity(1)
    }

    const handleAdd = () => {
        let selectedItems = {}

        if (category === "Pizza") {
            selectedItems = {
                type: "Pizza",
                name: title,
                sizes: pizzaSizes.filter((size) => size !== null),
                quantity,
                totalPrice: calculateTotalPrice(),
            }
        } else if (category === "Deals") {
            selectedItems = {
                type: "Deal",
                name: title,
                quantity,
                selectedFlavours: selectedDealData.selectedFlavours,
                defaultItems: selectedDealData.defaultItems,
                totalPrice: calculateTotalPrice(),
            }
        } else {
            selectedItems = {
                type: "Burger",
                name: title,
                mealType: mealtype,
                quantity,
                totalPrice: calculateTotalPrice(),
            }
        }

        const itemToAdd = {
            id: title + "-" + Math.random().toString(36).slice(2, 5),
            name: title,
            price: Number.parseFloat(calculateTotalPrice()), // Convert string back to number
            quantity,
            image,
            selectedItems, // Add the detailed selection object
        }

        addToCart(itemToAdd)
        onClose()
    }

    const calculateTotalPrice = () => {
        let finalPrice = 0

        if (category === "Pizza") {
            // Sum up the price of all selected pizza sizes
            finalPrice = pizzaSizes.reduce((total, size) => {
                return total + (size?.price || 0)
            }, 0)
        } else if (category === "Deals") {
            finalPrice = price * quantity
        } else {
            // For regular items (e.g., burgers, fries)
            finalPrice = (mealtype === "combo" ? price + 3.99 : price) * quantity
        }

        return finalPrice.toFixed(2)
    }

    const isAddToCartDisabled = useMemo(() => {
        // For Pizza: Check if all pizza sizes are selected
        if (category === "Pizza") {
            return pizzaSizes.length !== quantity || pizzaSizes.some((size) => !size)
        }

        // For Deals: Check if all non-default items have flavours selected
        if (category === "Deals" && dealItems) {
            const nonDefaultItems = dealItems.filter((item) => !item.isDefault)

            for (let i = 0; i < nonDefaultItems.length; i++) {
                const item = nonDefaultItems[i]
                const requiredSelections = item.quantity * quantity
                const currentSelections = selectedDealData.selectedFlavours[i] || []

                // Check if all selections are made and none are empty
                if (currentSelections.length !== requiredSelections || currentSelections.some((selection) => !selection)) {
                    return true
                }
            }
        }

        return false
    }, [category, pizzaSizes, quantity, selectedDealData.selectedFlavours, dealItems])

    useEffect(() => {
        const defaultItems =
            dealItems &&
            dealItems
                .filter((item) => item.isDefault)
                .map((item) => ({
                    name: item.defaultItem || item.type,
                    quantity: item.quantity * quantity,
                }))

        setSelectedDealData((prev) => ({
            ...prev,
            defaultItems,
        }))
    }, [dealItems, quantity])

    // Main useEffect - only runs when modal opens/closes
    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen && !isInitialized.current) {
            // Reset all state when modal opens
            setQuantity(1)
            setMealType("simple")
            setPizzaSizes([])
            setSelectedDealData({
                selectedFlavours: {},
                defaultItems: [],
            })
            setSelectedExtras([])
            document.addEventListener("keyup", handleEsc)
            isInitialized.current = true
        }

        if (isOpen) {
            document.body.style.overflow = "hidden"
            lenis?.stop()
        } else {
            document.body.style.overflow = "auto"
            lenis?.start()

            // Reset state when modal closes
            if (isInitialized.current) {
                setQuantity(1)
                setMealType("simple")
                setPizzaSizes([])
                setSelectedDealData({
                    selectedFlavours: {},
                    defaultItems: [],
                })
                setSelectedExtras([])
                isInitialized.current = false
            }
        }

        return () => {
            document.body.style.overflow = "auto"
            document.removeEventListener("keyup", handleEsc)
            lenis?.start()
        }
    }, [isOpen, lenis, onClose])

    useEffect(() => {
        if (category === "Pizza") {
            // Reset pizza sizes when quantity changes
            setPizzaSizes(Array(quantity).fill(null))
        }
    }, [quantity, category])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        data-lenis-prevent
                        className="bg-black text-white w-full max-w-5xl h-[90vh] rounded-xl overflow-y-auto shadow-lg relative"
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute bg-black p-2 top-4 right-4 cursor-pointer text-white hover:text-theme-red transition z-10"
                        >
                            <IoMdClose size={30} />
                        </button>

                        {/* Main Content */}
                        <div className="flex flex-col md:flex-row">
                            {/* Left Image */}
                            <div className="w-full md:w-1/2 md:sticky md:top-0 aspect-3/2 h-64 md:h-[70vh]">
                                <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
                            </div>

                            {/* Right Details */}
                            <div className="w-full md:w-1/2 flex flex-col justify-start p-6 mt-5">
                                <h2 className="text-4xl font-bebas uppercase">{title}</h2>
                                <p className="mt-2 text-sm text-gray-300">{desc}</p>
                                <motion.p
                                    key={calculateTotalPrice()} // This triggers re-render/animation when value changes
                                    initial={{ x: 0.8, opacity: 0 }}
                                    animate={{ x: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 text-xl text-yellow-400 font-semibold"
                                >
                                    ${calculateTotalPrice()}/-
                                </motion.p>

                                {/* Quantity */}
                                <div className="mt-4 flex items-center gap-4">
                                    <span className="font-semibold">Quantity:</span>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center border border-gray-500 rounded">
                                            <button onClick={decreaseQuantity} className="px-3 py-1 hover:text-red-800">
                                                <FiMinus />
                                            </button>
                                            <span className="px-4">{quantity}</span>
                                            <button onClick={increaseQuantity} className="px-3 py-1 hover:text-red-800">
                                                <FiPlus />
                                            </button>
                                        </div>
                                        <button onClick={resetQuantity} className="px-3 py-1 text-sm bg-red-800 rounded transition-colors">
                                            <IoReload size={22} />
                                        </button>
                                    </div>
                                </div>

                                {/* Combo Option (for Brgers) */}
                                {category !== "Pizza" && category !== "Deals" && (
                                    <div className="mt-4 flex flex-col gap-2">
                                        <label className="font-semibold">Meal: </label>
                                        <select
                                            value={mealtype}
                                            onChange={(e) => setMealType(e.target.value)}
                                            className="bg-black border border-gray-500 rounded text-sm px-2 py-1"
                                        >
                                            <option value="simple">{title}</option>
                                            <option value="combo">{title} + (Fries & Drink) Combo</option>
                                        </select>
                                    </div>
                                )}
                                {/*  Category is Pizza */}
                                {category === "Pizza" && (
                                    <div className="mt-4 flex flex-col gap-2">
                                        <label className="font-semibold">Size:</label>

                                        {Array.from({ length: quantity }).map((_, idx) => (
                                            <select
                                                key={idx}
                                                value={pizzaSizes[idx] ? JSON.stringify(pizzaSizes[idx]) : ""}
                                                onChange={(e) => {
                                                    const selected = JSON.parse(e.target.value)
                                                    setPizzaSizes((prev) => {
                                                        const updated = [...prev]
                                                        updated[idx] = selected
                                                        return updated
                                                    })
                                                }}
                                                className="bg-black border border-gray-500 rounded text-sm px-2 py-1"
                                            >
                                                <option value="" disabled>
                                                    Select Size {quantity > 1 ? `(${idx + 1})` : ""}
                                                </option>

                                                {sizes?.map((size, i) => (
                                                    <option key={i} value={JSON.stringify(size)}>
                                                        {size.name} ({size.description}) — ${size.price}
                                                    </option>
                                                ))}
                                            </select>
                                        ))}
                                    </div>
                                )}

                                {/* Category is Deal */}
                                {category === "Deals" && (
                                    <div className="mt-4 flex flex-col gap-2">
                                        {/* First render non-default items */}
                                        {dealItems
                                            .filter((item) => !item.isDefault)
                                            .map((dealItem, idx) => {
                                                let availableFlavours = []

                                                if (dealItem.type === "burger" && dealItem.burgerType) {
                                                    availableFlavours =
                                                        dealItem.burgerType === "chicken" ? Flavours.chickenBurger : Flavours.beefBurger
                                                } else if (dealItem.type === "pizza") {
                                                    availableFlavours = Flavours.pizza
                                                } else if (dealItem.type === "drink") {
                                                    availableFlavours = Flavours.drinks ?? []
                                                }

                                                return (
                                                    <div key={`nonDefault-${idx}`} className="text-sm flex flex-col gap-1">
                                                        <p className="text-gray-300 font-medium capitalize">
                                                            {dealItem.quantity} x {dealItem.type}
                                                        </p>

                                                        {/* Render one <select> for each quantity unit */}
                                                        {Array.from({ length: dealItem.quantity * quantity }).map((_, i) => (
                                                            <select
                                                                key={`${idx}-${i}`}
                                                                className="px-2 capitalize py-1 rounded bg-black border border-gray-500"
                                                                defaultValue=""
                                                                onChange={(e) => {
                                                                    const flavour = e.target.value
                                                                    setSelectedDealData((prev) => {
                                                                        const current = { ...prev.selectedFlavours }
                                                                        const selections = current[idx] ? [...current[idx]] : []

                                                                        // Ensure we have correct length
                                                                        selections[i] = flavour

                                                                        return {
                                                                            ...prev,
                                                                            selectedFlavours: {
                                                                                ...current,
                                                                                [idx]: selections,
                                                                            },
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                <option value="" disabled>
                                                                    Select {dealItem.type} {dealItem.quantity > 1 ? `(${i + 1})` : ""}
                                                                </option>
                                                                {availableFlavours.map((flavour, index) => (
                                                                    <option key={index} value={flavour}>
                                                                        {flavour}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        ))}
                                                    </div>
                                                )
                                            })}

                                        {/* Then render default items */}
                                        <div className=" mt-5 flex flex-wrap gap-2">
                                            {dealItems
                                                .filter((item) => item.isDefault)
                                                .map((dealItem, idx) => (
                                                    <div key={`default-${idx}`} className="text-sm">
                                                        <p className="bg-theme-red px-2 py-1 rounded-lg block capitalize">
                                                            {dealItem.defaultItem
                                                                ? `${dealItem.quantity * quantity} x ${dealItem.defaultItem}`
                                                                : `${dealItem.type} x ${dealItem.quantity * quantity}`}
                                                        </p>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Add Button */}
                                <div className="mt-6">
                                    <button
                                        onClick={handleAdd}
                                        className="bg-theme-red hover:bg-yellow-700 disabled:hover:bg-theme-red disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold uppercase px-5 py-2 rounded transition-colors"
                                        disabled={isAddToCartDisabled}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Extras Section */}
                        <ExtraItems />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ItemDetailsModal
