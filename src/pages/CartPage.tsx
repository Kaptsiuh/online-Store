import { FC } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import List from '../components/List'
import Popup from '../components/Popup'
import { useCartContext } from '../context/CartContext'
import { IoAdd, IoRemove } from 'react-icons/io5'

const CartPage: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { totalCount, totalPrice, cart, addToCart, removeFromCart } = useCartContext()

  return (
    <div className="container grid grid-cols-[5fr_2fr] gap-x-8">
      <div className="space-y-2">
        <div className="flex items-center">
          <h2 className="mr-auto">Products in Cart</h2>
        </div>
        <div className="space-y-2">
          <List
            items={cart}
            fn={({ product, count }, i) => (
              <div key={product.id} className="flex items-center space-x-4 px-4 py-2 border">
                <div>{i + 1}</div>
                <Link to={`/products/${product.id}`} className="flex-1">
                  <div className="flex space-x-2">
                    <img
                      src={product.thumbnail}
                      alt={product.thumbnail}
                      className="h-20 aspect-video object-cover"
                    />
                    <div>
                      <h1 className="text-xl font-medium">{product.title}</h1>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center space-x-4">
                  <button onClick={() => addToCart(product)}>
                    <IoAdd />
                  </button>
                  <div>{count}</div>
                  <button onClick={() => removeFromCart(product)}>
                    <IoRemove />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      <div className="border p-4">
        <div>Total {totalPrice} $</div>
        <div>Products: {totalCount}</div>
        <button onClick={() => setIsOpen(() => true)}>Buy Now</button>
        <Popup isOpen={isOpen} onClose={() => setIsOpen(() => false)}>
          By Form
        </Popup>
      </div>
    </div>
  )
}

export default CartPage
