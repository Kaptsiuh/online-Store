import { FC, ReactNode } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Product } from "../types";

type CartItemProps = {
  product: Product;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
  info?: ReactNode
}

const CartItem: FC<CartItemProps> = (props) => {
  const { product, count, onAdd, onRemove, info } = props
  return (
    <div key={product.id} className="flex flex-col md:flex-row md:space-x-4 items-center space-y-4 md:space-y-0 px-4 py-2 border">
      {info}
      <Link to={`/products/${product.id}`} className="flex-1">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-28 md:h-20 aspect-video object-cover"
          />
          <div>
            <h1 className="text-xl font-medium">{product.title}</h1>
            <p>{product.description}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <button onClick={onAdd}>
          <IoAdd />
        </button>
        <div>{count}</div>
        <button onClick={onRemove}>
          <IoRemove />
        </button>
      </div>
    </div>
  );
}

export default CartItem;