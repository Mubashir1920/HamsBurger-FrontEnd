

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiX } from "react-icons/hi"
import type { CartItem } from "../Store/Context/CartContext"

export interface NotificationData {
    id: string
    type: "added" | "removed" | "updated"
    item: CartItem
    timestamp: number
}

interface CartNotificationProps {
    notification: NotificationData | null
    onClose: () => void
}

const CartNotification: React.FC<CartNotificationProps> = ({ notification, onClose }) => {
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        if (!notification) return

        // Auto dismiss after 3 seconds
        const timer = setTimeout(() => {
            onClose()
        }, 3000)

        // Progress bar animation
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(progressTimer)
                    return 0
                }
                return prev - 2 // Decrease by 2% every 60ms (3000ms / 50 steps)
            })
        }, 60)

        return () => {
            clearTimeout(timer)
            clearInterval(progressTimer)
        }
    }, [notification, onClose])

    useEffect(() => {
        if (notification) {
            setProgress(100)
        }
    }, [notification])

    if (!notification) return null

    const getMessage = () => {
        switch (notification.type) {
            case "added":
                return `Added ${notification.item.name} to cart`
            case "removed":
                return `Removed ${notification.item.name} from cart`
            case "updated":
                return `Updated ${notification.item.name} quantity`
            default:
                return "Cart updated"
        }
    }

    const getBackgroundColor = () => {
        switch (notification.type) {
            case "added":
                return "bg-green-900/90 border-green-500/50"
            case "removed":
                return "bg-red-900/90 border-red-500/50"
            case "updated":
                return "bg-blue-900/90 border-blue-500/50"
            default:
                return "bg-gray-900/90 border-gray-500/50"
        }
    }

    const getProgressColor = () => {
        switch (notification.type) {
            case "added":
                return "bg-green-400"
            case "removed":
                return "bg-red-400"
            case "updated":
                return "bg-blue-400"
            default:
                return "bg-gray-400"
        }
    }

    return (
        <div className="fixed top-4 right-4 z-50 pointer-events-none">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, x: 300, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 300, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`${getBackgroundColor()} backdrop-blur-sm border rounded-lg shadow-lg max-w-sm pointer-events-auto`}
                >
                    <div className="p-4">
                        <div className="flex items-start gap-3">
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">{getMessage()}</p>

                                        {/* Item details */}
                                        <div className="mt-1 flex items-center gap-2">
                                            {notification.item.image && (
                                                <img
                                                    src={notification.item.image || "/placeholder.svg"}
                                                    alt={notification.item.name}
                                                    className="w-8 h-8 object-cover rounded"
                                                />
                                            )}
                                            <div className="text-xs text-gray-300">
                                                <span className="font-semibold">${notification.item.price.toFixed(2)}</span>
                                                {notification.type !== "removed" && (
                                                    <span className="ml-2">Qty: {notification.item.quantity}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Selected items preview for complex items */}
                                        {notification.item.selectedItems && (
                                            <div className="mt-1 text-xs text-gray-400">
                                                {notification.item.selectedItems.type && (
                                                    <span className="capitalize">{notification.item.selectedItems.type}</span>
                                                )}
                                                {notification.item.selectedItems.mealType && (
                                                    <span className="ml-1 capitalize">({notification.item.selectedItems.mealType})</span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Close button */}
                                    <button
                                        onClick={onClose}
                                        className="flex-shrink-0 cursor-pointer text-gray-400 hover:text-white transition-colors ml-2"
                                    >
                                        <HiX size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
                            <motion.div
                                className={`h-1 rounded-full ${getProgressColor()}`}
                                initial={{ width: "100%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default CartNotification
