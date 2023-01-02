import { FC } from 'react'
import { json, useLoaderData, Link } from 'react-router-dom'
import type { LoaderFunction } from 'react-router-dom'

import { fetchProducts } from '../api/products'

import List from '../components/List'
import Card from '../components/Card'

const StorePage: FC = () => {
  const { products } = useLoaderData() as LoaderData

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3'>
      <List items={products} fn={(item) => (
        <Card key={item.id}>
          <Link to={`products/${item.id}`}>
            <Card.Media src={item.thumbnail} alt={item.title} />
          </Link>

          <Card.Content>
            <div className='text-md text-gray-400 capitalize'>
              <span>{item.brand}</span>
              <span> | </span>
              <span>{item.category}</span>
            </div>
            <Link to={`products/${item.id}`}>
              <h2 className="text-center text-lg text-yellow-600 font-semibold hover:underline">{item.title}</h2>
            </Link>
            <div className="flex item-center mt-2">
              <List items={Array.from({ length: 5 })} fn={(_, i) => i < Math.round(item.rating) ? (
                <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 fill-current text-gray-400" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              )} />

            </div>
            <span>{item.price}$</span>
          </Card.Content>

          <Card.Actions>
            <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-600 transition-colors'>Add to Cart</button>
          </Card.Actions>
        </Card>
      )} />
    </div>
  )
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
