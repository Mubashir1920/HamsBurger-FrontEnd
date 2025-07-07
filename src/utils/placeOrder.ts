
export const placeOrder = async (order: any) => {
    const response = await fetch(`http://localhost:3000/api/order/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
    }

    return response.json();
}
