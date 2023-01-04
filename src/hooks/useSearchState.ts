import { useSearchParams } from 'react-router-dom'

type Builder<T> = {
  append: (key: Extract<keyof T, string>, value: string) => void
  remove: (key: Extract<keyof T, string>, value: string) => void
  set: (key: Extract<keyof T, string>, value: string | string[]) => void
}

const SEPARATOR = '↕'

const serialize = (items: string[]): string => {
  return items.join(SEPARATOR)
}

const deserialize = (str: string): string[] => {
  return str.split(SEPARATOR)
}

export const prepareParams = <T extends object>(search: URLSearchParams) => {
  return Object.fromEntries([...search].map(([key, value]) => [key, deserialize(value)])) as T
}

export const useSearchState = <T extends object>() => {
  const [search, setSearch] = useSearchParams()

  const builder: Builder<T> = {
    append(key, value) {
      const current = search.get(key)
      search.set(key, serialize(current !== null ? [...deserialize(current), value] : [value]))
    },
    remove(key, value) {
      const current = search.get(key)
      if (current !== null) {
        const newValue = serialize(deserialize(current).filter((v) => v !== value))

        newValue !== '' ? search.set(key, newValue) : search.delete(key)
      }
    },
    set(key, value) {
      if (Array.isArray(value)) {
        search.set(key, serialize(value))
      } else {
        value !== '' ? search.set(key, value) : search.delete(key)
      }
    },
  }

  const setState = (fn: (builder: Builder<T>) => void) => {
    fn(builder)
    setSearch(search, { replace: true })
  }

  return [prepareParams<T>(search), setState] as [T, typeof setState]
}
