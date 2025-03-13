'use client';

import { useSearchParams } from 'next/navigation';

import { z as zod } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from '@/api/sign-in';

const signInFormSchema = zod.object({
  email: zod.string().email(),
});

type ISignInFormData = zod.infer<typeof signInFormSchema>;

export function FormSignIn() {
  const searchParams = useSearchParams();
  console.log('🚀 ~ FormSignIn ~ searchParams:', searchParams);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ISignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') || '',
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSingIn({ email }: ISignInFormData) {
    try {
      await authenticate({ email });

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSingIn,
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
