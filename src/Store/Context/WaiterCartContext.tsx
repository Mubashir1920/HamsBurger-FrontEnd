
import { createContext, useContext, useReducer, useState, type ReactNode } from "react"
import reducer from "../reducer/WaiterCartReducer"

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
        flavour?: string
        option?: string
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

const WaiterCartContext = createContext<CartContextType | undefined>(undefined)

const initialState: CartState = {
    cart: [],
    totalItem: 0,
    totalAmount: 0,
}

type CartProviderProps = {
    children: ReactNode
}

const WaiterCartProvider: React.FC<CartProviderProps> = ({ children }) => {

    const [active, setActive] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: { item } })
    }

    const removeFromCart = (id: string) => {
        const item = state.cart.find((cartItem) => cartItem.id === id)
        if (item) {
            dispatch({ type: "REMOVE_FROM_CART", payload: { id } })
        }
    }

    const updateQuantity = (id: string, quantity: number) => {
        const item = state.cart.find((cartItem) => cartItem.id === id)
        if (item) {
            dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
        }
    }

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    return (
        <WaiterCartContext.Provider
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
        </WaiterCartContext.Provider>
    )
}

const useWaiterCartContext = (): CartContextType => {
    const context = useContext(WaiterCartContext)
    if (!context) {
        throw new Error("useWaiterCartContext = (): CartContextType => {must be used within a WaiterCartProvider")
    }
    return context
}

export { WaiterCartProvider, useWaiterCartContext }
