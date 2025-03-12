'use client';

import colors from 'tailwindcss/colors';

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const data = [
  {
    date: '10/03',
    revenue: 1200,
  },
  {
    date: '11/03',
    revenue: 900,
  },
  {
    date: '12/03',
    revenue: 700,
  },
  {
    date: '13/03',
    revenue: 1000,
  },
  {
    date: '14/03',
    revenue: 800,
  },
  {
    date: '15/03',
    revenue: 1300,
  },
  {
    date: '16/03',
    revenue: 1500,
  },
];

export function RevenueChart() {
  return (
    <Card className='col-span-6'>
      <CardHeader className='flex-row items-center justify-between pb-8'>
        <div className='space-y-1'>
          <CardTitle className='font-medium text-base'>
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width='100%' height={240}>
          <LineChart style={{ fontSize: 12 }} data={data}>
            <XAxis dataKey='date' axisLine={false} tickLine={false} dy={16} />

            <YAxis
              width={80}
              stroke='#888'
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />

            <CartesianGrid vertical={false} className='stroke-muted' />

            <Line
              type='linear'
              strokeWidth={2}
              dataKey='revenue'
              stroke={colors.violet[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
