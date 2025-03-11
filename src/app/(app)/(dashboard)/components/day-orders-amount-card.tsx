import { Utensils } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function DayOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='font-semibold text-base'>Pedidos (dia)</CardTitle>

        <Utensils className='h-4 w-4 text-muted-foreground' />
      </CardHeader>

      <CardContent className='space-y-1'>
        <span className='font-bold text-2xl tracking-tight'>10</span>

        <p className='text-xs text-muted-foreground'>
          <span className='text-rose-500 dark:text-rose-400'>-1%</span> em
          relação a ontem
        </p>
      </CardContent>
    </Card>
  );
}
