import { FC } from 'react'
import { json, useLoaderData } from 'react-router-dom'

import type { LoaderFunction } from 'react-router-dom'

const StorePage: FC = () => {
  const { products } = useLoaderData() as LoaderData

  return <div>Store Page</div>
}

export default StorePage

type LoaderData = {
  products: []
}

export const loader: LoaderFunction = () => {
  return json<LoaderData>({
    products: [],
  })
}
