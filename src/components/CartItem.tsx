"use client"

import { useState } from "react"
import { FiMinus, FiPlus } from "react-icons/fi"
import { MdDelete } from "react-icons/md"

type CartItemProps = {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
    description?: string
    category?: string
    selectedItems?: {
        type?: string
        name?: string
        quantity?: number
        totalPrice?: string
        sizes?: any[]
        selectedFlavours?: Record<string, string[]>
        defaultItems?: Array<{ name: string; quantity: number }>
        mealType?: string
    }
    onIncrease: (id: string) => void
    onDecrease: (id: string) => void
    onRemove: (id: string) => void
    compact?: boolean // For sidebar vs full page layout
}

export function CartItem({
    id,
    name,
    price,
    quantity,
    image,
    description,
    category,
    selectedItems,
    onIncrease,
    onDecrease,
    onRemove,
    compact = false,
}: CartItemProps) {
    const totalPrice = price * quantity
    const [showDetails, setShowDetails] = useState(false)

    const renderSelectedItems = () => {
        if (!selectedItems) return null

        return (
            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                {/* Pizza sizes */}
                {selectedItems.sizes && selectedItems.sizes.length > 0 && (
                    <div className={`${compact ? "text-[14px]" : "text-sm"}`}>
                        <span className="text-gray-300">Sizes: </span>
                        {selectedItems.sizes.map((size, idx) => (
                            <span key={idx} className="text-yellow-700">
                                {size.name} ({size.description}){idx < selectedItems.sizes!.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </div>
                )}

                {/* Meal type for burgers */}
                {selectedItems.mealType && (
                    <div className={`${compact ? "text-[14px]" : "text-sm"}`}>
                        <span className="text-gray-300">Meal: </span>
                        <span className="text-yellow-700 capitalize">{selectedItems.mealType}</span>
                    </div>
                )}

                {/* Deal flavours */}
                {selectedItems.selectedFlavours && Object.keys(selectedItems.selectedFlavours).length > 0 && (
                    <div className={`${compact ? "text-[14px]" : "text-sm"}`}>
                        <span className="text-gray-300">Selections: </span>
                        <div className="ml-2 space-y-1">
                            {Object.entries(selectedItems.selectedFlavours).map(([idx, flavours]) => (
                                <div key={idx} className="text-yellow-700">
                                    {flavours.join(", ")}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Default items for deals */}
                {selectedItems.defaultItems && selectedItems.defaultItems.length > 0 && (
                    <div className={`${compact ? "text-[14px]" : "text-sm"}`}>
                        <span className="text-gray-300">Includes: </span>
                        <span className="text-yellow-700">
                            {selectedItems.defaultItems.map((item, idx) => (
                                <span key={idx}>
                                    {item.quantity}x {item.name}
                                    {idx < selectedItems.defaultItems!.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </span>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div
            className={`w-full bg-black scroll-smooth font-bebas text-white border border-white/20 rounded-2xl  ${compact ? "p-3" : "p-4"
                }`}
        >
            <div className={`flex gap-4  ${compact ? "flex-col sm:flex-row" : "flex-row"}`}>
                {/* Food Image */}
                <div className={`flex-shrink-0 ${compact ? "w-full sm:w-20 h-20" : "w-24 h-24"}`}>
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        width={compact ? 80 : 96}
                        height={compact ? 80 : 96}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

                {/* Food Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                            <h3 className={`  tracking-wide text-wrap w-[80%]  ${compact ? "text-[24px] " : "text-base"}`}>{name}</h3>

                            <div className={`text-yellow-700  ${compact ? "text-[20px] " : "text-lg"} mt-2`}>${price.toFixed(2)}</div>

                            {/* Show details toggle for complex items */}
                            {selectedItems && (
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className={`text-blue-400 hover:text-blue-300 mt-1 underline ${compact ? "text-[12px]" : "text-xs"}`}
                                >
                                    {showDetails ? "Hide details" : "Show details"}
                                </button>
                            )}
                        </div>

                        {/* Remove button */}
                        <button
                            onClick={() => onRemove(id)}
                            className="text-red-800 hover:text-yellow-700 transition-colors duration-300 p-1 h-auto ml-2"
                        >
                            <MdDelete className={"cursor-pointer  h-5 w-5"} />
                            <span className="sr-only">Remove item</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Selected Items Details */}
            {showDetails && renderSelectedItems()}

            {/* Quantity Controls and Total */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-3">
                {/* Quantity Controls */}
                <div className="flex items-center  space-x-3">
                    <span className={` ${compact ? "text-[16px] " : "text-base"}`}>Qty:</span>
                    <div className="flex items-center gap-5 px-3">
                        <button onClick={() => onDecrease(id)} disabled={quantity <= 1}>
                            <FiMinus className="cursor-pointer" size={compact ? 18 : 25} />
                            <span className="sr-only">Decrease quantity</span>
                        </button>

                        <span className={`min-w-[2rem] text-center text-sm `}>{quantity}</span>

                        <button onClick={() => onIncrease(id)}>
                            <FiPlus className="cursor-pointer" size={compact ? 18 : 25} />
                            <span className="sr-only">Increase quantity</span>
                        </button>
                    </div>
                </div>

                {/* Total Price */}
                <div className={` text-yellow-700 text-xl`}>${totalPrice.toFixed(2)}</div>
            </div>
        </div>
    )
}
