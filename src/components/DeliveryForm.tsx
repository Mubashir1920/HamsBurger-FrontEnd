
// import { useState } from "react"
import { motion } from "motion/react"
import { OrderType } from "../pages/CheckOut"
import { type DeliveryFormData } from '../pages/CheckOut'

import { FiMapPin, FiUser, FiPhone, FiMail } from "react-icons/fi"


type DeliveryFormProps = {
    orderType: OrderType
    deliveryForm: DeliveryFormData
    setDeliveryForm: React.Dispatch<React.SetStateAction<DeliveryFormData>>
}


const DeliveryForm = ({ orderType, deliveryForm, setDeliveryForm }: DeliveryFormProps) => {

    const handleDeliveryFormChange = (field: keyof DeliveryFormData, value: string) => {
        setDeliveryForm((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <motion.div
            key={orderType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black  rounded-lg p-6"
        >
            <h2 className="text-2xl font-bebas uppercase mb-4">
                {orderType === "delivery" ? "Delivery Details" : "Pickup Details"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        <FiUser className="inline mr-2" />
                        Full Name *
                    </label>
                    <input
                        type="text"
                        value={deliveryForm.fullName}
                        onChange={(e) => handleDeliveryFormChange("fullName", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        placeholder="Enter your full name"
                        maxLength={30}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        <FiMail className="inline mr-2" />
                        Email *
                    </label>
                    <input
                        type="email"
                        value={deliveryForm.email}
                        onChange={(e) => handleDeliveryFormChange("email", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        <FiPhone className="inline mr-2" />
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        value={deliveryForm.phone}
                        onChange={(e) => handleDeliveryFormChange("phone", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Postal Code *</label>
                    <input
                        type="text"
                        value={deliveryForm.postalCode}
                        onChange={(e) => handleDeliveryFormChange("postalCode", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        placeholder="Enter postal code"
                        maxLength={6}
                    />
                </div>


                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                        <FiMapPin className="inline mr-2" />
                        Delivery Address *
                    </label>
                    <textarea
                        value={deliveryForm.address}
                        onChange={(e) => handleDeliveryFormChange("address", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        rows={3}
                        placeholder="Enter your complete delivery address"
                    />
                </div>



                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Special Instructions</label>
                    <textarea
                        value={deliveryForm.instructions}
                        onChange={(e) => handleDeliveryFormChange("instructions", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        rows={2}
                        placeholder="Any special delivery instructions..."
                    />
                </div>
            </div>

        </motion.div>
    )
}

export default DeliveryForm
