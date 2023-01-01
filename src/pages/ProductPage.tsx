import { FC } from 'react'
import { json, useLoaderData } from 'react-router-dom'
import type { LoaderFunction } from 'react-router-dom'
import { fetchProduct } from '../api/products'

const ProductPage: FC = () => {
  const { product } = useLoaderData() as LoaderData

  return <div>Product Page</div>
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
