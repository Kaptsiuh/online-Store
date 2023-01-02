import { Link } from "react-router-dom"
import type { FC } from "react";
import type { Product } from "../types";

import List from "./List";

type ProductCardProps = {
  product: Product
  isInCart: boolean
  onAddToCart: () => void
  onDropFromCart: () => void
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { product, isInCart, onAddToCart, onDropFromCart } = props
  return (
    <div className="rounded-md shadow-lg hover:shadow-2xl bg-white border transition-shadow">
      <Link to={`products/${product.id}`}>
        <img
          className="w-full aspect-video object-cover hover:opacity-75 rounded-md transition"
          src={product.thumbnail}
          alt={product.title}
        />
      </Link>
      <div className='flex flex-col items-center p-3'>
        <div className='text-md text-gray-400 capitalize'>
          <span>{product.brand}</span>
          <span> | </span>
          <span>{product.category}</span>
        </div>
        <Link to={`products/${product.id}`}>
          <h2 className="text-center text-lg text-orange-400 font-semibold hover:underline">{product.title}</h2>
        </Link>
        <div className="flex item-center mt-2">
          <List items={Array.from({ length: 5 })} fn={(_, i) => i < Math.round(product.rating) ? (
            <svg key={i} className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ) : (
            <svg key={i} className="w-5 h-5 fill-current text-gray-400" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          )} />

        </div>
        <span>{product.price}$</span>
      </div>
      <div className='flex flex-col items-center pb-3'>
        {isInCart ? (
          <button onClick={onDropFromCart} className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 transition-colors'>Drop from Cart</button>
        ) : (
          <button onClick={onAddToCart} className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 transition-colors'>Add to Cart</button>
        )}
      </div>
    </div>
  )
}

export default ProductCard;