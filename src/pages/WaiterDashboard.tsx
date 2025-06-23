import { Link, Outlet } from "react-router";
import WaiterCart from "../components/WaiterCart";
import { WaiterCartProvider } from "../Store/Context/WaiterCartContext";



const WaiterDashboard = () => {
    const pathname = window.location.pathname;
    return (

        <WaiterCartProvider>
            {/* Nav Bar of the Waiter Dashboard */}
            <nav className="bg-white border w-full  border-black/20  px-2  py-4 " >
                <div className="max-w-xl mx-auto flex items-center justify-between " >
                    <div>
                        <h1 className="text-2xl font-bebas bg-black">
                            <span className="leading-none px-1">HAMS</span>
                            <span className="bg-theme-red px-1">BURGERS</span>
                        </h1>
                    </div>
                    <div className="flex text-black justify-between gap-5" >
                        <Link className={`${pathname === "/waiter-dashboard/additem" ? "font-semibold border-b" : "border-transparent font-normal"}`} to="/waiter-dashboard/additem">
                            Add Order
                        </Link>
                        <Link className={`${pathname === "/waiter-dashboard/order-list" ? "font-semibold border-b" : "border-transparent font-normal"}`} to="/waiter-dashboard/order-list">
                            Orders List
                        </Link>
                    </div>
                    <div className="text-black  flex flex-row-reverse gap-5" >
                        <h3 className="font-poppin font-semibold uppercase tracking-tight" >HUZAN</h3>
                        <WaiterCart />
                    </div>
                </div>
            </nav>


            {/*  Only Visible When the Waiter Logs In */}
            {pathname === "/waiter-dashboard" &&
                <div className="min-h-screen bg-white  text-black  p-4">
                    <div className="w-full max-w-xl mx-auto ">
                        <h1 className="text-2xl font-semibold tracking-tight   text-left">Hello Bobby!</h1>
                        <p className="text-lg text-left mb-4">Here you can manage orders and add items to the menu.</p>

                        <Link to="/waiter-dashboard/additem">
                            <button className="w-full py-4 mb-4 text-lg px-10 font-medium bg-black hover:bg-black/80 transition-colors  text-white rounded-lg ">
                                Add Order
                            </button>
                        </Link>
                        <Link to="/waiter-dashboard/order-list">
                            <button className="w-full py-4 text-lg px-10 font-medium text-white bg-black hover:bg-black/80 transition-colors rounded-lg">
                                Orders List
                            </button>
                        </Link>
                    </div>
                </div>
            }

            {/* Add Items and Order List will Be Rendered here  */}
            <Outlet />
        </WaiterCartProvider>
    );
};

export default WaiterDashboard;
