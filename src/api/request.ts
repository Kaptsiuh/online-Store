type RequestOptions = {
  method: RequestMethod
}

enum RequestMethod {
  GET = 'GET',
}

export const request = async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
  console.log('Requesting data...')

  return fetch(endpoint, { method: options?.method ?? RequestMethod.GET })
    .then((res) => res.json())
    .catch(console.log)
}
