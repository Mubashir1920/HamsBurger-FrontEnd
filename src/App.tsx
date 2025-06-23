
import { ReactLenis } from 'lenis/react'
import { Routes, Route } from "react-router";
import { useLocation } from "react-router";

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop";
import MaintainancePopUp from "./components/MaintainancePopUp";

import Home from "./pages/Home";
// import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderOnline from "./pages/OrderOnline";
import Page404 from "./pages/404";
import WaiterLogin from './pages/Login';
import CheckOut from "./pages/CheckOut";
import WaiterDashboard from './pages/WaiterDashboard';
import AddItemsWaitersMenu from './components/AddItemsWaitersMenu';
import WaiterOrderList from './components/WaiterOrderList';


function App() {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/checkout", "/waiter-dashboard", "/waiter-dashboard/additem", "/waiter-dashboard/order-list"];
  const isLayoutHidden = noLayoutRoutes.includes(location.pathname);

  return (
    <ReactLenis root options={{ smoothWheel: true, touchMultiplier: 1 }}>
      <ScrollToTop />

      {!isLayoutHidden && <Navbar />}
      {!isLayoutHidden && <div className="pt-20" />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<OrderOnline />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<WaiterLogin />} />
        <Route path="/waiter-dashboard" element={<WaiterDashboard />} >
          <Route path="additem" element={<AddItemsWaitersMenu />} />
          <Route path="order-list" element={<WaiterOrderList />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>

      {!isLayoutHidden && <Footer />}

      {/* <MaintainancePopUp /> */}
    </ReactLenis>
  )
}

export default App
