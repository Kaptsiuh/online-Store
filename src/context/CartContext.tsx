import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react';

import type { FC, Reducer } from 'react'
import type { Product, Promo } from '../types';

type CartProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  product: Product;
  count: number;
};

type PromoItem = Promo;

type CartContextValue = {
  cart: CartItem[];
  promos: PromoItem[];
  totalPrice: number;
  totalCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  dropFromCart: (product: Product) => void;
  applyPromo: (promo: PromoItem) => void;
  cancelPromo: (promo: PromoItem) => void;
};

type CartState = {
  cart: CartItem[];
  promos: PromoItem[];
};

enum ActionTypes {
  INIT_CART = 'INIT_CART',
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  APPLY_PROMO = 'APPLY_PROMO',
  CANCEL_PROMO = 'CANCEL_PROMO'
}

type CartAction =
  | { type: ActionTypes.ADD_TO_CART; payload: CartItem[] }
  | { type: ActionTypes.REMOVE_FROM_CART; payload: CartItem[] }
  | { type: ActionTypes.INIT_CART; payload: CartState }
  | { type: ActionTypes.APPLY_PROMO; payload: PromoItem[] }
  | { type: ActionTypes.CANCEL_PROMO; payload: PromoItem[] }


const CartContext = createContext<CartContextValue>({} as CartContextValue);

export const useCartContext = () => useContext<CartContextValue>(CartContext);

const cartReducer: Reducer<CartState, CartAction> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ADD_TO_CART:
      return { ...state, cart: payload };
    case ActionTypes.REMOVE_FROM_CART:
      return { ...state, cart: payload };
    case ActionTypes.INIT_CART:
      return payload;
    case ActionTypes.APPLY_PROMO:
      return { ...state, promos: payload };
    case ActionTypes.CANCEL_PROMO:
      return { ...state, promos: payload };

    default:
      return state;
  }
};

const initialState: CartState = {
  cart: [],
  promos: []
};

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    const existed = state.cart.find((item) => item.product.id === product.id);
    existed
      ? dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: state.cart.map((item) =>
          item.product.id === existed.product.id ? { ...existed, count: existed.count + 1 } : item
        ),
      })
      : dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: [...state.cart, { product, count: 1 }],
      });
  };

  const removeFromCart = (product: Product) => {
    const existed = state.cart.find((item) => item.product.id === product.id);

    existed && existed.count > 1
      ? dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: state.cart.map((item) =>
          item.product.id === product.id ? { ...existed, count: existed.count - 1 } : item
        ),
      })
      : dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: state.cart.filter((item) => item.product.id !== product.id),
      });
  };

  const dropFromCart = (product: Product) => {
    dispatch({
      type: ActionTypes.REMOVE_FROM_CART,
      payload: state.cart.filter((item) => item.product.id !== product.id),
    });
  };

  const applyPromo = (promo: PromoItem) => {
    const existed = state.promos.find((item) => item.id === promo.id);
    !existed && dispatch({
      type: ActionTypes.APPLY_PROMO,
      payload: [...state.promos, promo],
    });
  }

  const cancelPromo = (promo: PromoItem) => {
    dispatch({
      type: ActionTypes.APPLY_PROMO,
      payload: state.promos.filter(item => item.id !== promo.id),
    });
  }

  const totalPrice = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.count * item.product.price, 0),
    [state.cart]
  );

  const totalCount = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.count, 0),
    [state.cart]
  );

  useEffect(() => {
    const cart = localStorage.getItem('cart');

    if (cart !== null) {
      dispatch({ type: ActionTypes.INIT_CART, payload: JSON.parse(cart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider
      value={{ ...state, totalPrice, totalCount, addToCart, removeFromCart, dropFromCart, applyPromo, cancelPromo }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;