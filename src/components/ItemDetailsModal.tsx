"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoMdClose } from "react-icons/io"
import { FiMinus, FiPlus } from "react-icons/fi"
import type { ExtraItem, DealItem } from "../utils/menu"
import { getItemOptions } from "../utils/menu"
import { useLenis } from "lenis/react"
import { IoReload } from "react-icons/io5"

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
    onAddToCart: (quantity: number) => void
    Extras: ExtraItem[]
    category?: string
    dealItems?: DealItem[]
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
    isOpen,
    onClose,
    image,
    title,
    desc,
    price,
    onAddToCart,
    Extras,
    category,
    dealItems = [],
}) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [selectedExtras, setSelectedExtras] = useState<ExtraItem[]>([])
    const [expandedDealItems, setExpandedDealItems] = useState<DealItem[]>([])
    const [selectedDealChoices, setSelectedDealChoices] = useState<{ [key: number]: { item?: string; flavor?: string } }>(
        {},
    )
    const lenis = useLenis()
    const isInitialized = useRef(false)

    const isDeal = category === "Deals"

    // Check if item type should show selection dropdown
    // const shouldShowSelection = (dealItem: DealItem) => {
    //     return (
    //         !dealItem.isDefault &&
    //         (dealItem.type === "burger" || dealItem.type === "pizza" || dealItem.type === "drink" || dealItem.type === "dip")
    //     )
    // }

    // Check if item should show flavor selection
    const shouldShowFlavorSelection = (dealItem: DealItem) => {
        return !dealItem.isDefault && (dealItem.type === "drink" || dealItem.type === "burger" || dealItem.type === "pizza")
    }

    // Filter out default items and expand deal items based on quantity
    const expandDealItems = (items: DealItem[], multiplier: number): DealItem[] => {
        const expanded: DealItem[] = []

        items.forEach((item) => {
            // For each deal item, create individual entries based on quantity * multiplier
            for (let i = 0; i < item.quantity * multiplier; i++) {
                expanded.push({
                    ...item,
                    quantity: 1, // Each expanded item has quantity 1
                })
            }
        })

        return expanded
    }

    // Get only non-default items for display
    const getDisplayItems = (items: DealItem[]): DealItem[] => {
        return items.filter((item) => !item.isDefault)
    }

    // Get default items with quantities for summary display
    const getDefaultItemsSummary = (items: DealItem[], dealQuantity: number): { item: string; quantity: number }[] => {
        const defaultItems = items.filter((item) => item.isDefault)
        const summary: { [key: string]: number } = {}

        // Count quantities for each default item type
        defaultItems.forEach((item) => {
            const itemName = item.defaultItem || item.type
            summary[itemName] = (summary[itemName] || 0) + item.quantity * dealQuantity
        })

        // Convert to array format
        return Object.entries(summary).map(([item, quantity]) => ({ item, quantity }))
    }

    // Simplified quantity handlers
    const increaseQuantity = () => {
        console.log("Increasing quantity from", quantity, "to", quantity + 1)
        setQuantity((prev) => prev + 1)
    }

    const decreaseQuantity = () => {
        console.log("Decreasing quantity from", quantity, "to", Math.max(1, quantity - 1))
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    }

    const resetQuantity = () => {
        console.log("Resetting quantity to 1")
        setQuantity(1)
    }

    const toggleExtra = (extra: ExtraItem) => {
        setSelectedExtras((prev) =>
            prev.find((item) => item.title === extra.title)
                ? prev.filter((item) => item.title !== extra.title)
                : [...prev, extra],
        )
    }

    const handleDealItemSelection = (index: number, field: "item" | "flavor", value: string) => {
        setSelectedDealChoices((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                [field]: value,
            },
        }))
    }

    const handleAdd = () => {
        onAddToCart(quantity)
        onClose()
        // Reset will happen when modal opens next time
    }

    const calculateTotalPrice = () => {
        const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0)
        return ((price + extrasTotal) * quantity).toFixed(0)
    }

    const getFlavorOptions = (type: DealItem["type"], selectedItem?: string) => {
        if (type === "drink") {
            const drinkItem = Extras.find((extra) => extra.title === selectedItem)
            return drinkItem?.options || []
        }
        if (type === "burger") {
            // For burgers, we can add size options or preparation styles
            return ["Regular", "Large", "Extra Large"]
        }
        if (type === "pizza") {
            // For pizzas, we can add size options
            return ["Small", "Medium", "Large"]
        }
        return []
    }

    // Main useEffect - only runs when modal opens/closes
    useEffect(() => {
        if (isOpen && !isInitialized.current) {
            console.log("Modal opened for the first time, initializing...")
            // Only reset on first open
            setQuantity(1)
            setSelectedExtras([])
            setSelectedDealChoices({})
            isInitialized.current = true

            if (isDeal && dealItems.length > 0) {
                const expanded = expandDealItems(dealItems, 1)
                setExpandedDealItems(expanded)
            }
        }

        if (isOpen) {
            document.body.style.overflow = "hidden"
            lenis?.stop()
        } else {
            document.body.style.overflow = "auto"
            lenis?.start()
            // Reset initialization flag when modal closes
            isInitialized.current = false
        }

        return () => {
            document.body.style.overflow = "auto"
            lenis?.start()
        }
    }, [isOpen]) // Removed other dependencies that were causing resets

    // Separate effect for deal items expansion when quantity changes
    useEffect(() => {
        if (isDeal && isOpen && dealItems.length > 0 && isInitialized.current) {
            console.log("Updating deal items for quantity:", quantity)
            const expanded = expandDealItems(dealItems, quantity)
            setExpandedDealItems(expanded)
            // Reset selections when quantity changes for deals
            setSelectedDealChoices({})
        }
    }, [quantity, isDeal, dealItems, isOpen])

    // Debug effect to track quantity changes
    useEffect(() => {
        console.log("Quantity changed to:", quantity)
    }, [quantity])

    // Get display and default items
    const displayItems = getDisplayItems(expandedDealItems)
    const defaultItemsSummary = getDefaultItemsSummary(dealItems, quantity)

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
                                <p className="mt-4 text-xl text-yellow-400 font-semibold">Rs. {calculateTotalPrice()}/-</p>

                                {/* Quantity Counter */}
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
                                        <button
                                            onClick={resetQuantity}
                                            className="px-3 py-1 text-sm  bg-red-800 rounded transition-colors"
                                        >
                                            <IoReload size={22} />
                                        </button>
                                    </div>
                                </div>

                                {/* Deal Items Selection - Only show non-default items */}
                                {isDeal && displayItems.length > 0 && (
                                    <div className="mt-4 space-y-4">
                                        <h3 className="font-semibold text-lg text-yellow-400">Customize Your Deal:</h3>
                                        {displayItems.map((dealItem, index) => (
                                            <div key={index} className="border border-gray-600 rounded p-3 space-y-2">
                                                <label className="font-semibold capitalize">
                                                    {dealItem.type} {dealItem.size && `(${dealItem.size})`}:
                                                </label>

                                                {/* Item Selection */}
                                                <select
                                                    className="w-full bg-black border border-gray-500 rounded text-sm px-2 py-1"
                                                    value={selectedDealChoices[index]?.item || ""}
                                                    onChange={(e) => handleDealItemSelection(index, "item", e.target.value)}
                                                >
                                                    <option value="">Select {dealItem.type}</option>
                                                    {getItemOptions(dealItem.type, dealItem.burgerType).map((option, optIndex) => (
                                                        <option key={optIndex} value={option.title}>
                                                            {option.title}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Flavor/Size Selection - Only for drinks, burgers, and pizzas */}
                                                {selectedDealChoices[index]?.item &&
                                                    shouldShowFlavorSelection(dealItem) &&
                                                    getFlavorOptions(dealItem.type, selectedDealChoices[index]?.item).length > 0 && (
                                                        <select
                                                            className="w-full bg-black border border-gray-500 rounded text-sm px-2 py-1"
                                                            value={selectedDealChoices[index]?.flavor || ""}
                                                            onChange={(e) => handleDealItemSelection(index, "flavor", e.target.value)}
                                                        >
                                                            <option value="">Select option</option>
                                                            {getFlavorOptions(dealItem.type, selectedDealChoices[index]?.item).map(
                                                                (flavor, flavorIndex) => (
                                                                    <option key={flavorIndex} value={flavor}>
                                                                        {flavor}
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Default Items Summary - Show what's included by default with quantities */}
                                {isDeal && defaultItemsSummary.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-md text-gray-400 mb-2">Also Includes:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {defaultItemsSummary.map((summary, index) => (
                                                <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm font-medium">
                                                    {summary.quantity}x {summary.item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Combo Option (for non-deals) */}
                                {!isDeal && (
                                    <div className="mt-4 flex flex-col gap-2">
                                        <label className="font-semibold">Meal: </label>
                                        <select className="bg-black border border-gray-500 rounded text-sm px-2 py-1">
                                            <option>{title} + (Fries & Drink) Combo</option>
                                            <option>{title}</option>
                                        </select>
                                    </div>
                                )}

                                {/* Add Button */}
                                <div className="mt-6">
                                    <button
                                        onClick={handleAdd}
                                        className="bg-theme-red hover:bg-yellow-700 text-white font-semibold uppercase px-5 py-2 rounded transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Extras Section */}
                        <div className="p-6 pt-10">
                            <h3 className="text-xl font-semibold">
                                Extras <span className="text-yellow-400">(Optional)</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {Extras.map((extra, index) => {
                                    const isSelected = selectedExtras.find((item) => item.title === extra.title)
                                    return (
                                        <div
                                            key={index}
                                            className={`bg-black p-3 flex items-center justify-between border rounded cursor-pointer ${isSelected ? "border-yellow-400" : "border-gray-600"
                                                }`}
                                            onClick={() => toggleExtra(extra)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={extra.image || "/placeholder.svg"}
                                                    alt={extra.title}
                                                    className="w-10 h-10 object-contain"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm">{extra.title}</span>
                                                    <span className="text-sm text-gray-400">Rs. {extra.price}</span>
                                                </div>
                                            </div>
                                            {extra.options && extra.options?.length > 0 ? (
                                                <select
                                                    className="bg-black border border-gray-600 text-sm px-1 py-1 rounded text-white"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {extra.options.map((opt, i) => (
                                                        <option key={i}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : null}
                                            <div
                                                className={`cursor-pointer transition-colors border px-2 py-1 rounded text-sm ${isSelected
                                                    ? "border-yellow-400 bg-yellow-400 text-black"
                                                    : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                                                    }`}
                                            >
                                                {isSelected ? "✓" : "+"}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ItemDetailsModal
