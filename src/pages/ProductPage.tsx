import { FC } from 'react'
import { Link } from 'react-router-dom'
import { json, useLoaderData } from 'react-router-dom'
import type { LoaderFunction } from 'react-router-dom'
import { fetchProduct } from '../api/products'

const ProductPage: FC = () => {
  const { product } = useLoaderData() as LoaderData

  // console.log(product);
  const mainImage = (
    <img src={product.images[0]} className="w-11/12 rounded-md" alt="product foto" />
  )

  const handleClick = (event) => {
    // const src = event.target.src;
    console.log(event)
    // mainImage = <img src={event} className="w-11/12 rounded-md" alt="product foto" />
    // mainImage.props.src
    // console.log(mainImage.props.src)
  }

  const images = product.images.map((e) => (
    <img
      className=" w-11/12 m-2 rounded-md"
      src={e}
      alt="product foto"
      key={e.toString()}
      onClick={() => handleClick(e)}
    />
  ))

  // console.log(mainImage.props.src);

  return (
    <div className="container">
      <div className="flex justify-between m-6 text-xl">
        <Link to="/">Store</Link>
        <span>/</span>
        {product.category}
        <span>/</span>
        {product.brand}
        <span>/</span>
        {product.title}
      </div>
      <div className="bg-white rounded-xl shadow-xl mb-4">
        <div className="text-center bg-slate-300 rounded-t-xl">
          <h1 className="py-2 text-xl">{product.title}</h1>
        </div>
        <div className="flex">
          <div className=" w-2/12 rounded-bl-xl">{images}</div>
          <div className=" flex justify-center items-center w-5/12">{mainImage}</div>
          <div className="flex flex-col  w-5/12 rounded-br-xl">
            <div className=" m-2 flex justify-center items-center flex-col">
              <h2 className="text-3xl">{product.price}$</h2>
              <button className="bg-slate-400 hover:bg-orange-500 m-4 p-2 w-full rounded-md">
                Add To Cart {/* состояние корзины */}
              </button>
              <button className="bg-slate-400 hover:bg-orange-500 p-2 w-full rounded-md">
                BUY NOW
              </button>
            </div>
            <h2 className="bg-gray-100 mt-4 m-2 rounded-md text-center">
              <p className="bg-slate-300 rounded-t-md">Description:</p>
              {product.description}
            </h2>
            <h2 className="bg-gray-100 m-2 rounded-md text-center">
              <p className="bg-slate-300 rounded-t-md">Discount Percentage:</p>
              {product.discountPercentage}
            </h2>
            <h2 className="bg-gray-100 m-2 rounded-md text-center">
              <p className="bg-slate-300 rounded-t-md">Rating:</p>
              {product.rating}
            </h2>
            <h2 className="bg-gray-100 m-2 rounded-md text-center">
              <p className="bg-slate-300 rounded-t-md">Stock:</p>
              {product.stock}
            </h2>
            <h2 className="bg-gray-100 m-2 rounded-md text-center">
              <p className="bg-slate-300 rounded-t-md">Brand:</p>
              {product.brand}
            </h2>
            <h2 className="bg-gray-100 mb-4 m-2 rounded-md text-center">
              <p className="bg-slate-300 rounded-t-md">Category:</p>
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
