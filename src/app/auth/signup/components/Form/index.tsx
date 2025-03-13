'use client';

import { useRouter } from 'next/navigation';

import { z as zod } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { registerRestaurant } from '@/api/register-restaurant';

import { useMutation } from '@tanstack/react-query';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const signUpFormSchema = zod.object({
  restaurantName: zod.string(),
  managerName: zod.string(),
  phone: zod.string(),
  email: zod.string().email(),
});

type ISignUpFormData = zod.infer<typeof signUpFormSchema>;

export function FormSignUp() {
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ISignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutateAsync: registerRestaurantMutate } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSingUp({
    restaurantName,
    managerName,
    email,
    phone,
  }: ISignUpFormData) {
    try {
      await registerRestaurantMutate({
        restaurantName,
        managerName,
        email,
        phone,
      });

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => {
            return navigate.push(`/auth/signin?email=${email}`);
          },
        },
      });
    } catch (err) {
      toast.error('Erro ao cadastrar o restaurante');
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSingUp)} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>

        <Input
          id='restaurantName'
          type='text'
          {...register('restaurantName')}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='managerName'>Seu nome</Label>

        <Input id='managerName' type='text' {...register('managerName')} />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Seu e-mail</Label>

        <Input id='email' type='email' {...register('email')} />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phone'>Seu celular</Label>

        <Input id='phone' type='tel' {...register('phone')} />
      </div>

      <Button disabled={isSubmitting} className='w-full' type='submit'>
        Finalizar cadastro
      </Button>

      <p className='px-6 text-sm text-center text-muted-foreground leading-relaxed'>
        Ao continuar, você concorda com nossos{' '}
        <a className='underline underline-offset-4' href='/'>
          termos de serviço
        </a>{' '}
        e{' '}
        <a className='underline underline-offset-4' href='/'>
          políticas de privacidade
        </a>
        .
      </p>
    </form>
  );
}
