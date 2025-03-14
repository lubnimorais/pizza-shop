import { useQuery } from '@tanstack/react-query';

import { z as zod } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { getManagerRestaurant } from '@/api/get-managed-restaurant';

import { Button } from '../ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const storeProfileSchema = zod.object({
  name: zod.string().min(1),
  description: zod.string(),
});

type IStoreProfileData = zod.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagerRestaurant,
  });

  const { register, handleSubmit } = useForm<IStoreProfileData>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form>
        <div className='space-y-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Nome
            </Label>

            <Input id='name' className='col-span-3' {...register('name')} />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Descrição
            </Label>

            <Textarea
              id='description'
              className='col-span-3'
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type='button' variant='ghost'>
            Cancelar
          </Button>
          <Button type='submit' variant='success'>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
