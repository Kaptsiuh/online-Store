import clsx from "clsx";
import { FC, useEffect, useMemo, useState } from "react";
import { IoCheckmark, IoRemoveCircleOutline } from "react-icons/io5"

import { checkPromoCode } from "../api/products";
import { Promo } from "../types";

import List from "./List";

type CartPromoFormProps = {
  price: number;
  count: number;
  promos: Promo[];
  onApplyPromo: (promo: Promo) => void;
  onCancelPromo: (promo: Promo) => void;
  onSubmit: () => void;

}

const CartPromoForm: FC<CartPromoFormProps> = (props) => {
  const { price, count, onSubmit, promos, onApplyPromo, onCancelPromo } = props

  const [value, setValue] = useState<string>("")
  const [promo, setPromo] = useState<Promo>();

  const isApplied = useMemo(() => promos.some(item => item.id === promo?.id), [promo, promos])
  const newPrice = useMemo(() => price * (1 - promos.reduce((sum, { disc }) => sum + disc, 0) / 100), [promos, price])

  useEffect(() => {

    checkPromoCode(value.toLowerCase()).then(promo => {
      promo ? setPromo(promo) : setPromo(undefined);
    })

  }, [value])


  return (
    <div className="flex flex-col items-center border px-4 py-2 gap-y-2">
      <div className={clsx("text-xl", promos.length > 0 && "line-through")}>Total: <span className='font-medium'>{price}</span>$</div>
      <div className={clsx("text-xl", promos.length === 0 && "hidden")}>Total: <span className='font-medium'>{newPrice}</span>$</div>

      <div>Products: <span className='font-medium'>{count}</span></div>

      <div className="w-full">
        <List items={promos} fn={(item) => (
          <div key={item.id} className="flex items-center justify-center">
            <span>{item.name}</span> - <span>{item.disc} %</span>
            <button className="ml-2" onClick={() => onCancelPromo(item)}><IoRemoveCircleOutline /></button>
          </div>
        )} />
      </div>

      <input
        type="text"
        placeholder='Enter promo code'
        value={value}
        onChange={e => setValue(e.target.value)} />


      {promo && (<div className='flex items-center gap-x-2'>
        <h4>
          {promo.name} - {promo.disc}%
        </h4>
        {!isApplied &&
          <button onClick={() => onApplyPromo(promo)}><IoCheckmark /></button>
        }
      </div>)}

      <div className='text-orange-600 font-medium'>Promo for test: 'RS', 'EPM'</div>
      <button className='button uppercase my-4' onClick={onSubmit}>Buy Now</button>
    </div>
  )
}

export default CartPromoForm