import type { Metadata } from 'next';

import { useQuery } from '@tanstack/react-query';

import { getOrders } from '@/api/get-orders';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderTableRow } from './components/order-table-row';
import { OrderTableFilter } from './components/order-table-filter';
import { Pagination } from '@/components/Pagination';
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

      <div className='space-y-2.5'>
        <OrderTableFilter />

        <div className='border rounded-md'>
          {/* livre para ser a maior coluna da tabela */}
          <OrderTable />
        </div>

        <Pagination pageIndex={0} totalCount={105} perPage={10} />
      </div>
    </div>
  );
}
