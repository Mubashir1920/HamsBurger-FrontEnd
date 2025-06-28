
import { useState } from "react"
import { Extras } from "../utils/menu"
import { useWaiterCartContext } from "../Store/Context/WaiterCartContext"

interface ExtraSelection {
    [key: number]: {
        flavour?: string
        option?: string
        optionPrice?: number
    }
}

const WaiterExtras = () => {
    const [selectedExtras, setSelectedExtras] = useState<ExtraSelection>({})
    const { addToCart } = useWaiterCartContext()

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
        // console.log(cartItem);
        addToCart(cartItem)

        // Optional: Reset the selection for this extra after adding to cart
        setSelectedExtras((prev) => {
            const updated = { ...prev }
            delete updated[extraIndex]
            return updated
        })
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
        <div className=" sm:pt-10 bg-white">
            <div className="space-y-4">
                {Extras.map((extra, index) => {
                    const selection = selectedExtras[index]
                    const isDisabled = isAddDisabled(index)

                    return (
                        <div key={index} className="bg-white border border-black/20 rounded-lg p-4 ">
                            {/* Tablet/Desktop Layout - Horizontal */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-4 w-full">
                                {/* Image + Info */}
                                <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
                                    <img
                                        src={extra.image}
                                        alt={extra.title}
                                        className="w-16 h-16 object-contain rounded-lg"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-semibold text-base text-black truncate">{extra.title}</span>
                                        <span className="text-base text-black font-bold">${getDisplayPrice(index)}</span>
                                    </div>
                                </div>

                                {/* Dropdowns */}
                                <div className="flex flex-col sm:flex-row gap-2 flex-grow min-w-0">
                                    {extra.flavour && extra.flavour?.length > 0 && (
                                        <select
                                            className="w-full sm:flex-1 min-w-0 bg-white border border-black/20 text-sm px-3 py-2 rounded text-black focus:outline-none"
                                            value={selection?.flavour || ""}
                                            onChange={(e) => handleFlavourChange(index, e.target.value)}
                                        >
                                            <option value="" disabled>Select Flavour</option>
                                            {extra.flavour?.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    )}

                                    {extra.options && Object.keys(extra.options).length > 0 && (
                                        <select
                                            className="w-full sm:flex-1 min-w-0 bg-white border border-black/20 text-sm px-3 py-2 rounded text-black focus:outline-none"
                                            value={selection?.option || ""}
                                            onChange={(e) => {
                                                const selectedOption = e.target.value;
                                                const price = extra.options![selectedOption];
                                                handleOptionChange(index, selectedOption, price);
                                            }}
                                        >
                                            <option value="" disabled>Select Option</option>
                                            {Object.entries(extra.options).map(([opt, price], i) => (
                                                <option key={i} value={opt}>
                                                    {opt} - ${price.toFixed(2)}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                {/* Button */}
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={() => handleAddToCart(index)}
                                        disabled={isDisabled}
                                        className={`w-full sm:w-auto px-6 py-2 rounded font-semibold text-sm transition-colors border-2 whitespace-nowrap ${isDisabled
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
                                            : "bg-black text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WaiterExtras
