


import { motion } from "motion/react"
import { FiCreditCard, FiDollarSign } from "react-icons/fi"
import { BsBank } from "react-icons/bs"


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

type PaymentFormProps = {
    orderType: OrderType
    paymentMethod: PaymentMethod
    setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>
    paymentForm: PaymentFormData
    setPaymentForm: React.Dispatch<React.SetStateAction<PaymentFormData>>
}


const PaymentForm: React.FC<PaymentFormProps> = ({ orderType, paymentMethod, setPaymentMethod, paymentForm, setPaymentForm }) => {



    const handlePaymentFormChange = (field: keyof PaymentFormData, value: string) => {
        setPaymentForm((prev) => ({ ...prev, [field]: value }))
    }


    return (
        < div className="bg-black rounded-lg p-6">
            <h2 className="text-2xl font-bebas uppercase mb-4">Payment Method</h2>

            <div className="space-y-4">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => {
                            setPaymentMethod("cod")
                            handlePaymentFormChange("method", "cod")
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
                            handlePaymentFormChange("method", "bank")
                        }}
                        className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === "bank"
                            ? "border-yellow-500 bg-yellow-500/10"
                            : "border-white/20 hover:border-gray-500"
                            }`}
                    >
                        <BsBank size={20} />
                        <span>Bank Transfer</span>
                    </button>

                    <button
                        onClick={() => {
                            setPaymentMethod("card")
                            handlePaymentFormChange("method", "card")
                        }}
                        className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === "card"
                            ? "border-yellow-500 bg-yellow-500/10"
                            : "border-white/20 hover:border-gray-500"
                            }`}
                    >
                        <FiCreditCard size={20} />
                        <span>Debit/Credit Card</span>
                    </button>
                </div>

                {/* Payment Details Forms */}
                {paymentMethod === "card" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                    >
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                            <input
                                type="text"
                                value={paymentForm.cardName}
                                onChange={(e) => handlePaymentFormChange("cardName", e.target.value)}
                                className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                                placeholder="Enter cardholder name"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Card Number</label>
                            <input
                                type="text"
                                value={paymentForm.cardNumber}
                                onChange={(e) => handlePaymentFormChange("cardNumber", e.target.value)}
                                className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                            <input
                                type="text"
                                value={paymentForm.expiryDate}
                                onChange={(e) => handlePaymentFormChange("expiryDate", e.target.value)}
                                className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                                placeholder="MM/YY"
                                maxLength={5}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">CVV</label>
                            <input
                                type="text"
                                value={paymentForm.cvv}
                                onChange={(e) => handlePaymentFormChange("cvv", e.target.value)}
                                className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                                placeholder="123"
                                maxLength={4}
                            />
                        </div>
                    </motion.div>
                )}

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
