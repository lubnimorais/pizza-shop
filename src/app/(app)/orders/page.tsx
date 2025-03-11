import type { Metadata } from 'next';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderTableRow } from './components/OrderTableRow';
import { OrderTableFilter } from './components/order-table-filter';

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
              {Array.from({ length: 10 }).map((_, index) => (
                <OrderTableRow key={index.toString()} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
