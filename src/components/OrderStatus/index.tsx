export type IOrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered';

interface IOrderStatusProps {
  status: IOrderStatus;
}

// PARA CASA STATUS, COLOCAR UM TEXTO
const orderStatusMap: Record<IOrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
};

export function OrderStatus({ status }: IOrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-slate-400"
        />
      )}

      {status === 'canceled' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-rose-500"
        />
      )}

      {status === 'delivered' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-emerald-400"
        />
      )}

      {['processing', 'delivering'].includes(status) && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-amber-400"
        />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
