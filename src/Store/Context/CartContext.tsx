"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import reducer from "../reducer/CartReducer"

// Define the shape of a cart item
export type CartItem = {
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
}

// Define the shape of the cart state
type CartState = {
  cart: CartItem[]
  totalItem: number | string
  totalAmount: number | string
  deliveryCharges: number
}

// Define the context type
interface CartContextType extends CartState {
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const initialState: CartState = {
  cart: [],
  totalItem: 0,
  totalAmount: 0,
  deliveryCharges: 10,
}

type CartProviderProps = {
  children: ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: { item } })
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCartContext = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}

export { CartProvider, useCartContext }
