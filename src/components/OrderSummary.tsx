import { CartItem } from "./CartItem"
import { useCartContext } from "../Store/Context/CartContext"
import { type OrderType } from "../pages/CheckOut"
import { FiShoppingBag } from "react-icons/fi"

const OrderSummary = ({ orderType }: { orderType: OrderType }) => {


    const { cart, totalAmount, deliveryCharges, removeFromCart } = useCartContext()


    const subtotal = typeof totalAmount === "number" ? totalAmount : Number.parseFloat(totalAmount.toString()) || 0
    const deliveryFee = orderType === "delivery" ? deliveryCharges : 0
    const finalTotal = subtotal + deliveryFee

    const handleCartRemove = (id: string) => {
        removeFromCart(id)
    }
    return (
        <div className="lg:w-[35%] w-full ">
            <div className="sticky top-8">
                <div className="bg-black rounded-lg p-6">
                    <h2 className="text-2xl font-bebas uppercase mb-4">Order Summary</h2>

                    {cart.length > 0 ? (
                        <>
                            {/* Cart Items */}
                            <div className="max-h-96 overflow-y-auto space-y-4 mb-6">
                                {cart.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        image={item.image}
                                        selectedItems={item.selectedItems}
                                        onRemove={handleCartRemove}
                                        compact={true}
                                    />
                                ))}
                            </div>

                            {/* Order Totals */}
                            <div className="border-t border-gray-700 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                {orderType === "delivery" && (
                                    <div className="flex justify-between text-sm">
                                        <span>Delivery Fee</span>
                                        <span>${deliveryFee.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-2">
                                    <span>Total</span>
                                    <span className="text-yellow-400">${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <FiShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Your cart is empty</p>
                            <p className="text-sm mt-2">Add some items to continue</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
