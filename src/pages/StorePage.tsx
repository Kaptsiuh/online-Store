import { FC } from 'react'
import { json, useLoaderData } from 'react-router-dom'
import type { LoaderFunction } from 'react-router-dom'

import { fetchProducts } from '../api/products'

const StorePage: FC = () => {
  const { products } = useLoaderData() as LoaderData

  return <div>{
    products.map(item => (
      <div key={item.id}>
        <h2>{item.title}</h2>
      </div>
    ))
  }</div>
}

export default StorePage

type LoaderData = {
  products: Awaited<ReturnType<typeof fetchProducts>>
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    products: await fetchProducts(),
  })
}
