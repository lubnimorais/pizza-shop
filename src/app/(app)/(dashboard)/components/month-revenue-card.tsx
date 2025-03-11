import { DollarSign } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function MonthRevenueCard() {
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='font-semibold text-base'>
          Receita total (mês)
        </CardTitle>

        <DollarSign className='h-4 w-4 text-muted-foreground' />
      </CardHeader>

      <CardContent className='space-y-1'>
        <span className='font-bold text-2xl tracking-tight'>R$ 1.500,00</span>

        <p className='text-xs text-muted-foreground'>
          <span className='text-emerald-500 dark:text-emerald-400'>+2%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
