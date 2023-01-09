import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartContext } from "../context/CartContext"

const CartOrderPage: FC = () => {
  const navigate = useNavigate()
  const [time, setTime] = useState(5)

  const { clearCart } = useCartContext()

  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)

    return () => {
      clearInterval(id);
    }
  }, [])

  useEffect(() => {
    if (time <= 0) {
      clearCart()
      navigate('/', { replace: true });
    }
  }, [time])

  return (
    <div className="flex flex-col items-center py-12">
      <h3 className="text-2xl text-gray-700 font-bold">
        The Order was placed. You'll be redirected to Store page in {time} seconds.
      </h3>
    </div>
  )
}

export default CartOrderPage