import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

// interface OrderTableRowProps {
// }

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' size='xs'>
              <Search className='h-3 w-3' />
              <span className='sr-only'>Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className='font-mono text-xs font-medium'>1237128y7dwqeas8123</TableCell>
      <TableCell className='text-muted-foreground'>há 15 minutos</TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          <span className='h-2 w-2 rounded-full bg-slate-400'></span>
          <span className='text-muted-foreground font-medium'>Pendente</span>
        </div>
      </TableCell>
      <TableCell className='font-medium'>José Airton Neto</TableCell>
      <TableCell className='font-medium'>R$ 149,90</TableCell>
      <TableCell>
        <Button variant='outline' size='xs'>
          <ArrowRight className='mr-2 h-3 w-3' />
          <span>Aprovar</span>
        </Button>
      </TableCell>
      <TableCell>
        <Button variant='ghost' size='xs'>
          <X className='mr-2 h-3 w-3' />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
