'use client';

import { useQuery } from '@tanstack/react-query';

import { DollarSign } from 'lucide-react';

import { getMonthRevenueAmount } from '@/api/get-month-revenue';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MetricCardSkeleton } from './metric-card-skeleton';

export function MonthRevenueCard() {
  const { data: monthRevenueAmount } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenueAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">
          Receita total (mês)
        </CardTitle>

        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenueAmount ? (
          <>
            <span className="font-bold text-2xl tracking-tight">
              {(monthRevenueAmount.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthRevenueAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenueAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthRevenueAmount.diffFromLastMonth}%
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
