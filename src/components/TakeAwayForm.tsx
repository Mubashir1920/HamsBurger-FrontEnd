
import { useState } from "react"
import { motion } from "motion/react"
import { OrderType } from "../pages/CheckOut"
import { FiUser, FiPhone, FiMail } from "react-icons/fi"


type TakeawayFormData = {
    fullName: string
    email: string
    phone: string
    pickupTime: string
    instructions: string
}


const TakeAwayForm = ({ orderType }: { orderType: OrderType }) => {



    const [takeawayForm, setTakeawayForm] = useState<TakeawayFormData>({
        fullName: "",
        email: "",
        phone: "",
        pickupTime: "",
        instructions: "",
    })

    const handleTakeawayFormChange = (field: keyof TakeawayFormData, value: string) => {
        setTakeawayForm((prev) => ({ ...prev, [field]: value }))
    }
    // const isFormValid = () => {
    //     return takeawayForm.fullName && takeawayForm.email && takeawayForm.phone && takeawayForm.pickupTime
    // }




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
                        value={takeawayForm.fullName}
                        onChange={(e) => handleTakeawayFormChange("fullName", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        <FiMail className="inline mr-2" />
                        Email *
                    </label>
                    <input
                        type="email"
                        value={takeawayForm.email}
                        onChange={(e) => handleTakeawayFormChange("email", e.target.value)}
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
                        value={takeawayForm.phone}
                        onChange={(e) => handleTakeawayFormChange("phone", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Pickup Time *</label>
                    <input
                        type="datetime-local"
                        value={takeawayForm.pickupTime}
                        onChange={(e) => handleTakeawayFormChange("pickupTime", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Special Instructions</label>
                    <textarea
                        value={takeawayForm.instructions}
                        onChange={(e) => handleTakeawayFormChange("instructions", e.target.value)}
                        className="w-full px-3 py-2 bg-black/80 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500"
                        rows={2}
                        placeholder="Any special instructions for your order..."
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default TakeAwayForm
