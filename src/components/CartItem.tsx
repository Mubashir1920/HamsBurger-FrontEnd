
import { useState } from "react"
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
        flavour?: string
        option?: string
        quantity?: number
        totalPrice?: string
        sizes?: any[]
        selectedFlavours?: Record<string, string[]>
        defaultItems?: Array<{ name: string; quantity: number }>
        mealType?: string
    }
    onRemove: (id: string) => void
    compact?: boolean // For sidebar vs full page layout
}

export function CartItem({
    id,
    name,
    price,
    quantity,
    image,
    selectedItems,
    onRemove,
    compact = false,
}: CartItemProps) {

    const [showDetails, setShowDetails] = useState(false)

    const renderSelectedItems = () => {
        if (!selectedItems) return null

        return (
            <div className="mt-3 pt-3 text-sm font-poppin border-t border-white/10 space-y-2">
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
                {selectedItems.mealType && selectedItems.mealType == 'combo' && (
                    <div className={`${compact ? "text-[14px]" : "text-sm"}`}>
                        <span className="text-gray-300">Meal: </span>
                        <span className="text-yellow-700 capitalize">
                            Fries + Drink 500ml (Combo)
                        </span>
                    </div>
                )}

                {/* For Extras */}
                {selectedItems.flavour && (
                    <div>
                        <span >Flavour: </span>
                        <span >{selectedItems.flavour}</span>
                    </div>
                )}
                {selectedItems.option && (
                    <div>
                        <span >Option: </span>
                        <span >{selectedItems.option}</span>
                    </div>
                )}

                {/* Deal flavours */}
                {selectedItems.selectedFlavours && Object.keys(selectedItems.selectedFlavours).length > 0 && (
                    <div className={` flex ${compact ? "text-[14px]" : "text-sm"}`}>
                        <span className="text-gray-300">Selections: </span>
                        <div className="ml-2 flex space-y-1">
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
                        src={image}
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
                            <h3 className={` text-wrap w-[80%]  ${compact ? "text-[24px] " : "text-base"}`}>{quantity} x {name}</h3>

                            <div className={`text-yellow-700  ${compact ? "text-[20px] " : "text-lg"} mt-2`}>${price.toFixed(2)}</div>

                            {/* Show details toggle for complex items */}
                            {selectedItems?.mealType === 'combo' || selectedItems?.flavour || selectedItems?.option
                                || (selectedItems?.selectedFlavours && Object.keys(selectedItems.selectedFlavours).length > 0)
                                || (selectedItems?.defaultItems && selectedItems.defaultItems.length > 0) ||
                                (selectedItems?.sizes && selectedItems.sizes.length > 0) ? (
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className={`mt-1 cursor-pointer underline text-sm tracking-wide ${compact ? "text-[14px]" : "text-sm"}`}
                                >
                                    {showDetails ? "Hide details" : "Show details"}
                                </button>
                            ) : null}

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
        </div>
    )
}
