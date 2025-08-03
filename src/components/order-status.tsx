export type OrderStatus = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

export function OrderStatus({ status }: OrderStatusProps) {
  const colors = {
    pending: 'bg-slate-400',
    canceled: 'bg-rose-500',
    processing: 'bg-amber-500',
    delivering: 'bg-amber-500',
    delivered: 'bg-emerald-500',
  }

  const statusText = {
    pending: 'Pendente',
    canceled: 'Cancelado',
    processing: 'Em preparo',
    delivering: 'Em entrega',
    delivered: 'Entregue',
  }

  return (
    <div className='flex items-center gap-2'>
      <span data-testid='badge' className={`h-2 w-2 rounded-full ${colors[status]}`}></span>
      <span className='text-muted-foreground font-medium'>{statusText[status]}</span>
    </div>
  )
}
