import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import CartPage from './pages/CartPage'
import ErrorPage from './pages/ErrorPage'
import ProductPage, { loader as productPageLoader } from './pages/ProductPage'
import StorePage, { loader as storePageLoader } from './pages/StorePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { path: '/', element: <StorePage />, loader: storePageLoader },
          { path: '/products/:id', element: <ProductPage />, loader: productPageLoader },
          { path: '/cart', element: <CartPage /> },
        ],
      },
    ],
  },
])
