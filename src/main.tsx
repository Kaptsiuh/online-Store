import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

import './index.css'
import CartProvider from './context/CartContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
)
