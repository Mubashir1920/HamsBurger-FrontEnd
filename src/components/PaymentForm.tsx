


import { motion } from "motion/react"
import { FiDollarSign } from "react-icons/fi"
import { BsBank } from "react-icons/bs"

import { type OrderType } from "../pages/CheckOut"
import { type PaymentMethod } from "../pages/CheckOut"


type PaymentFormProps = {
    orderType: OrderType
    paymentMethod: PaymentMethod
    setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>
}


const PaymentForm: React.FC<PaymentFormProps> = ({ orderType, paymentMethod, setPaymentMethod }) => {


    return (
        < div className="bg-black rounded-lg p-6">
            <h2 className="text-2xl font-bebas uppercase mb-4">Payment Method</h2>

            <div className="space-y-4">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => {
                            setPaymentMethod("cod")
                        }}
                        className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === "cod"
                            ? "border-yellow-500 bg-yellow-500/10"
                            : "border-white/20 hover:border-gray-500"
                            }`}
                    >
                        <FiDollarSign size={20} />
                        <span>Cash on Delivery</span>
                    </button>

                    <button
                        onClick={() => {
                            setPaymentMethod("bank")
                        }}
                        className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === "bank"
                            ? "border-yellow-500 bg-yellow-500/10"
                            : "border-white/20 hover:border-gray-500"
                            }`}
                    >
                        <BsBank size={20} />
                        <span>Bank Transfer</span>
                    </button>


                </div>

                {paymentMethod === "bank" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                    >
                        <div className="md:col-span-2 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                            <p className="text-sm text-blue-300">
                                <strong>Bank Transfer Instructions:</strong>
                                <div className="mt-2" >
                                    <p><strong>Account Name:</strong> HAMSBURGER</p>
                                    <p><strong>Account Number:</strong> 1234567890</p>
                                    <p><strong>Bank Name:</strong> JazzCash</p>
                                </div>
                                <br />
                                Please transfer the total amount to our bank account and Send the receipt at <strong>support@hamsburger.com</strong>. You will receive
                                order confirmation once payment is verified.
                            </p>
                        </div>
                    </motion.div>
                )}

                {paymentMethod === "cod" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg mt-4"
                    >
                        <p className="text-sm text-green-300">
                            <strong>Cash on Delivery:</strong>
                            <br />
                            You can pay in cash when your order is {orderType === "delivery" ? "delivered" : "picked up"}.
                            Please have the exact amount ready.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default PaymentForm
