
import { useState } from "react"
import { Extras } from "../utils/menu"
import { useCartContext } from "../Store/Context/CartContext"

interface ExtraSelection {
    [key: number]: {
        flavour?: string
        option?: string
        optionPrice?: number
    }
}

const ExtraItems = () => {
    const [selectedExtras, setSelectedExtras] = useState<ExtraSelection>({})
    const { addToCart } = useCartContext()

    const handleFlavourChange = (extraIndex: number, flavour: string) => {
        setSelectedExtras((prev) => ({
            ...prev,
            [extraIndex]: {
                ...prev[extraIndex],
                flavour,
            },
        }))
    }

    const handleOptionChange = (extraIndex: number, option: string, price: number) => {
        setSelectedExtras((prev) => ({
            ...prev,
            [extraIndex]: {
                ...prev[extraIndex],
                option,
                optionPrice: price,
            },
        }))
    }

    const handleAddToCart = (extraIndex: number) => {
        const extra = Extras[extraIndex]
        const selection = selectedExtras[extraIndex]

        // Determine the final price
        let finalPrice = extra.price
        let itemName = extra.title

        // If there's an option selected with a different price, use that
        if (selection?.optionPrice !== undefined) {
            finalPrice = selection.optionPrice
            itemName = `${extra.title} (${selection.option})`
        }

        // Create the cart item
        const cartItem = {
            id: `extra-${extraIndex}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: itemName,
            price: finalPrice,
            quantity: 1,
            image: extra.image,
            category: "Extra",
            selectedItems: {
                type: "Extra",
                name: extra.title,
                quantity: 1,
                totalPrice: finalPrice.toFixed(2),
                flavour: selection?.flavour,
                option: selection?.option,
            },
        }

        addToCart(cartItem)

        // Optional: Reset the selection for this extra after adding to cart
        setSelectedExtras((prev) => {
            const updated = { ...prev }
            delete updated[extraIndex]
            return updated
        })

        // Optional: Show a brief success indication
        // You could add a toast notification here
    }

    const getDisplayPrice = (extraIndex: number) => {
        const extra = Extras[extraIndex]
        const selection = selectedExtras[extraIndex]

        if (selection?.optionPrice !== undefined) {
            return selection.optionPrice.toFixed(2)
        }

        return extra.price.toFixed(2)
    }

    const isAddDisabled = (extraIndex: number) => {
        const extra = Extras[extraIndex]
        const selection = selectedExtras[extraIndex]

        // If extra has flavours but none selected
        if (extra.flavour && extra.flavour.length > 0 && !selection?.flavour) {
            return true
        }

        // If extra has options but none selected
        if (extra.options && Object.keys(extra.options).length > 0 && !selection?.option) {
            return true
        }

        return false
    }

    return (
        <div className="p-6 pt-10">
            <h3 className="text-xl font-semibold">
                Extras <span className="text-yellow-400">(Optional)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {Extras.map((extra, index) => {
                    const selection = selectedExtras[index]
                    const isDisabled = isAddDisabled(index)

                    return (
                        <div
                            key={index}
                            className={`bg-black p-4 flex flex-col gap-3 border border-white/20 rounded transition-all hover:border-yellow-400/50`}
                        >
                            {/* Top Section: Image + Info */}
                            <div className="flex items-center gap-3">
                                <img src={extra.image || "/placeholder.svg"} alt={extra.title} className="w-12 h-12 object-contain" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-white">{extra.title}</span>
                                    <span className="text-sm text-yellow-400 font-semibold">${getDisplayPrice(index)}</span>
                                </div>
                            </div>

                            {/* Dropdowns */}
                            <div className="flex gap-2 w-full">
                                {extra.flavour && extra.flavour.length > 0 && (
                                    <select
                                        className="bg-black border border-gray-600 text-sm px-2 py-1 rounded text-white w-full"
                                        value={selection?.flavour || ""}
                                        onChange={(e) => handleFlavourChange(index, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option value="" disabled>
                                            Select Flavour
                                        </option>
                                        {extra.flavour.map((opt, i) => (
                                            <option key={i} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {extra.options && Object.keys(extra.options).length > 0 && (
                                    <select
                                        className="bg-black border border-gray-600 text-sm px-2 py-1 rounded text-white w-full"
                                        value={selection?.option || ""}
                                        onChange={(e) => {
                                            const selectedOption = e.target.value
                                            const price = extra.options![selectedOption]
                                            handleOptionChange(index, selectedOption, price)
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option value="" disabled>
                                            Select Option
                                        </option>
                                        {Object.entries(extra.options).map(([opt, price], i) => (
                                            <option key={i} value={opt}>
                                                {opt} - ${price.toFixed(2)}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => handleAddToCart(index)}
                                disabled={isDisabled}
                                className={`w-full text-center px-2 py-1 rounded text-sm font-semibold transition-colors ${isDisabled
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    : "bg-yellow-700 hover:bg-yellow-600 text-white cursor-pointer"
                                    }`}
                            >
                                Add to Cart
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExtraItems
