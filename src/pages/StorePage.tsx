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

          </Card.Content>

          <Card.Actions>
            <button className='px-7 py-1'>Add to Cart</button>
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
