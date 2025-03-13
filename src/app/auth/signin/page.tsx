import type { Metadata } from 'next';

import Link from 'next/link';

import { FormSignIn } from './components/Form';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Login | pizza.shop',
};

export default function SignInPage() {
  return (
    <div className='p-8'>
      <Button asChild variant='ghost' className='absolute right-8 top-8'>
        <Link href='/auth/signup'>Novo estabelecimento</Link>
      </Button>

      <div className='w-[350px] flex flex-col justify-center gap-6'>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Acessar painel
          </h1>

          <p className='text-sm text-muted-foreground'>
            Acompanhe suas vendas pelo painel do parceiro
          </p>
        </div>

        <FormSignIn />
      </div>
    </div>
  );
}
