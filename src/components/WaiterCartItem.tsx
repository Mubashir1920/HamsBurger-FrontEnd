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
        quantity?: number
        totalPrice?: string
        sizes?: any[]
        selectedFlavours?: Record<string, string[]>
        defaultItems?: Array<{ name: string; quantity: number }>
        mealType?: string
    }
    onRemove: (id: string) => void
}

export function WaiterCartItem({
    id,
    name,
    price,
    quantity,
    image,
    selectedItems,
    onRemove,
}: CartItemProps) {
    const [showDetails, setShowDetails] = useState(false)

    const renderSelectedItems = () => {
        if (!selectedItems) return null

        return (
            <div className="mt-3 pt-3 font-poppin  border-t border-gray-200  text-sm text-black/60 ">
                {selectedItems.sizes?.length > 0 && (
                    <div>
                        <span >Sizes: </span>
                        {selectedItems.sizes.map((size, idx) => (
                            <span key={idx} >
                                {size.name} ({size.description})
                                {idx < selectedItems.sizes.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </div>
                )}

                {selectedItems.mealType === "combo" && (
                    <div>
                        <span >Meal: </span>
                        <span >Fries + Drink 500ml (Combo)</span>
                    </div>
                )}

                {selectedItems.selectedFlavours && Object.keys(selectedItems.selectedFlavours).length > 0 && (
                    <div className="flex flex-wrap">
                        <span >Selections: </span>
                        <div className="ml-2 space-y-1">
                            {Object.entries(selectedItems.selectedFlavours).map(([key, flavours]) => (
                                <div className="inline-block mx-1" key={key} >
                                    {flavours.join(", ")}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedItems.defaultItems?.length > 0 && (
                    <div>
                        <span >Includes: </span>
                        <span >
                            {selectedItems.defaultItems.map((item, idx) => (
                                <span key={idx}>
                                    {item.quantity}x {item.name}
                                    {idx < selectedItems.defaultItems.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </span>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="w-full bg-white rounded-xl  border border-gray-200 p-4 transition-all">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Image */}
                <div className="flex-shrink-0 w-full sm:w-24 h-24">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover rounded-xl border border-gray-100"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 ">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg  text-gray-800">
                                {quantity} x {name}
                            </h3>
                            <div className="  text-base mt-1">
                                ${price.toFixed(2)}
                            </div>
                            {selectedItems && (
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className="text-[16px] mt-1  underline hover:"
                                >
                                    {showDetails ? "Hide details" : "Show details"}
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => onRemove(id)}
                            className=" cursor-pointer text-black p-1"
                            title="Remove item"
                        >
                            <MdDelete size={20} />
                        </button>
                    </div>

                    {/* Detail Section */}
                    {showDetails && renderSelectedItems()}
                </div>
            </div>
        </div>
    )
}
