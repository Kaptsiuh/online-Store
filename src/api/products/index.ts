import { request } from '../request'
import type { Product } from '../../types'

type ResponseDTO = {
  products: Product[]
}

const API_URL = 'https://dummyjson.com'

const cache = {} as ResponseDTO

const fetchData = async (): Promise<ResponseDTO> => {
  if (cache.products.length > 0) {
    return cache
  }

  const products = await request<{ products: Product[] }>(`${API_URL}/products?limit=50`).then(
    (data) => data.products
  )

  cache.products = products

  return cache
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { products } = await fetchData()
  return products
}

export const fetchProduct = async (id: Product['id']): Promise<Product | null> => {
  const { products } = await fetchData()
  return products.find((item) => item.id === id) ?? null
}
