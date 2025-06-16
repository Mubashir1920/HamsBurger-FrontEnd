"use client"

import type React from "react"

import { createContext, useContext, useState, type ReactNode } from "react"
import CartNotification, { type NotificationData } from "../../components/CartNotification"
import type { CartItem } from "./CartContext"

interface NotificationContextType {
    showNotification: (type: "added" | "removed" | "updated", item: CartItem) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
    children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notification, setNotification] = useState<NotificationData | null>(null)

    const showNotification = (type: "added" | "removed" | "updated", item: CartItem) => {
        const newNotification: NotificationData = {
            id: `${type}-${item.id}-${Date.now()}`,
            type,
            item,
            timestamp: Date.now(),
        }
        setNotification(newNotification)
    }

    const closeNotification = () => {
        setNotification(null)
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <CartNotification notification={notification} onClose={closeNotification} />
        </NotificationContext.Provider>
    )
}

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider")
    }
    return context
}
