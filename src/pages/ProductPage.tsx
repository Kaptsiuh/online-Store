import { FC, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { json, useLoaderData } from 'react-router-dom'
import type { LoaderFunction } from 'react-router-dom'
import { fetchProduct } from '../api/products'
import { useCartContext } from '../context/CartContext'

const ProductPage: FC = () => {
  const { product } = useLoaderData() as LoaderData
  const { addToCart, dropFromCart, cart } = useCartContext()

  const [picture, setPicture] = useState<string>(product.thumbnail)

  const isInCart = useMemo(
    () => cart.some(({ product: { id } }) => id === product.id),
    [cart.length]
  )

  const mainImage = <img src={picture} className="w-11/12 rounded-md" alt="product-photo" />

  const images = product.images.map((path) => (
    <img
      className="w-11/12 m-2 rounded-md max-md:w-[13%] hover:opacity-75 cursor-pointer"
      src={path}
      alt="product-photo"
      key={path}
      onClick={() => setPicture(path)}
    />
  ))

  return (
    <div className="container">
      <div className="flex justify-between m-6 text-xl max-md:text-xs">
        <Link to="/" className="hover:text-orange-500">
          Store
        </Link>
        <span>/</span>
        {product.category}
        <span>/</span>
        {product.brand}
        <span>/</span>
        {product.title}
      </div>
      <div className="bg-white rounded-xl shadow-xl mb-4">
        <div className="text-center bg-gray-600 text-white rounded-t-xl">
          <h1 className="py-2 text-xl">{product.title}</h1>
        </div>
        <div className="flex max-md:flex-col max-md:items-center">
          <div className=" w-2/12 rounded-bl-xl max-md:flex max-md:w-full max-md:justify-start">
            {images}
          </div>
          <div className=" flex justify-center items-center w-5/12 max-md:items-center max-md:w-full">
            {mainImage}
          </div>
          <div className="flex flex-col  w-5/12 rounded-br-xl max-md:w-full">
            <div className=" m-2 flex justify-center items-center flex-col">
              <h2 className="text-3xl">{product.price}$</h2>

              <button
                onClick={!isInCart ? () => addToCart(product) : () => dropFromCart(product)}
                className="bg-gray-800 text-white uppercase hover:bg-orange-500 m-4 p-2 w-full rounded-md"
              >
                {isInCart ? 'Drop From Cart' : 'Add To Cart'}
              </button>

              <button className="bg-gray-800 text-white uppercase hover:bg-orange-500 p-2 w-full rounded-md">
                BUY NOW
              </button>
            </div>
            <h2 className="bg-gray-100 mt-4 m-2 rounded-md text-center">
              <p className="bg-gray-400 rounded-t-md">Description:</p>
              {product.description}
            </h2>
            <h2 className="bg-gray-100 m-2 rounded-md text-center">
              <p className="bg-gray-400 rounded-t-md">Discount Percentage:</p>
              {product.discountPercentage}
            </h2>
            <h2 className="bg-gray-100 m-2 rounded-md text-center">
              <p className="bg-gray-400 rounded-t-md">Rating:</p>
              {product.rating}
            </h2>
            <h2 className="bg-gray-100 m-2 rounded-md text-center">
              <p className="bg-gray-400 rounded-t-md">Stock:</p>
              {product.stock}
            </h2>
            <h2 className="bg-gray-100 m-2 rounded-md text-center">
              <p className="bg-gray-400 rounded-t-md">Brand:</p>
              {product.brand}
            </h2>
            <h2 className="bg-gray-100 mb-4 m-2 rounded-md text-center">
              <p className="bg-gray-400 rounded-t-md">Category:</p>
              {product.category}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

type LoaderData = {
  product: NonNullable<Awaited<ReturnType<typeof fetchProduct>>>
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  if (id === undefined) {
    throw new Response('', {
      status: 404,
      statusText: `Not found`,
    })
  }

  const product = await fetchProduct(Number(id))

  if (product === null) {
    throw new Response('', {
      status: 404,
      statusText: `Not found`,
    })
  }

  return json<LoaderData>({ product })
}
