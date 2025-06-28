import WaiterCheckoutForm from "./WaiterCheckoutForm"

const WaiterCheckout = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-left mb-8">
                    <h1 className="text-5xl font-bebas  text-black ">CHECKOUT</h1>
                    <p className="text-gray-600">Complete the order details and process payment</p>
                </div>
                <WaiterCheckoutForm />
            </div>
        </div>
    )
}

export default WaiterCheckout
