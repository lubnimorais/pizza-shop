'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { z as zod } from 'zod';

import { getOrders } from '@/api/get-orders';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { OrderTableRow } from './order-table-row';
import { OrderTableFilter } from './order-table-filter';
import { Pagination } from '@/components/Pagination';

export function OrderTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  const customerName = searchParams.get('customerName');
  const status = searchParams.get('status');

  const pageIndex = zod.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1');

  const { data: resultOrder } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  });

  function handlePaginate(pageIndex: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', (pageIndex + 1).toString());

    const page = `${pathname}?${params.toString()}`;
    router.push(page);
  }

  return (
    <div className='space-y-2.5'>
      <OrderTableFilter />

      <div className='border rounded-md'>
        {/* livre para ser a maior coluna da tabela */}
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

          {resultOrder && (
            <TableBody>
              {resultOrder.orders.map((order) => (
                <OrderTableRow key={order.orderId} order={order} />
              ))}
            </TableBody>
          )}
        </Table>
      </div>

      {resultOrder && (
        <Pagination
          pageIndex={resultOrder.meta.pageIndex}
          totalCount={resultOrder.meta.totalCount}
          perPage={resultOrder.meta.perPage}
          onPageChange={handlePaginate}
        />
      )}
    </div>
  );
}
