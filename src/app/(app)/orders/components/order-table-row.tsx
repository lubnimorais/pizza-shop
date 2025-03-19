import { useState } from 'react';

import { ArrowRight, Search, X } from 'lucide-react';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelOrder, type ICancelOrderParams } from '@/api/cancel-order';
import type { IGetOrdersResponse } from '@/api/get-orders';
import { approveOrder, type IApproveOrderParams } from '@/api/approve-order';
import { deliverOrder, type IDeliverOrderParams } from '@/api/deliver-order';

import { OrderDetails } from './order-details';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';

import { type IOrderStatus, OrderStatus } from '@/components/OrderStatus';
import { dispatchOrder, type IDispatchOrderParams } from '@/api/dispatch-order';

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

  function updateOrderStatusOnCache(orderId: string, status: IOrderStatus) {
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
              status,
            };
          }

          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderMutate, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: ({ orderId }: ICancelOrderParams) => cancelOrder({ orderId }),
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'canceled');
      },
    });

  const { mutateAsync: approveOrderMutate, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: ({ orderId }: IApproveOrderParams) =>
        approveOrder({ orderId }),
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'processing');
      },
    });

  const { mutateAsync: dispatchOrderMutate, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: ({ orderId }: IDispatchOrderParams) =>
        dispatchOrder({ orderId }),
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivering');
      },
    });

  const { mutateAsync: deliverOrderMutate, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: ({ orderId }: IDeliverOrderParams) =>
        deliverOrder({ orderId }),
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivered');
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
        {order.status === 'pending' && (
          <Button
            variant='outline'
            size='xs'
            disabled={isApprovingOrder}
            onClick={() => approveOrderMutate({ orderId: order.orderId })}
          >
            <ArrowRight className='h-3 w-3 mr-2' />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant='outline'
            size='xs'
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderMutate({ orderId: order.orderId })}
          >
            <ArrowRight className='h-3 w-3 mr-2' />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant='outline'
            size='xs'
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderMutate({ orderId: order.orderId })}
          >
            <ArrowRight className='h-3 w-3 mr-2' />
            Entregue
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          variant='ghost'
          size='xs'
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderMutate({ orderId: order.orderId })}
        >
          <X className='h-3 w-3 mr-2' />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
