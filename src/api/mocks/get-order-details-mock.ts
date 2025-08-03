import { http, HttpResponse } from 'msw'

import type { GetOrderDetailsParams, GetOrderDetailsResponse } from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
    },
    status: 'pending',
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        quantity: 1,
        product: { name: 'Pizza 01' },
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        quantity: 2,
        product: { name: 'Pizza 02' },
      },
    ],
    totalInCents: 5000,
    createdAt: new Date().toISOString(),
  })
})
