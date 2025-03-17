import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Search, X } from 'lucide-react';

import { z as zod } from 'zod';

import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const orderFilterSchema = zod.object({
  orderId: zod.string().optional(),
  customerName: zod.string().optional(),
  status: zod.string().optional(),
});

type IOrderFilterData = zod.infer<typeof orderFilterSchema>;

export function OrderTableFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  const customerName = searchParams.get('customerName');
  const status = searchParams.get('status');

  const { register, handleSubmit, control, reset } = useForm<IOrderFilterData>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  });

  function handleFilter({ orderId, customerName, status }: IOrderFilterData) {
    const params = new URLSearchParams(searchParams.toString());

    if (orderId) {
      params.set('orderId', orderId);
    } else {
      params.delete('orderId');
    }

    if (customerName) {
      params.set('customerName', customerName);
    } else {
      params.delete('customerName');
    }

    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    /**
     * QUANDO FILTRAR É BOM QUE VOLTE PARA A PRIMEIRA PÁGINA
     * PORQUE O TAMANHO DA LISTA VAI DIMINUIR
     */
    const page = `${pathname}?${params.toString()}`;
    router.push(page);
  }

  function handleClearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('orderId');
    params.delete('customerName');
    params.delete('status');

    params.set('page', '1');

    const page = `${pathname}?${params.toString()}`;
    router.push(page);

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className='flex items-center gap-2'
    >
      <span className='font-semibold text-sm'>Filtros:</span>

      <Input
        placeholder='ID o pedido'
        className='h-8 w-auto'
        {...register('orderId')}
      />

      <Input
        placeholder='Nome do cliente'
        className='h-8 w-[320px]'
        {...register('customerName')}
      />

      <Controller
        control={control}
        name='status'
        render={({ field: { name, value, onChange, disabled } }) => (
          <Select
            name={name}
            defaultValue='all'
            disabled={disabled}
            value={value}
            onValueChange={(text) => {
              onChange(text);
            }}
          >
            <SelectTrigger className='h-8 w-[180px]'>
              {/* exibe o texto do item selecionado atualmente pelo usuário */}
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='all'>Todos status</SelectItem>
              <SelectItem value='pending'>Pendente</SelectItem>
              <SelectItem value='canceled'>Cancelado</SelectItem>
              <SelectItem value='processing'>Em preparo</SelectItem>
              <SelectItem value='delivering'>Em entrega</SelectItem>
              <SelectItem value='delivered'>Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type='submit' variant='secondary' size='xs'>
        <Search className='h-4 w-4 mr-2' />
        Filtra resultados
      </Button>

      <Button
        type='button'
        variant='outline'
        size='xs'
        onClick={handleClearFilters}
      >
        <X className='h-4 w-4 mr-2' />
        Remover filtros
      </Button>
    </form>
  );
}
