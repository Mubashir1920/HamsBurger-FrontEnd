import type { CartItem } from "../Context/CartContext"

// Define the Cart State type
export interface CartState {
    cart: CartItem[]
    totalItem: number | string
    totalAmount: number | string
    deliveryCharges: number
}

// Define possible action types
export type CartAction =
    | { type: "ADD_TO_CART"; payload: { item: CartItem } }
    | { type: "REMOVE_FROM_CART"; payload: { id: string } }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR_CART" }
// Add more actions as needed in the future

// Helper function to generate a unique identifier for cart items
const generateCartItemKey = (item: CartItem): string => {
    let key = `${item.name}-${item.price}`

    if (item.selectedItems) {
        const { selectedItems } = item

        // Add type-specific identifiers
        if (selectedItems.type) {
            key += `-${selectedItems.type}`
        }

        // For pizzas, include size information
        if (selectedItems.sizes && selectedItems.sizes.length > 0) {
            const sizeInfo = selectedItems.sizes
                .map((size) => `${size.name}-${size.price}`)
                .sort()
                .join("|")
            key += `-sizes:${sizeInfo}`
        }

        // For deals, include flavour selections
        if (selectedItems.selectedFlavours) {
            const flavourInfo = Object.entries(selectedItems.selectedFlavours)
                .map(([idx, flavours]) => `${idx}:${flavours.sort().join(",")}`)
                .sort()
                .join("|")
            key += `-flavours:${flavourInfo}`
        }

        // For burgers, include meal type
        if (selectedItems.mealType) {
            key += `-meal:${selectedItems.mealType}`
        }
    }

    return key
}

// Helper function to check if two items are identical
const areItemsIdentical = (item1: CartItem, item2: CartItem): boolean => {
    return generateCartItemKey(item1) === generateCartItemKey(item2)
}

// Reducer function
const CartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const { item } = action.payload

            // Check if an identical item already exists (same configuration)
            const existingItemIndex = state.cart.findIndex((cartItem) => areItemsIdentical(cartItem, item))

            let updatedCart

            if (existingItemIndex !== -1) {
                // If identical item exists, update its quantity
                updatedCart = state.cart.map((cartItem, index) =>
                    index === existingItemIndex ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
                )
            } else {
                // Else, add new item with a unique ID
                const newItem = {
                    ...item,
                    id: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                }
                updatedCart = [...state.cart, newItem]
            }

            // Calculate totals
            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0)
            const totalAmount = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)

            return {
                ...state,
                cart: updatedCart,
                totalItem: totalItems,
                totalAmount: Number(totalAmount.toFixed(2)),
            }
        }

        case "REMOVE_FROM_CART": {
            const { id } = action.payload
            const updatedCart = state.cart.filter((item) => item.id !== id)

            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0)
            const totalAmount = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)

            return {
                ...state,
                cart: updatedCart,
                totalItem: totalItems,
                totalAmount: Number(totalAmount.toFixed(2)),
            }
        }

        case "UPDATE_QUANTITY": {
            const { id, quantity } = action.payload

            if (quantity <= 0) {
                // If quantity is 0 or less, remove the item
                return CartReducer(state, { type: "REMOVE_FROM_CART", payload: { id } })
            }

            const updatedCart = state.cart.map((item) => (item.id === id ? { ...item, quantity } : item))

            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0)
            const totalAmount = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)

            return {
                ...state,
                cart: updatedCart,
                totalItem: totalItems,
                totalAmount: Number(totalAmount.toFixed(2)),
            }
        }

        case "CLEAR_CART": {
            return {
                ...state,
                cart: [],
                totalItem: 0,
                totalAmount: 0,
            }
        }

        default:
            return state
    }
}

export default CartReducer
