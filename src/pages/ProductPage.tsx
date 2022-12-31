import { FC } from 'react'
import { json, useLoaderData } from 'react-router-dom'
import type { LoaderFunction } from 'react-router-dom'

const ProductPage: FC = () => {
  const { product } = useLoaderData() as LoaderData

  return <div>Product Page</div>
}

export default ProductPage

type LoaderData = {
  product: object
}

export const loader: LoaderFunction = ({ params }) => {
  const { id } = params

  return json<LoaderData>({
    product: {},
  })
}
