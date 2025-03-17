'use client';

import { ArrowRight, Search, X } from 'lucide-react';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { OrderDetails } from './order-details';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { OrderStatus } from '@/components/OrderStatus';

interface IOrderTableRow {
  order: {
    orderId: string;
    createdAt: string;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: IOrderTableRow) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' size='xs'>
              {/**
               * como o botão para o leitor de tela não quer dizer nada
               * vamos colocar um span e colocar ele como sr-only para
               * ser visível para o leitor de tela
               */}
              <Search className='h3- w-3' />
              <span className='sr-only'>Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
        </Dialog>
      </TableCell>

      <TableCell className='font-mono font-medium text-xs'>
        {order.orderId}
      </TableCell>

      <TableCell className='text-muted-foreground'>
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className='font-medium'>{order.customerName}</TableCell>

      <TableCell className='font-medium'>
        {order.total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      <TableCell>
        <Button variant='outline' size='xs'>
          <ArrowRight className='h-3 w-3 mr-2' />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button variant='ghost' size='xs'>
          <X className='h-3 w-3 mr-2' />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
