import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { z as zod } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import {
  getManagerRestaurant,
  type IGetManagerRestaurantResponse,
} from '@/api/get-managed-restaurant';
import { updateProfile } from '@/api/update-profile';

import { Button } from '../ui/button';
import {
  DialogClose,
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
  description: zod.string().nullable(),
});

type IStoreProfileData = zod.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagerRestaurant,
    staleTime: Number.POSITIVE_INFINITY, // tempo para a informação ficar desatualizada (obsoleto)
  });
  // Infinity porque os dados do restaurante não são dados que ficam mudando o tempo todo

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IStoreProfileData>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  });

  function updateManagedRestaurantCache({
    name,
    description,
  }: IStoreProfileData) {
    // AS INFORMAÇÕES ACIMA, SÃO AS QUE FORAM PASSADAS PARA ATUALIZAR OS DADOS
    // ATUALIZAR AS INFORMAÇÕES QUE ESTÃO NO CACHE
    const cached = queryClient.getQueryData<IGetManagerRestaurantResponse>([
      'managed-restaurant',
    ]);

    if (cached) {
      queryClient.setQueryData<IGetManagerRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        }
      );
    }

    // RETORNA AS INFORMAÇÕES ANTERIORES PARA SEREM USADAS EM CASO DE ERRO
    return { cached };
  }

  const { mutateAsync: updateProfileMutate } = useMutation({
    mutationFn: updateProfile,
    // onSuccess: (_, { name, description }) => {
    //   // AS INFORMAÇÕES ACIMA, SÃO AS QUE FORAM PASSADAS PARA ATUALIZAR OS DADOS
    //   // ATUALIZAR AS INFORMAÇÕES QUE ESTÃO NO CACHE
    //   const cached = queryClient.getQueryData<IGetManagerRestaurantResponse>([
    //     'managed-restaurant',
    //   ]);

    //   if (cached) {
    //     queryClient.setQueryData<IGetManagerRestaurantResponse>(
    //       ['managed-restaurant'],
    //       {
    //         ...cached,
    //         name,
    //         description,
    //       }
    //     );
    //   }
    // },
    onMutate: ({ name, description }) => {
      const { cached } = updateManagedRestaurantCache({ name, description });

      // RETORNA AS INFORMAÇÕES ANTERIORES
      return { previousProfile: cached };
    },
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        // ENVIA AS INFORMAÇÕES ANTERIORES PARA O USUÁRIO VISUALIZAR
        updateManagedRestaurantCache({
          name: context.previousProfile.name,
          description: context.previousProfile.description,
        });
      }
    },
  });

  async function handleUpdateProfile({ name, description }: IStoreProfileData) {
    try {
      await updateProfileMutate({ name, description });

      toast.success('Perfil atualizado com sucesso!');
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!');
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
          <DialogClose asChild>
            <Button type='button' variant='ghost'>
              Cancelar
            </Button>
          </DialogClose>

          <Button type='submit' variant='success' disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
