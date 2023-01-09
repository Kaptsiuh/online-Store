import { request } from '../request'
import { Promo, SortBy } from '../../types'
import type { FilterOptions, Product } from '../../types'

type ResponseDTO = {
  products: Product[]
  categories: Record<string, number>
  brands: Record<string, number>
  prices: { min: number; max: number }
  stock: { min: number; max: number }
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

  cache.categories = products.reduce<Record<string, number>>((initial, item) => {
    if (!isNaN(initial[item.category])) {
      initial[item.category] += 1
    } else {
      initial[item.category] = 1
    }
    return initial
  }, {})

  cache.brands = products.reduce<Record<string, number>>((initial, item) => {
    if (!isNaN(initial[item.brand])) {
      initial[item.brand] += 1
    } else {
      initial[item.brand] = 1
    }
    return initial
  }, {})

  cache.prices = {
    min: Math.min(...products.map((item) => item.price)),
    max: Math.max(...products.map((item) => item.price)),
  }
  cache.stock = {
    min: Math.min(...products.map((item) => item.stock)),
    max: Math.max(...products.map((item) => item.stock)),
  }

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

export const fetchCategories = async (): Promise<Record<string, number>> => {
  const { categories } = await fetchData()
  return categories
}

export const fetchBrands = async (): Promise<Record<string, number>> => {
  const { brands } = await fetchData()
  return brands
}

export const fetchMinMaxPrice = async () => {
  const { prices } = await fetchData()
  return prices
}

export const fetchMinMaxStock = async () => {
  const { stock } = await fetchData()
  return stock
}

export const checkPromoCode = async (id: Promo['id']): Promise<Promo | null> => {
  const promos = [
    { id: 'rs', name: 'Rolling Scopes School', disc: 10 },
    { id: 'epm', name: 'EPAM Systems', disc: 10 },
  ]
  return promos.find((item) => item.id === id) ?? null
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
    item.description.toLowerCase().includes(value.toString().toLowerCase()) ||
    item.stock.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
    item.price.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
    item.category.toLowerCase().includes(value.toString().toLowerCase()) ||
    item.brand.toLowerCase().includes(value.toString().toLowerCase()),
}
