import type { Metadata } from 'next';

import { OrderTable } from './components/order-table';

export const metadata: Metadata = {
  title: 'Pedidos | pizza.shop',
};

export default function OrdersPage() {
  return (
    <div className='flex flex-col gap-4'>
      {/**
       * tracking-tight: Reduz o espaçamento entre as letras (letter space)
       */}
      <h1 className='font-bold text-3xl tracking-tight'>Pedidos</h1>

      <OrderTable />
    </div>
  );
}
