import { api } from '@/lib/axios';

interface IGetDailyRevenueInPeriodQuery {
  from?: Date | null;
  to?: Date | null;
}

export type IGetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod({
  from,
  to,
}: IGetDailyRevenueInPeriodQuery) {
  const response = await api.get<IGetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    }
  );
  console.log('🚀 ~ response:', response.data);

  return response.data;
}
