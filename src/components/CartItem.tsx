import clsx from 'clsx'

import { FC, ReactNode } from 'react'
import { IoAdd, IoRemove } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { Product } from '../types'

type CartItemProps = {
  product: Product
  count: number
  onAdd: () => void
  onRemove: () => void
  info?: ReactNode
}

const CartItem: FC<CartItemProps> = (props) => {
  const { product, count, onAdd, onRemove, info } = props
  return (
    <div
      key={product.id}
      className='flex flex-col md:flex-row md:space-x-4 items-center space-y-4 md:space-y-0 px-4 py-2 border'
    >
      {info}
      <Link to={`/products/${product.id}`} className='flex-1'>
        <div className='flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4'>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='h-28 aspect-video object-cover'
          />
          <div className='flex-1'>
            <div className='flex flex-col mb-1'>
              <h1 className='text-xl font-medium'>{product.title}</h1>
              <span className='text-xs capitalize text-gray-500 font-medium'>
                {product.category} | {product.brand}
              </span>
            </div>
            <p className='mb-1'>{product.description}</p>
            <div className='text-gray-600 text-sm font-medium flex items-center justify-between md:flex-col md:items-start'>
              <span>Rating: {product.rating}</span>
              <span>Discount: {product.discountPercentage}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className='flex flex-col items-center gap-y-1'>
        <div className='capitalize text-sm'>
          stock: <span className='font-medium'>{product.stock}</span>
        </div>
        <div className='flex items-center space-x-4'>
          <button className={clsx(count >= product.stock && 'pointer-events-none')} onClick={onAdd}>
            <IoAdd />
          </button>
          <div className='fony-[2ch]'>{count}</div>
          <button onClick={onRemove}>
            <IoRemove />
          </button>
        </div>
        <div className='capitalize text-sm'>
          price: <span className='font-medium'>{product.price * count}$</span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
