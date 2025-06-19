
import { createContext, useContext, useReducer, useState, type ReactNode } from "react"
import reducer from "../reducer/CartReducer"
import { useNotification } from "./NotificationContext"

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
  active: boolean,
  setActive: (active: boolean) => void
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

  const [active, setActive] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { showNotification } = useNotification()

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: { item } })
    showNotification("added", item)
  }

  const removeFromCart = (id: string) => {
    const item = state.cart.find((cartItem) => cartItem.id === id)
    if (item) {
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } })
      showNotification("removed", item)
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    const item = state.cart.find((cartItem) => cartItem.id === id)
    if (item) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
      showNotification("updated", { ...item, quantity })
    }
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
        active,
        setActive,
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
