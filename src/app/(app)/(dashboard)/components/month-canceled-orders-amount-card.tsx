'use client';

import { useQuery } from '@tanstack/react-query';

import { DollarSign } from 'lucide-react';

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MetricCardSkeleton } from './metric-card-skeleton';

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amounts'],
    queryFn: getMonthCanceledOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">
          Cancelamentos (mês)
        </CardTitle>

        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount ? (
          <>
            <span className="font-bold text-2xl tracking-tight">
              {monthCanceledOrdersAmount.amount}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
