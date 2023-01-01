import { FC } from 'react'
import { json, useLoaderData } from 'react-router-dom'
import type { LoaderFunction } from 'react-router-dom'
import { fetchProduct } from '../api/products'

const ProductPage: FC = () => {
  const { product } = useLoaderData() as LoaderData

  // console.log(product);
  const mainImage = (
    <img src={product.images[0]} className="max-w-[300px] m-2 rounded-sm" alt="product foto" />
  )

  const images = product.images.map((e) => (
    <img
      className="max-w-[100px] m-2 rounded-sm"
      src={e}
      alt="product foto"
      key={e.toString()}
      // onClick={() => (mainImage = <img src={e} alt="product foto" />)}
    />
  ))

  // console.log(mainImage.props.src);

  return (
    <div className="container">
      {/* <div>Хлебные крошки</div> */}
      <div className="bg-white rounded-xl">
        <div className="text-center bg-slate-400 rounded-t-xl">
          <h1 className="py-2">{product.title}</h1>
        </div>
        <div className="flex">
          <div className="bg-black">{images}</div>
          <div className="bg-black flex justify-center items-center">{mainImage}</div>
          <div className="flex flex-col bg-red-300 w-8/12">
            <h2 className="bg-blue-500 mt-4 m-2 rounded-sm text-center">
              <p className="bg-white rounded-t-sm">Description:</p>
              {product.description}
            </h2>
            <h2 className="bg-blue-500 m-2 rounded-sm text-center">
              <p className="bg-white rounded-t-sm">Discount Percentage:</p>
              {product.discountPercentage}
            </h2>
            <h2 className="bg-blue-500 m-2 rounded-sm text-center">
              <p className="bg-white rounded-t-sm">Rating:</p>
              {product.rating}
            </h2>
            <h2 className="bg-blue-500 m-2 rounded-sm text-center">
              <p className="bg-white rounded-t-sm">Stock:</p>
              {product.stock}
            </h2>
            <h2 className="bg-blue-500 m-2 rounded-sm text-center">
              <p className="bg-white rounded-t-sm">Brand:</p>
              {product.brand}
            </h2>
            <h2 className="bg-blue-500 mb-4 m-2 rounded-sm text-center">
              <p className="bg-white rounded-t-sm">Category:</p>
              {product.category}
            </h2>
          </div>
          <div className="bg-blue-500 flex justify-center items-center flex-col w-4/12">
            <h2 className="text-3xl">{product.price}$</h2>
            <button className="bg-white m-4 w-4/6 rounded-sm">
              Add To Cart {/* состояние корзины */}
            </button>
            <button className="bg-white w-4/6 rounded-sm">BUY NOW</button>
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
