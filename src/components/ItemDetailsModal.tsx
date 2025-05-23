import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from "react-icons/io"
import { FiMinus, FiPlus } from "react-icons/fi"
import { ExtraItem } from '../utils/menu'
import { useLenis } from 'lenis/react'

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}

const modal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } }
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
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
    isOpen,
    onClose,
    image,
    title,
    desc,
    price,
    onAddToCart,
    Extras
}) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [selectedExtras, setSelectedExtras] = useState<ExtraItem[]>([])
    const lenis = useLenis()

    const handleIncrease = () => setQuantity(prev => prev + 1)
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

    const toggleExtra = (extra: ExtraItem) => {
        setSelectedExtras(prev =>
            prev.find(item => item.title === extra.title)
                ? prev.filter(item => item.title !== extra.title)
                : [...prev, extra]
        )
    }

    const handleAdd = () => {
        onAddToCart(quantity)
        onClose()
        setQuantity(1)
        setSelectedExtras([])
    }

    const calculateTotalPrice = () => {
        const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0)
        return (price + extrasTotal) * quantity
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            lenis?.stop()
        } else {
            lenis?.start()
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
            lenis?.start()
        }
    }, [isOpen])

    return (
        // <ModalPortal>
        <AnimatePresence>


            {isOpen && (
                <motion.div
                    className="fixed  inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div
                        data-lenis-prevent
                        className="bg-black   text-white w-full max-w-5xl  h-[90vh] rounded-xl overflow-y-auto shadow-lg relative"
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute bg-black p-2 top-4 right-4 cursor-pointer text-white hover:text-theme-red transition"
                        >
                            <IoMdClose size={30} />
                        </button>

                        {/* Main Content */}
                        <div className="flex flex-col md:flex-row">
                            {/* Left Image */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto">
                                <img src={image} alt={title} className="w-full h-full object-cover " />
                            </div>

                            {/* Right Details */}
                            <div className="w-full md:w-1/2 flex flex-col justify-start p-6 mt-5">
                                <h2 className="text-4xl font-bebas uppercase">{title}</h2>
                                <p className="mt-2 text-sm text-gray-300">{desc}</p>
                                <p className="mt-4 text-xl text-yellow-400 font-semibold">
                                    Rs. {calculateTotalPrice()}/-
                                </p>

                                {/* Quantity */}
                                <div className="mt-4 flex items-center gap-4">
                                    <span className="font-semibold">Quantity:</span>
                                    <div className="flex items-center border border-gray-500 rounded">
                                        <button onClick={handleDecrease} className="px-3 py-1 hover:text-red-500">
                                            <FiMinus />
                                        </button>
                                        <span className="px-4">{quantity}</span>
                                        <button onClick={handleIncrease} className="px-3 py-1 hover:text-green-500">
                                            <FiPlus />
                                        </button>
                                    </div>
                                </div>

                                {/* Combo Option */}
                                <div className="mt-4 flex flex-col gap-2">
                                    <label className="font-semibold">Meal: </label>
                                    <select className=" bg-black border border-gray-500 rounded text-sm px-2 py-1">
                                        <option>{title} + (Fries & Drink) Combo</option>
                                        <option>{title}</option>
                                    </select>
                                </div>

                                {/* Add Button */}
                                <div className="mt-6">
                                    <button
                                        onClick={handleAdd}
                                        className="bg-theme-red  hover:bg-yellow-700 text-white font-semibold uppercase px-5 py-2 rounded"
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
                                    return (
                                        <div
                                            key={index}
                                            className={`bg-black  p-3   flex items-center justify-between  `}
                                            onClick={() => toggleExtra(extra)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={extra.image} alt={extra.title} className="w-10 h-10 object-contain" />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm">{extra.title}</span>
                                                    <span className="text-sm text-gray-400">Rs. {extra.price}</span>
                                                </div>
                                            </div>
                                            {extra.options && extra.options?.length > 0 ? (
                                                <>
                                                    <select className="bg-black border border-gray-600 text-sm px-1 py-1 rounded text-white">
                                                        {extra.options.map((opt, i) => (
                                                            <option key={i}>{opt}</option>
                                                        ))}
                                                    </select>

                                                </>
                                            ) : null}
                                            <button className="text-yellow-400 cursor-pointer transition-colors border border-yellow-400 hover:bg-yellow-400 hover:text-black px-2 py-1 rounded text-sm">
                                                +
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence >
        // </ModalPortal>
    )
}

export default ItemDetailsModal
