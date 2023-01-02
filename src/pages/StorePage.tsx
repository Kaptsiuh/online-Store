import { json, useLoaderData } from 'react-router-dom'

import type { FC } from 'react'
import type { LoaderFunction } from 'react-router-dom'

import { useCartContext } from '../context/CartContext'
import { fetchProducts } from '../api/products'

import List from '../components/List'
import ProductCard from '../components/ProductCard'


const StorePage: FC = () => {
  const { products } = useLoaderData() as LoaderData
  const { addToCart, dropFromCart, cart } = useCartContext()

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3'>
      <List items={products} fn={(item) => (
        <ProductCard
          product={item}
          isInCart={cart.some(({ product }) => item.id === product.id)}
          onAddToCart={() => addToCart(item)}
          onDropFromCart={() => dropFromCart(item)}
        />
      )} />
    </div>
  )
}

export default StorePage

type LoaderData = {
  products: Awaited<ReturnType<typeof fetchProducts>>
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    products: await fetchProducts(),
  })
}
