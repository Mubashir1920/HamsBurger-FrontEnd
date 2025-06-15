
import { Extras } from "../utils/menu"


const ExtraItems = () => {
    return (
        <div className="p-6 pt-10">
            <h3 className="text-xl font-semibold">
                Extras <span className="text-yellow-400">(Optional)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {Extras.map((extra, index) => {
                    return (
                        <div
                            key={index}
                            className={`bg-black p-4 flex flex-col gap-3 border border-white/20 rounded cursor-pointer transition-all `}
                        >
                            {/* Top Section: Image + Info */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={extra.image || "/placeholder.svg"}
                                    alt={extra.title}
                                    className="w-12 h-12 object-contain"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-white">{extra.title}</span>
                                    <span className="text-sm text-gray-400">${extra.price.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Dropdowns */}
                            <div className="flex gap-2 w-full">
                                {extra.flavour && extra.flavour.length > 0 && (
                                    <select
                                        className="bg-black border border-gray-600 text-sm px-2 py-1 rounded text-white w-full"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {extra.flavour.map((opt, i) => (
                                            <option key={i}>{opt}</option>
                                        ))}
                                    </select>
                                )}

                                {extra.options && Object.keys(extra.options).length > 0 && (
                                    <select
                                        className="bg-black border border-gray-600 text-sm px-2 py-1 rounded text-white w-full"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {Object.entries(extra.options).map(([opt, price], i) => (
                                            <option key={i} value={opt}>
                                                {opt} - ${price.toFixed(2)}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Action Button */}
                            <div
                                className={`w-full bg-yellow-700 text-center  px-2 py-1 rounded text-sm font-semibold `}
                            >
                                Add to Cart
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default ExtraItems
