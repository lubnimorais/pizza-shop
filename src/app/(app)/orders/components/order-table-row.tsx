import { useState } from 'react';

import { ArrowRight, Search, X } from 'lucide-react';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelOrder, type ICancelOrderParams } from '@/api/cancel-order';
import type { IGetOrdersResponse } from '@/api/get-orders';

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
  const [isDetailsOpen, setIsDetailOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: cancelOrderMutate } = useMutation({
    mutationFn: ({ orderId }: ICancelOrderParams) => cancelOrder({ orderId }),
    onSuccess: async (_, { orderId }) => {
      /**
       * A LISTAGEM DE PEDIDOS NÃO TEM SOMENTE UMA QUERY SENDO FEITA
       * A LISTA E PEDIDOS ESTÁ DISTRIBUÍDA EM VÁRIAS QUERIES KEYS
       * SÓ QUE É COMUM ENTRE ELAS É QUE TODAS TEM A CHAVE 'ORDERS'
       * TODAS COMEÇAM COM 'ORDERS'
       */
      const ordersListCache = queryClient.getQueriesData<IGetOrdersResponse>({
        queryKey: ['orders'],
      });

      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return;
        }

        queryClient.setQueryData<IGetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: 'canceled',
              };
            }

            return order;
          }),
        });
      });
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog
          open={isDetailsOpen}
          onOpenChange={(value) => {
            setIsDetailOpen(value);
          }}
        >
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

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
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
        {(order.total / 100).toLocaleString('pt-BR', {
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
        <Button
          variant='ghost'
          size='xs'
          disabled={!['pending', 'processing'].includes(order.status)}
          onClick={() => cancelOrderMutate({ orderId: order.orderId })}
        >
          <X className='h-3 w-3 mr-2' />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
