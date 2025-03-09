'use client';

import { z as zod } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const signInFormSchema = zod.object({
  email: zod.string().email(),
});

type ISignInFormData = zod.infer<typeof signInFormSchema>;

export function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ISignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  async function handleSingIn({ email }: ISignInFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSubmit(handleSingIn),
        },
      });
    } catch (err) {
      toast.error('Credenciais inválidas');
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSingIn)} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Seu e-mail</Label>

        <Input id='email' type='email' {...register('email')} />
      </div>

      <Button disabled={isSubmitting} className='w-full' type='submit'>
        Acessar painel
      </Button>
    </form>
  );
}
