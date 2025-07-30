import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '24/07', revenue: 2000 },
  { date: '25/07', revenue: 840 },
  { date: '26/07', revenue: 4000 },
  { date: '27/07', revenue: 1500 },
  { date: '28/07', revenue: 1000 },
  { date: '29/07', revenue: 5000 },
  { date: '30/07', revenue: 400 },
]

export function RevenueChart() {
  return (
    <Card className='col-span-6'>
      <CardHeader className='flex-row items-center justify-between pb-8'>
        <div className='space-y-1'>
          <CardTitle className='text-base font-medium'>Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <YAxis
              width={80}
              stroke='#888'
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }
            />
            <XAxis dataKey='date' stroke='#888' axisLine={false} tickLine={false} dy={16} />
            <CartesianGrid vertical={false} className='stroke-muted' />

            <Line
              type='linear'
              dataKey='revenue'
              strokeWidth={2}
              stroke={colors.violet['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
