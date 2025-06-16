
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { CartProvider } from './Store/Context/CartContext.tsx';
import { NotificationProvider } from './Store/Context/NotificationContext.tsx';


createRoot(document.getElementById('root')!).render(
  <NotificationProvider>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </NotificationProvider>
)
