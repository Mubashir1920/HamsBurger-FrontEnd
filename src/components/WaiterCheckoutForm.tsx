import type { ReactElement } from "react"
import { useState, useEffect } from "react"
import { FaTrash, FaUser, FaTable, FaCreditCard, FaReceipt } from "react-icons/fa"
import { useWaiterCartContext } from "../Store/Context/WaiterCartContext"
import { placeOrder } from "../utils/placeOrder"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Toast from "../components/Toast";


type OrderForm = {
    orderType: "dinein" | "takeaway" | "delivery"
    empId: string
    empName: string
    tableNo: string
    status: "pending" | "preparing" | "served" | "paid" | "cancelled"
    orderId: string
    billing: {
        discountAmount: number
        paymentStatus: "Paid" | "Unpaid" | "Partial"
    }
    paymentMethod: string | null
}

const WaiterCheckoutForm = (): ReactElement => {
    const { cart, totalAmount, totalItem, removeFromCart, clearCart } = useWaiterCartContext()
    const [loading, setLoading] = useState<boolean>(false);


    // Toast Message
    const [toast, setToast] = useState<{ show: boolean; type: "success" | "failure"; message: string }>({
        show: false,
        type: "success",
        message: "",
    });
    const showToast = (type: "success" | "failure", message: string) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };


    const [formData, setFormData] = useState<OrderForm>({
        orderType: "dinein",
        empId: "EMP001",
        empName: "John Doe",
        tableNo: "T-05",
        status: "pending",
        orderId: `ORD-${Date.now()}`,
        billing: {
            discountAmount: 0,
            paymentStatus: "Unpaid",
        },
        paymentMethod: "cash",
    })

    const [calculatedBilling, setCalculatedBilling] = useState({
        subtotal: 0,
        taxAmount: 0,
        finalTotal: 0,
    })

    useEffect(() => {
        const subtotal: number = Number(totalAmount)
        const taxRate: number = formData.paymentMethod === "card" ? 0.05 : 0.16
        const taxAmount: number = subtotal * taxRate
        const finalTotal: number = subtotal + taxAmount - formData.billing.discountAmount

        setCalculatedBilling({
            subtotal: Number(subtotal.toFixed(2)),
            taxAmount: Number(taxAmount.toFixed(2)),
            finalTotal: Number(finalTotal.toFixed(2)),
        })
    }, [totalAmount, formData.billing.discountAmount, formData.paymentMethod])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const orderData = {
            orderType: formData.orderType,
            orderId: formData.orderId,
            empId: formData.empId,
            empName: formData.empName,
            tableNo: formData.tableNo,
            status: formData.status,
            billing: {
                ...formData.billing,
                subtotal: calculatedBilling.subtotal,
                taxAmount: calculatedBilling.taxAmount,
                totalAmount: calculatedBilling.finalTotal,
            },
            paymentMethod: formData.paymentMethod,
            cart,
        }

        try {
            const res = await placeOrder(orderData)

            console.log("Order Placed: ", res);
            showToast("success", "Order placed successfully!");
            clearCart();
        } catch (error) {
            console.error("Error placing order", error);
            showToast("failure", "Failed to place order. Try again!");
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveItem = (id: string) => {
        removeFromCart(id)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl text-black  space-y-6">
            <div className="bg-white rounded-lg  p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FaReceipt className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">Order Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Order Type</label>
                        <select
                            value={formData.orderType}
                            onChange={(e) => setFormData((prev) => ({ ...prev, orderType: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-md  "
                        >
                            <option value="dinein">dinein</option>
                            <option value="takeaway">takeaway</option>
                            <option value="delivery">delivery</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Employee ID</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                            <input
                                type="text"
                                value={formData.empId}
                                onChange={(e) => setFormData((prev) => ({ ...prev, empId: e.target.value }))}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Employee Name</label>
                        <input
                            type="text"
                            value={formData.empName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, empName: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Table Number</label>
                        <div className="relative">
                            <FaTable className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                            <select
                                value={formData.tableNo}
                                onChange={(e) => setFormData((prev) => ({ ...prev, tableNo: e.target.value }))}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white"
                            >
                                <option value="">Select Table</option>
                                {Array.from({ length: 20 }, (_, i) => i + 1).map((tableNum) => (
                                    <option key={tableNum} value={`T-${tableNum.toString().padStart(2, "0")}`}>
                                        Table {tableNum}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Order Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white"
                        >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="served">Served</option>
                            <option value="paid">Paid</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Order ID</label>
                        <input
                            type="text"
                            value={formData.orderId}
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg  p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Order Items ({cart.length})</h2>
                    <div className="flex items-center gap-4 text-sm">
                        <span>Total Items: {totalItem}</span>
                        <span>Cart Total: ${Number(totalAmount).toFixed(2)}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover: transition-shadow">
                            <div className="flex items-start  gap-4">
                                <div className="flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            {item.description && <p className="text-sm mt-1">{item.description}</p>}
                                            {item.category && (
                                                <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded-full mt-2">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="p-2 rounded-full transition-colors"
                                            title="Remove item"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {item.selectedItems && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                            <div className="flex gap-2 flex-col  text-sm">
                                                {item.selectedItems.type && (
                                                    <div>
                                                        <span className="font-medium">Type:</span> {item.selectedItems.type}
                                                    </div>
                                                )}
                                                {item.selectedItems.flavour && (
                                                    <div>
                                                        <span className="font-medium">Flavour:</span> {item.selectedItems.flavour}
                                                    </div>
                                                )}
                                                {item.selectedItems.option && (
                                                    <div>
                                                        <span className="font-medium">Option:</span> {item.selectedItems.option}
                                                    </div>
                                                )}
                                                {item.selectedItems.mealType && (
                                                    <div>
                                                        <span className="font-medium">Meal:</span> {item.selectedItems.mealType}
                                                    </div>
                                                )}
                                                {item.selectedItems.sizes && item.selectedItems.sizes.length > 0 && (
                                                    <div>
                                                        <span >Sizes: </span>
                                                        {item.selectedItems.sizes.map((size, idx) => (
                                                            <span key={idx} >
                                                                {size.name} ({size.description})
                                                                {/* {idx < item.selectedItems.sizes!.length - 1 ? ", " : ""} */}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {item.selectedItems.selectedFlavours && Object.keys(item.selectedItems.selectedFlavours).length > 0 && (
                                                    <div className={` flex `}>
                                                        <span >Selections: </span>
                                                        <div className="ml-2 flex space-y-1">
                                                            {Object.entries(item.selectedItems.selectedFlavours).map(([idx, flavours]) => (
                                                                <div key={idx} className="text-yellow-700">
                                                                    {flavours.join(", ")}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {item.selectedItems.defaultItems && item.selectedItems.defaultItems.length > 0 && (
                                                    <div className="flex">
                                                        <span className="font-medium">Includes: </span>
                                                        <span className="text-yellow-700 ml-2" >

                                                            {item.selectedItems.defaultItems
                                                                .map((defaultItem) => `${defaultItem.name} (${defaultItem.quantity})`)
                                                                .join(", ")}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
                                            <span>Qty: {item.quantity}</span>
                                        </div>
                                        <div className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {cart.length === 0 && (
                        <div className="text-center py-8">
                            <p>No items in cart</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-lg  p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FaCreditCard className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">Billing Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Discount Amount ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.billing.discountAmount}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        billing: { ...prev.billing, discountAmount: Number.parseFloat(e.target.value) || 0 },
                                    }))
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Payment Method</label>
                            <select
                                value={formData.paymentMethod || "cash"}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev, paymentMethod: e.target.value || null
                                    }))
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white"
                            >
                                <option value="cash">Cash</option>
                                <option value="card">Credit/Debit Card</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Payment Status</label>
                            <select
                                value={formData.billing.paymentStatus}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        billing: { ...prev.billing, paymentStatus: e.target.value as any },
                                    }))
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white"
                            >
                                <option value="Unpaid">Unpaid</option>
                                <option value="Paid">Paid</option>
                                <option value="Partial">Partial</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Cart Subtotal:</span>
                                <span>${calculatedBilling.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax ({formData.paymentMethod === "card" ? "5%" : "16%"}):</span>
                                <span>${calculatedBilling.taxAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount:</span>
                                <span>-${formData.billing.discountAmount.toFixed(2)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Final Total:</span>
                                <span>${calculatedBilling.finalTotal.toFixed(2)}</span>
                            </div>
                            <div className="text-xs mt-2">Total Items in Cart: {totalItem}</div>
                            <div className="text-xs mt-1">
                                Payment Method: {formData.paymentMethod === "card" ? "Card (5% Tax)" : "Cash (16% Tax)"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div >
                <button
                    type="submit"
                    disabled={cart.length === 0}
                    className="flex-1 bg-black w-full text-white cursor-pointer py-3 px-6 rounded-md hover:bg-black/90 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ?
                        <span>
                            <AiOutlineLoading3Quarters className="animate-spin mr-2 inline-block" size={20} />
                            Placing Order
                        </span>
                        :
                        <span>
                            Submit Order ({cart.length} items)
                        </span>
                    }
                </button>
            </div>
            {toast.show && (
                <Toast messageType={toast.type} showToast={toast.show} message={toast.message} />
            )}
        </form >
    )
}

export default WaiterCheckoutForm
