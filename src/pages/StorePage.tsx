import { useMemo, useState } from 'react'
import { json, useLoaderData, useNavigate } from 'react-router-dom'
import { IoList, IoGrid, IoFilter, IoClose } from "react-icons/io5"
import clsx from 'clsx'

import type { FC } from "react"
import type { LoaderFunction } from 'react-router-dom'

import { useCartContext } from '../context/CartContext'
import { fetchBrands, fetchCategories, fetchMinMaxPrice, fetchMinMaxStock, fetchProducts } from '../api/products'
import { useSearchState, prepareParams } from '../hooks/useSearchState'
import { FilterOptions, Product } from '../types'
import { sortByOptions } from '../config'

import List from '../components/List'
import ProductCard from '../components/ProductCard'
import FilterCard from '../components/FilterCard'
import FilterControl from '../components/FilterControl'
import SearchControl from '../components/SearchControl'
import SelectControl from '../components/SelectControl'
import RangeControl from '../components/RangeControl'

const StorePage: FC = () => {
  const { products, categories, brands, prices, stock } = useLoaderData() as LoaderData
  const { addToCart, dropFromCart, cart } = useCartContext()

  const [search, setSearch] = useSearchState<FilterOptions>()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigate = useNavigate()

  const itemCounts = useMemo(
    () => {
      return {
        ...products.reduce<Record<keyof Pick<Product, "brand" | "category">, Record<string, number>>>((initial, item) => {
          !isNaN(initial["category"][item.category])
            ? initial["category"][item.category] += 1
            : initial["category"][item.category] = 1;

          !isNaN(initial["brand"][item.brand])
            ? initial["brand"][item.brand] += 1
            : initial["brand"][item.brand] = 1;

          return initial;
        }, { category: {}, brand: {} }),
        prices: {
          min: Math.min(...products.map((item) => item.price)),
          max: Math.max(...products.map((item) => item.price)),
        },
        stock: {
          min: Math.min(...products.map((item) => item.stock)),
          max: Math.max(...products.map((item) => item.stock)),
        }
      }
    },
    [products],
  );

  return (
    <div className='grid grid-cols-1 grid-rows-1 xl:grid-cols-[1fr,4fr] xl:gap-4 overflow-hidden'>
      <div
        className={
          clsx('col-span-full row-span-full flex w-[100%] -translate-x-full transition-transform xl:col-auto xl:translate-x-0',
            isSidebarOpen && 'z-10 translate-x-0')
        }>

        <div className='flex-1 bg-white relative'>
          <button className='absolute right-2 top-2 xl:hidden' onClick={() => setIsSidebarOpen(false)}><IoClose /></button>

          <div className='space-y-4'>

            <div className='flex gap-x-2 xl:justify-between'>
              <button onClick={() => navigate('/')} className='button'>reset filters</button>
              <button onClick={() => navigator.clipboard.writeText(window.location.href)} className='button'>copy link</button>
            </div>

            <div className='xl:hidden'>
              <SelectControl
                title='Sort Options:'
                options={sortByOptions}
                value={search.sort?.toString()}
                handle={value => setSearch(builder => builder.set('sort', value))} />
            </div>

            <FilterCard title='category'>
              <List items={Object.entries(categories)} fn={([key, value]) =>
                <FilterControl
                  key={key}
                  value={key}
                  selected={Boolean(search.category?.includes(key))}
                  info={<>({itemCounts.category[key] ?? 0} / {value})</>}
                  handle={(checked) =>
                    setSearch(builder => checked
                      ? builder.append('category', key)
                      : builder.remove('category', key))} />}
              />
            </FilterCard>

            <FilterCard title='brands'>
              <List items={Object.entries(brands)} fn={([key, value]) =>
                <FilterControl
                  key={key}
                  value={key}
                  selected={Boolean(search.brand?.includes(key))}
                  info={<>({itemCounts.brand[key] ?? 0} / {value})</>}
                  handle={(checked) =>
                    setSearch(builder => checked
                      ? builder.append('brand', key)
                      : builder.remove('brand', key))} />}
              />
            </FilterCard>

            <FilterCard title="price">
              <RangeControl
                min={prices.min}
                max={prices.max}
                minValue={Number(search.price?.at(0) ?? itemCounts.prices.min)}
                maxValue={Number(search.price?.at(1) ?? itemCounts.prices.max)}
                handle={(min, max) => {
                  setSearch((builder) => builder.set('price', [`${min}`, `${max}`]));
                }}
              />
            </FilterCard>

            <FilterCard title="stock">
              <RangeControl
                min={stock.min}
                max={stock.max}
                minValue={Number(search.stock?.at(0) ?? itemCounts.stock.min)}
                maxValue={Number(search.stock?.at(1) ?? itemCounts.stock.max)}
                handle={(min, max) => {
                  setSearch((builder) => builder.set('stock', [`${min}`, `${max}`]));
                }}
              />
            </FilterCard>

          </div>
        </div>
      </div>

      <div className='col-span-full row-span-full space-y-4 xl:col-auto xl:row-auto'>
        <div className='flex items-center justify-between flex-wrap'>

          <div>
            <button className='xl:hidden' onClick={() => setIsSidebarOpen(true)}><IoFilter /></button>
            <div className='hidden xl:block'>
              <SelectControl
                title='Sort Options:'
                options={sortByOptions}
                value={search.sort?.toString()}
                handle={value => setSearch(builder => builder.set('sort', value))} />
            </div>
          </div>

          <div>Found: <span className='font-bold'>{products.length}</span></div>

          <div className='flex items-center gap-x-4'>
            <SearchControl value={search.search} handle={(value) => setSearch(builder => builder.set('search', value))} />
            <div className='flex items-center gap-x-3'>
              <button
                onClick={() => setSearch(builder => builder.set("view", "big"))}
                className='p-1 rounded transition hover:bg-gray-100'><IoGrid /></button>
              <button
                onClick={() => setSearch(builder => builder.set("view", "small"))}
                className='p-1 rounded transition hover:bg-gray-100'><IoList /></button>
            </div>
          </div>
        </div>
        {
          products.length > 0 ? (
            <div className={clsx('grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3', { "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]": search.view?.includes('small') })} >
              <List items={products} fn={(item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  isInCart={cart.some(({ product }) => item.id === product.id)}
                  onAddToCart={() => addToCart(item)}
                  onDropFromCart={() => dropFromCart(item)}
                />
              )} />
            </div>
          ) : (
            <div>Products Not Found</div>
          )
        }
      </div>
    </div>
  )
}

export default StorePage

type LoaderData = {
  products: Awaited<ReturnType<typeof fetchProducts>>
  categories: Awaited<ReturnType<typeof fetchCategories>>
  brands: Awaited<ReturnType<typeof fetchBrands>>
  prices: Awaited<ReturnType<typeof fetchMinMaxPrice>>
  stock: Awaited<ReturnType<typeof fetchMinMaxStock>>

}

export const loader: LoaderFunction = async ({ request }) => {
  const filterParams = prepareParams(new URL(request.url).searchParams)

  return json<LoaderData>({
    products: await fetchProducts(filterParams),
    categories: await fetchCategories(),
    brands: await fetchBrands(),
    prices: await fetchMinMaxPrice(),
    stock: await fetchMinMaxStock()
  })
}
