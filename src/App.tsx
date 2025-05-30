
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import { ReactLenis } from 'lenis/react'

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderOnline from "./pages/OrderOnline";


import { Routes, Route } from "react-router";
import Page404 from "./pages/404";



function App() {

  return (
    <>
      <ReactLenis root options={{ smoothWheel: true, touchMultiplier: 1 }}>
        <Navbar />
        <div className="pt-20" ></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orderonline" element={<OrderOnline />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        <Footer />
      </ReactLenis>
    </>
  )
}

export default App
