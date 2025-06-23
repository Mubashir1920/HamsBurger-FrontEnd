
import type React from "react"

import { useEffect, useState, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoMdClose } from "react-icons/io"
import { IoReload } from "react-icons/io5"
import { FiMinus, FiPlus } from "react-icons/fi"
import { MdKeyboardArrowDown } from "react-icons/md"



import type { DealItem, SizeOption } from "../utils/menu"
import { Flavours } from "../utils/menu"
import { useWaiterCartContext } from "../Store/Context/WaiterCartContext"

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}

const modal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
}


interface WaiterItemDetailsModalProps {
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

interface SelectedDealData {
    selectedFlavours: Record<number, string[]>
    defaultItems: Array<{ name: string; quantity: number }>
}

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    selectedItems: any
}


// Custom Select Component
interface CustomSelectProps {
    value: string
    onChange: (value: string) => void
    placeholder: string
    options: Array<{ value: string; label: string }>
    disabled?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, placeholder, options, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md  focus:outline-none  flex items-center justify-between ${disabled ? "bg-gray-100 cursor-not-allowed" : "hover:border-gray-400"
                    }`}
            >
                <span className={value ? "text-gray-900" : "text-gray-500"}>
                    {value ? options.find((opt) => opt.value === value)?.label : placeholder}
                </span>
                <MdKeyboardArrowDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

const WaiterItemDetailsModal: React.FC<WaiterItemDetailsModalProps> = ({
    isOpen,
    onClose,
    image,
    title,
    desc,
    price,
    sizes,
    category,
    dealItems = [],
}) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [mealtype, setMealType] = useState<string>("simple")
    const [pizzaSizes, setPizzaSizes] = useState<(SizeOption | null)[]>([])
    const [selectedDealData, setSelectedDealData] = useState<SelectedDealData>({
        selectedFlavours: {},
        defaultItems: [],
    })

    const { addToCart } = useWaiterCartContext()
    const isInitialized = useRef(false)

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
        let selectedItems: any = {}

        if (category === "Pizza") {
            selectedItems = {
                type: "Pizza",
                name: title,
                sizes: pizzaSizes.filter((size): size is SizeOption => size !== null),
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

        const itemToAdd: CartItem = {
            id: title + "-" + Math.random().toString(36).slice(2, 5),
            name: title,
            price: Number.parseFloat(calculateTotalPrice()),
            quantity,
            image,
            selectedItems,
        }

        addToCart(itemToAdd)
        onClose()
    }

    const calculateTotalPrice = (): string => {
        let finalPrice = 0

        if (category === "Pizza") {
            finalPrice = pizzaSizes.reduce((total, size) => {
                return total + (size?.price || 0)
            }, 0)
        } else if (category === "Deals") {
            finalPrice = price * quantity
        } else {
            finalPrice = (mealtype === "combo" ? price + 3.99 : price) * quantity
        }

        return finalPrice.toFixed(2)
    }

    const isAddToCartDisabled = useMemo(() => {
        if (category === "Pizza") {
            return pizzaSizes.length !== quantity || pizzaSizes.some((size) => !size)
        }

        if (category === "Deals" && dealItems.length > 0) {
            const nonDefaultItems = dealItems.filter((item) => !item.isDefault)

            for (let i = 0; i < nonDefaultItems.length; i++) {
                const item = nonDefaultItems[i]
                const requiredSelections = item.quantity * quantity
                const currentSelections = selectedDealData.selectedFlavours[i] || []

                if (currentSelections.length !== requiredSelections || currentSelections.some((selection) => !selection)) {
                    return true
                }
            }
        }

        return false
    }, [category, pizzaSizes, quantity, selectedDealData.selectedFlavours, dealItems])

    useEffect(() => {
        if (isOpen && dealItems.length > 0) {
            const defaultItems = dealItems
                .filter((item) => item.isDefault)
                .map((item) => ({
                    name: item.defaultItem || item.type,
                    quantity: item.quantity * quantity,
                }))

            setSelectedDealData((prev) => ({
                ...prev,
                defaultItems,
            }))
        }
    }, [isOpen, dealItems, quantity])

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen && !isInitialized.current) {
            setQuantity(1)
            setMealType("simple")
            setPizzaSizes([])
            setSelectedDealData((prev) => ({
                selectedFlavours: {},
                defaultItems: prev.defaultItems,
            }))
            document.addEventListener("keyup", handleEsc)
            isInitialized.current = true
        }

        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"

            if (isInitialized.current) {
                setQuantity(1)
                setMealType("simple")
                setPizzaSizes([])
                setSelectedDealData({
                    selectedFlavours: {},
                    defaultItems: [],
                })
                isInitialized.current = false
            }
        }

        return () => {
            document.body.style.overflow = "auto"
            document.removeEventListener("keyup", handleEsc)
        }
    }, [isOpen, onClose])

    useEffect(() => {
        if (category === "Pizza") {
            setPizzaSizes(Array(quantity).fill(null))
        }
    }, [quantity, category])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        data-lenis-prevent
                        className="bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[95vh] rounded-lg overflow-hidden shadow-xl relative"
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 cursor-pointer z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                        >
                            <IoMdClose className="h-5 w-5 text-gray-600 " />
                        </button>

                        <div className="overflow-y-auto max-h-[95vh]">
                            {/* Image Section */}
                            <div className="w-full h-48 sm:h-56 md:h-64 relative">
                                <img
                                    src={image || "/placeholder.svg?height=256&width=400"}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-4 sm:p-6 space-y-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
                                    <p className="mt-1 text-sm text-gray-600">{desc}</p>
                                    <motion.p
                                        key={calculateTotalPrice()}
                                        initial={{ x: 0.8, opacity: 0 }}
                                        animate={{ x: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-2 text-lg sm:text-xl font-semibold text-red-800"
                                    >
                                        ${calculateTotalPrice()}
                                    </motion.p>
                                </div>

                                {/* Quantity Section */}
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-700">Quantity:</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                                <button
                                                    onClick={decreaseQuantity}
                                                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                >
                                                    <FiMinus className="h-3 w-3 text-gray-600" />
                                                </button>
                                                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
                                                <button
                                                    onClick={increaseQuantity}
                                                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                >
                                                    <FiPlus className="h-3 w-3 text-gray-600" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={resetQuantity}
                                                className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors"
                                            >
                                                <IoReload className="h-3 w-3 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Meal Type Selection */}
                                {category !== "Pizza" && category !== "Deals" && (
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Meal Type:</label>
                                            <CustomSelect
                                                value={mealtype}
                                                onChange={setMealType}
                                                placeholder="Select meal type"
                                                options={[
                                                    { value: "simple", label: title },
                                                    { value: "combo", label: `${title} + (Fries & Drink) Combo` },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Pizza Size Selection */}
                                {category === "Pizza" && (
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-gray-700">Size Selection:</label>
                                            {Array.from({ length: quantity }).map((_, idx) => (
                                                <CustomSelect
                                                    key={idx}
                                                    value={pizzaSizes[idx] ? JSON.stringify(pizzaSizes[idx]) : ""}
                                                    onChange={(value) => {
                                                        const selected = JSON.parse(value) as SizeOption
                                                        setPizzaSizes((prev) => {
                                                            const updated = [...prev]
                                                            updated[idx] = selected
                                                            return updated
                                                        })
                                                    }}
                                                    placeholder={`Select Size ${quantity > 1 ? `(${idx + 1})` : ""}`}
                                                    options={
                                                        sizes?.map((size) => ({
                                                            value: JSON.stringify(size),
                                                            label: `${size.name} (${size.description}) — $${size.price}`,
                                                        })) || []
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Deal Items Selection */}
                                {category === "Deals" && dealItems.length > 0 && (
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium text-gray-700">Deal Customization:</label>

                                            {dealItems
                                                .filter((item) => !item.isDefault)
                                                .map((dealItem, idx) => {
                                                    let availableFlavours: string[] = []

                                                    if (dealItem.type === "burger" && dealItem.burgerType) {
                                                        availableFlavours =
                                                            dealItem.burgerType === "chicken"
                                                                ? Flavours.chickenBurger || []
                                                                : Flavours.beefBurger || []
                                                    } else if (dealItem.type === "pizza") {
                                                        availableFlavours = Flavours.pizza || []
                                                    } else if (dealItem.type === "drink") {
                                                        availableFlavours = Flavours.drinks || []
                                                    }

                                                    return (
                                                        <div key={`nonDefault-${idx}`} className="space-y-2">
                                                            <p className="text-sm font-medium text-gray-600 capitalize">
                                                                {dealItem.quantity} x {dealItem.type}
                                                            </p>

                                                            {Array.from({ length: dealItem.quantity * quantity }).map((_, i) => (
                                                                <CustomSelect
                                                                    key={`${idx}-${i}`}
                                                                    value={selectedDealData.selectedFlavours[idx]?.[i] || ""}
                                                                    onChange={(value) => {
                                                                        setSelectedDealData((prev) => {
                                                                            const current = { ...prev.selectedFlavours }
                                                                            const selections = current[idx] ? [...current[idx]] : []
                                                                            selections[i] = value

                                                                            return {
                                                                                ...prev,
                                                                                selectedFlavours: {
                                                                                    ...current,
                                                                                    [idx]: selections,
                                                                                },
                                                                            }
                                                                        })
                                                                    }}
                                                                    placeholder={`Select ${dealItem.type} ${dealItem.quantity > 1 ? `(${i + 1})` : ""}`}
                                                                    options={availableFlavours.map((flavour) => ({
                                                                        value: flavour,
                                                                        label: flavour,
                                                                    }))}
                                                                />
                                                            ))}
                                                        </div>
                                                    )
                                                })}

                                            {/* Default Items Display */}
                                            <div className="flex flex-wrap gap-2">
                                                {dealItems
                                                    .filter((item) => item.isDefault)
                                                    .map((dealItem, idx) => (
                                                        <span
                                                            key={`default-${idx}`}
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                        >
                                                            {dealItem.defaultItem
                                                                ? `${dealItem.quantity * quantity} x ${dealItem.defaultItem}`
                                                                : `${dealItem.type} x ${dealItem.quantity * quantity}`}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAdd}
                                    disabled={isAddToCartDisabled}
                                    className="w-full bg-black cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default WaiterItemDetailsModal
