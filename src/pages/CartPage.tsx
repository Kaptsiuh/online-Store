import type { FC } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'

import List from '../components/List'
import Popup from '../components/Popup'
import BuyForm from '../components/BuyForm'
import CartItem from '../components/CartItem'
import CartPromoForm from '../components/CartPromoForm'

const CartPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState<boolean>(location.state?.openModal ?? false)

  const {
    totalCount,
    totalPrice,
    cart,
    addToCart,
    removeFromCart,
    promos,
    applyPromo,
    cancelPromo
  } = useCartContext()

  if (cart.length === 0) {
    return (
      <div className='flex flex-col items-center py-4 gap-y-3'>
        <div className='text-xl font-medium'>Cart is Empty</div>
        <button className='button' onClick={() => navigate('/')}>to Catalog</button>
      </div>
    )
  }

  return (
    <div className="space-y-4 xl:grid xl:grid-cols-[5fr_2fr] xl:gap-x-4">
      <div className="space-y-2">
        <div className="flex items-center">
          <h2 className="mr-auto">Products in Cart:</h2>

        </div>
        <div className="space-y-2">
          <List
            items={cart}
            fn={({ product, count }, i) =>
              <CartItem
                key={product.id}
                product={product}
                count={count}
                onAdd={() => addToCart(product)}
                onRemove={() => removeFromCart(product)}
                info={<div>{i + 1}</div>}
              />}
          />
        </div>
      </div>

      <CartPromoForm
        price={totalPrice}
        count={totalCount}
        promos={promos}
        onApplyPromo={applyPromo}
        onCancelPromo={cancelPromo}
        onSubmit={() => setIsOpen(true)}
      />

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <BuyForm />
      </Popup>
    </div>
  )
}

export default CartPage

