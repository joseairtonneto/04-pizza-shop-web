import { http, HttpResponse } from 'msw'

import type { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<never, never, GetPopularProductsResponse>(
  '/metrics/popular-products',
  () => {
    return HttpResponse.json([
      { product: 'Pizza 1', amount: 1000 },
      { product: 'Pizza 2', amount: 500 },
      { product: 'Pizza 3', amount: 250 },
      { product: 'Pizza 4', amount: 100 },
      { product: 'Pizza 5', amount: 750 },
    ])
  },
)
