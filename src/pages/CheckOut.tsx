
import { useState } from "react"
import { FiTruck, FiShoppingBag } from "react-icons/fi"
import { useCartContext } from "../Store/Context/CartContext"
import OrderSummary from "../components/OrderSummary"
import DeliveryForm from "../components/DeliveryForm"
import TakeAwayForm from "../components/TakeAwayForm"
import PaymentForm from "../components/PaymentForm"
import Toast from "../components/Toast"

export type OrderType = "delivery" | "takeaway"
type PaymentMethod = "cod" | "bank" | "card"


type PaymentFormData = {
    method: PaymentMethod
    // Card details
    cardNumber: string
    expiryDate: string
    cvv: string
    cardName: string
    // Bank transfer details
    bankName: string
    accountNumber: string
}


type TakeawayFormData = {
    fullName: string
    email: string
    phone: string
    pickupTime: string
    instructions: string
}

type DeliveryFormData = {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    instructions: string
}

const CheckoutPage = () => {
    const [orderType, setOrderType] = useState<OrderType>("delivery")
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")
    const [isToast, setIsToast] = useState<boolean>(false)

    const [takeawayForm, setTakeawayForm] = useState<TakeawayFormData>({
        fullName: "",
        email: "",
        phone: "",
        pickupTime: "",
        instructions: "",
    })

    const [deliveryForm, setDeliveryForm] = useState<DeliveryFormData>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        instructions: "",
    })

    const resetForms = () => {
        setTakeawayForm({
            fullName: "",
            email: "",
            phone: "",
            pickupTime: "",
            instructions: "",
        })
        setDeliveryForm({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
            instructions: "",
        })
    }


    const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
        method: "cod",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardName: "",
        bankName: "",
        accountNumber: "",
    })

    const { cart, totalAmount, deliveryCharges, clearCart } = useCartContext()

    const subtotal = typeof totalAmount === "number" ? totalAmount : Number.parseFloat(totalAmount.toString()) || 0
    const deliveryFee = orderType === "delivery" ? deliveryCharges : 0
    const finalTotal = subtotal + deliveryFee

    const handleSubmitOrder = () => {
        // Handle order submission logic here
        console.log("Order submitted:", {
            orderType,
            deliveryForm: orderType === "delivery" ? deliveryForm : null,
            takeawayForm: orderType === "takeaway" ? takeawayForm : null,
            paymentForm,
            cart,
            total: finalTotal,
        })
        // Show success toast
        setIsToast(true)
        // Reset forms after submission
        resetForms()
        //Clear Cart
        clearCart()
    }

    const isFormValid = () => {
        if (orderType === "delivery") {
            return (
                deliveryForm.fullName && deliveryForm.email && deliveryForm.phone && deliveryForm.address && deliveryForm.city && deliveryForm.postalCode
            )
        } else if (orderType === "takeaway") {
            return takeawayForm.fullName && takeawayForm.email && takeawayForm.phone && takeawayForm.pickupTime
        } else {

            return paymentForm.method === "card" && paymentForm.cardNumber && paymentForm.expiryDate && paymentForm.cvv && paymentForm.cardName

        }
    }

    return (
        <div className="min-h-screen  text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl mb-5 md:text-6xl font-bebas uppercase">CHECKOUT</h1>
                <div className="flex flex-col-reverse justify-between lg:flex-row gap-8">
                    {/* Left Side - Forms */}
                    <div className="w-full lg:w-[65%] space-y-8">
                        {/* Order Type Tabs */}
                        <div className="bg-black rounded-lg p-6">
                            <h2 className="text-2xl font-bebas uppercase mb-4">Order Type</h2>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setOrderType("delivery")}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${orderType === "delivery"
                                        ? "bg-yellow-700 text-white"
                                        : " text-gray-300 "
                                        }`}
                                >
                                    <FiTruck size={20} />
                                    Delivery
                                </button>
                                <button
                                    onClick={() => setOrderType("takeaway")}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${orderType === "takeaway"
                                        ? "bg-yellow-700 text-white"
                                        : " text-gray-300 "
                                        }`}
                                >
                                    <FiShoppingBag size={20} />
                                    Takeaway
                                </button>
                            </div>
                        </div>

                        {/* Order Details Form */}
                        {orderType === "delivery" ?
                            <DeliveryForm
                                orderType={orderType}
                                deliveryForm={deliveryForm}
                                setDeliveryForm={setDeliveryForm}
                            /> :
                            <TakeAwayForm
                                orderType={orderType}
                                takeawayForm={takeawayForm}
                                setTakeawayForm={setTakeawayForm}
                            />
                        }

                        {/* Payment Options */}
                        <PaymentForm
                            orderType={orderType}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            paymentForm={paymentForm}
                            setPaymentForm={setPaymentForm}
                        />

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmitOrder}
                            disabled={!isFormValid() || cart.length === 0}
                            className="w-full bg-yellow-700 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bebas text-xl uppercase py-4 rounded-lg transition-colors"
                        >
                            Place Order - ${finalTotal.toFixed(2)}
                        </button>
                    </div>

                    {/* Right Side - Cart Summary */}
                    <OrderSummary orderType={orderType} />
                    {
                        isToast && (
                            <Toast
                                messageType="success"
                                message="Order placed successfully!"
                            />
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default CheckoutPage
