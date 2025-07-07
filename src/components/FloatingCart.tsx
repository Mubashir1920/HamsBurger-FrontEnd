
import { useCartContext } from "../Store/Context/CartContext"

import { HiOutlineShoppingBag } from "react-icons/hi2"



const FloatingCart = () => {

    const { active, setActive, totalItem } = useCartContext()

    return (
        <div
            onClick={() => setActive(!active)}
            className={`${Number(totalItem) > 0 ? "block" : "hidden"} fixed bottom-7 animate-bounce right-10 text-white bg-theme-red p-4 z-30 cursor-pointer rounded-full shadow-lg`}
        >
            <div className="relative "  >
                <HiOutlineShoppingBag size={22} />
                <span className="bg-yellow-600 absolute -top-5 -left-4 text-[13px] rounded-full h-5 w-5 text-center " >     {totalItem}
                </span>
            </div>
        </div>
    )
}

export default FloatingCart
