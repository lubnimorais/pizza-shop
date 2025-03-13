import { api } from '@/lib/axios';

interface IGetManagerRestaurantResponse {
  id: string;
  name: string;
  description: string | null;
  managerId: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getManagerRestaurant(): Promise<IGetManagerRestaurantResponse> {
  const response = await api.get<IGetManagerRestaurantResponse>(
    '/managed-restaurant'
  );

  return response.data;
}
