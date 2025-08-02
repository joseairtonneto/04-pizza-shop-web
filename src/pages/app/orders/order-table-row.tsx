import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  orderId: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  customerName: string
  total: number
}

export function OrderTableRow({
  orderId,
  createdAt,
  status,
  customerName,
  total,
}: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, newStatus: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map(order => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status: newStatus,
            }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: async (_, { orderId }) => updateOrderStatusOnCache(orderId, 'canceled'),
  })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    onSuccess: async (_, { orderId }) => updateOrderStatusOnCache(orderId, 'processing'),
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess: async (_, { orderId }) => updateOrderStatusOnCache(orderId, 'delivering'),
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    onSuccess: async (_, { orderId }) => updateOrderStatusOnCache(orderId, 'delivered'),
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' size='xs'>
              <Search className='h-3 w-3' />
              <span className='sr-only'>Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className='font-mono text-xs font-medium'>{orderId}</TableCell>
      <TableCell className='text-muted-foreground'>
        {formatDistanceToNow(createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className='font-medium'>{customerName}</TableCell>
      <TableCell className='font-medium'>
        {(total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </TableCell>
      <TableCell>
        {status === 'pending' && (
          <Button
            onClick={() => approveOrderFn({ orderId })}
            variant='outline'
            size='xs'
            disabled={isApprovingOrder}
          >
            <ArrowRight className='mr-2 h-3 w-3' />
            <span>Aprovar</span>
          </Button>
        )}

        {status === 'processing' && (
          <Button
            onClick={() => dispatchOrderFn({ orderId })}
            variant='outline'
            size='xs'
            disabled={isDispatchingOrder}
          >
            <ArrowRight className='mr-2 h-3 w-3' />
            <span>Em entrega</span>
          </Button>
        )}

        {status === 'delivering' && (
          <Button
            onClick={() => deliverOrderFn({ orderId })}
            variant='outline'
            size='xs'
            disabled={isDeliveringOrder}
          >
            <ArrowRight className='mr-2 h-3 w-3' />
            <span>Entregue</span>
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId })}
          disabled={!['pending', 'processing'].includes(status) || isCancelingOrder}
          variant='ghost'
          size='xs'
        >
          <X className='mr-2 h-3 w-3' />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
