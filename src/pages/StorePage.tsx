import { json, useLoaderData } from 'react-router-dom'
import clsx from 'clsx'

import { FC, useState } from 'react'
import type { LoaderFunction } from 'react-router-dom'

import { IoList, IoGrid, IoFilter, IoClose } from "react-icons/io5"

import { useCartContext } from '../context/CartContext'
import { fetchProducts } from '../api/products'

import List from '../components/List'
import ProductCard from '../components/ProductCard'


const StorePage: FC = () => {
  const { products } = useLoaderData() as LoaderData
  const { addToCart, dropFromCart, cart } = useCartContext()

  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='grid grid-cols-1 grid-rows-1 xl:grid-cols-[1fr,4fr] xl:gap-4 overflow-hidden'>

      <div
        className={
          clsx('col-span-full row-span-full flex w-[100%] -translate-x-full transition-transform xl:col-auto xl:translate-x-0',
            isOpen && 'z-10 translate-x-0')
        }>

        <div className='flex-1 bg-white relative'>
          <button className='absolute right-2 top-2 xl:hidden' onClick={() => setIsOpen(false)}><IoClose /></button>
        </div>
      </div>

      <div className='col-span-full row-span-full space-y-4 xl:col-auto xl:row-auto'>
        <div className='flex items-center justify-between'>

          <div>
            <button className='xl:hidden' onClick={() => setIsOpen(true)}><IoFilter /></button>
          </div>

          <div>Found: <span className='font-bold'>{products.length}</span></div>

          <div className='flex items-center gap-x-3'>
            <button><IoGrid /></button>
            <button><IoList /></button>
          </div>
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3'>
          <List items={products} fn={(item) => (
            <ProductCard
              key={item.id}
              product={item}
              isInCart={cart.some(({ product }) => item.id === product.id)}
              onAddToCart={() => addToCart(item)}
              onDropFromCart={() => dropFromCart(item)}
            />
          )} />
        </div>
      </div>
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
