import { api } from '@/lib/axios';

export interface IGetMonthRevenueResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenueAmount() {
  const response = await api.get<IGetMonthRevenueResponse>(
    '/metrics/month-receipt'
  );

  return response.data;
}
