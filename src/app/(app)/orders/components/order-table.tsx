'use client';

import { useQuery } from '@tanstack/react-query';

import { getOrders } from '@/api/get-orders';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { OrderTableRow } from './order-table-row';

export function OrderTable() {
  const { data: resultOrder } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[64px]' />
          <TableHead className='w-[140px]'>Identificador</TableHead>
          <TableHead className='w-[180px]'>Realizado há</TableHead>
          <TableHead className='w-[140px]'>Status</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className='w-[140px]'>Total do pedido</TableHead>
          <TableHead className='w-[164px]' />
          <TableHead className='w-[132px]' />
        </TableRow>
      </TableHeader>

      <TableBody>
        {resultOrder &&
          resultOrder.orders.map((order) => (
            <OrderTableRow key={order.orderId} order={order} />
          ))}
      </TableBody>
    </Table>
  );
}
