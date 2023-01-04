import { request } from '../request'
import { SortBy } from '../../types'
import type { FilterOptions, Product } from '../../types'

type ResponseDTO = {
  products: Product[]
  categories: string[]
}

const API_URL = 'https://dummyjson.com'

const cache = {} as ResponseDTO

const fetchData = async (): Promise<ResponseDTO> => {
  if (cache.products?.length > 0) {
    return cache
  }

  const products = await request<{ products: Product[] }>(`${API_URL}/products?limit=50`).then(
    (data) => data.products
  )

  cache.products = products
  cache.categories = [...new Set(products.map((item) => item.category))]

  return cache
}

export const fetchProducts = async (options: Partial<FilterOptions>): Promise<Product[]> => {
  const { sort, ...filtering } = options
  const { products } = await fetchData()

  const filtered = Object.entries(filtering).reduce(
    (products, [key, value]) =>
      products.filter(
        (item) => filterPredicates[key as keyof FilterOptions]?.call(null, item, value) ?? true
      ),
    [...products]
  )

  if (sort) {
    filtered.sort(sortByPredicates[sort?.toString() as SortBy])
  }

  return filtered
}

export const fetchProduct = async (id: Product['id']): Promise<Product | null> => {
  const { products } = await fetchData()
  return products.find((item) => item.id === id) ?? null
}

export const fetchCategories = async (): Promise<string[]> => {
  const { categories } = await fetchData()
  return categories
}

const sortByPredicates: {
  [key: string]: (itemA: Product, itemB: Product) => number
} = {
  [SortBy.priceASC]: (itemA, itemB) => itemA.price - itemB.price,
  [SortBy.priceDESC]: (itemA, itemB) => itemB.price - itemA.price,
  [SortBy.ratingASC]: (itemA, itemB) => itemA.rating - itemB.rating,
  [SortBy.ratingDESC]: (itemA, itemB) => itemB.rating - itemA.rating,
}

const filterPredicates: {
  [key in keyof Partial<FilterOptions>]: (item: Product, value: string[]) => boolean
} = {
  category: (item: Product, value: string[]) =>
    value.some((v) => v.toLowerCase() === item.category.toLowerCase()),
  brand: (item: Product, value: string[]) =>
    value.some((v) => v.toLowerCase() === item.brand.toLowerCase()),
  price: (item: Product, value: string[]) =>
    item.price >= Number(value[0]) && item.price <= Number(value[1]),
  stock: (item: Product, value: string[]) =>
    item.stock >= Number(value[0]) && item.stock <= Number(value[1]),
  search: (item: Product, value: string[]) =>
    item.title.toLowerCase().includes(value.toString().toLowerCase()) ||
    item.description.toLowerCase().includes(value.toString().toLowerCase()),
}
