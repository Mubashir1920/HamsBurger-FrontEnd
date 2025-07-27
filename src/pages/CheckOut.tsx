
import { useState } from "react";

import { FiTruck, FiShoppingBag } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useCartContext } from "../Store/Context/CartContext";
import OrderSummary from "../components/OrderSummary";
import DeliveryForm from "../components/DeliveryForm";
import TakeAwayForm from "../components/TakeAwayForm";
import PaymentForm from "../components/PaymentForm";
import Toast from "../components/Toast";

import { placeOrder } from "../utils/placeOrder";

export type OrderType = "delivery" | "takeaway";
export type PaymentMethod = "cod" | "bank";

export type TakeawayFormData = {
    fullName: string;
    email: string;
    phone: string;
    pickupTime: string;
    instructions: string;
    confirmation: string;
};

export type DeliveryFormData = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    instructions: string;
    confirmation: string;
};

const CheckoutPage = () => {
    const [orderType, setOrderType] = useState<OrderType>("delivery");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
    const [loading, setLoading] = useState<boolean>(false);

    const [takeawayForm, setTakeawayForm] = useState<TakeawayFormData>({
        fullName: "",
        email: "",
        phone: "",
        pickupTime: "",
        instructions: "",
        confirmation: 'pending'

    });

    const [deliveryForm, setDeliveryForm] = useState<DeliveryFormData>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        postalCode: "",
        instructions: "",
        confirmation: 'pending',
    });

    const [toast, setToast] = useState<{ show: boolean; type: "success" | "failure"; message: string }>({
        show: false,
        type: "success",
        message: "",
    });

    const { cart, totalAmount, deliveryCharges, clearCart } = useCartContext();

    const subtotal = typeof totalAmount === "number" ? totalAmount : Number.parseFloat(totalAmount.toString()) || 0;
    const deliveryFee = orderType === "delivery" ? deliveryCharges : 0;
    const finalTotal = subtotal + deliveryFee;

    const resetForms = () => {
        setTakeawayForm({
            fullName: "",
            email: "",
            phone: "",
            pickupTime: "",
            instructions: "",
            confirmation: 'pending',
        });
        setDeliveryForm({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            postalCode: "",
            instructions: "",
            confirmation: 'pending',
        });
    };

    const showToast = (type: "success" | "failure", message: string) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleSubmitOrder = async () => {
        const formData = orderType === "delivery" ? deliveryForm : takeawayForm;
        const orderId = `ORD-${Date.now()}`;

        const placedOrder = {
            orderType,
            orderId,
            formData,
            paymentMethod,
            cart,
            total: finalTotal,
        };

        setLoading(true);
        // Placing Order
        try {
            const res = await placeOrder(placedOrder)

            console.log("Order Placed: ", res);

            showToast("success", "Order placed successfully!");
            clearCart();
            resetForms();
        } catch (error) {
            console.error("Error placing order", error);
            showToast("failure", "Failed to place order. Try again!");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        if (orderType === "delivery") {
            return deliveryForm.fullName && deliveryForm.email && deliveryForm.phone && deliveryForm.address && deliveryForm.postalCode;
        } else {
            return takeawayForm.fullName && takeawayForm.email && takeawayForm.phone && takeawayForm.pickupTime;
        }
    };

    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl mb-5 md:text-6xl font-bebas uppercase">CHECKOUT</h1>

                <div className="flex flex-col-reverse justify-between lg:flex-row gap-8">
                    <div className="w-full lg:w-[65%] space-y-8">
                        <div className="bg-black rounded-lg p-6">
                            <h2 className="text-2xl font-bebas uppercase mb-4">Order Type</h2>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setOrderType("delivery")}
                                    className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg transition-colors ${orderType === "delivery" ? "bg-yellow-700 text-white" : "text-gray-300"
                                        }`}
                                >
                                    <FiTruck size={20} />
                                    Delivery
                                </button>
                                <button
                                    onClick={() => setOrderType("takeaway")}
                                    className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg transition-colors ${orderType === "takeaway" ? "bg-yellow-700 text-white" : "text-gray-300"
                                        }`}
                                >
                                    <FiShoppingBag size={20} />
                                    Takeaway
                                </button>
                            </div>
                        </div>

                        {orderType === "delivery" ? (
                            <DeliveryForm orderType={orderType} deliveryForm={deliveryForm} setDeliveryForm={setDeliveryForm} />
                        ) : (
                            <TakeAwayForm orderType={orderType} takeawayForm={takeawayForm} setTakeawayForm={setTakeawayForm} />
                        )}

                        <PaymentForm orderType={orderType} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

                        <button
                            onClick={handleSubmitOrder}
                            disabled={!isFormValid() || cart.length === 0 || loading}
                            className="w-full bg-yellow-700 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bebas text-xl uppercase py-4 rounded-lg transition-colors cursor-pointer"
                        >
                            {loading ? (
                                <span>
                                    <AiOutlineLoading3Quarters className="animate-spin mr-2 inline-block" size={20} />
                                    Placing Order
                                </span>
                            ) : (
                                <>Place Order - ${finalTotal.toFixed(2)}</>
                            )}
                        </button>
                    </div>

                    <OrderSummary orderType={orderType} />

                    {toast.show && (
                        <Toast messageType={toast.type} showToast={toast.show} message={toast.message} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
