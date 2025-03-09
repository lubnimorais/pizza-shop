import type { Metadata } from 'next';

import Link from 'next/link';

import { FormSignUp } from './components/Form';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Cadastro | pizza.shop',
};

export default function SignUpPage() {
  // const { register, handleSubmit } = useForm();

  return (
    <div className='p-8'>
      <Button asChild variant='ghost' className='absolute right-8 top-8'>
        <Link href='/auth/signin'>Fazer login</Link>
      </Button>

      <div className='w-[350px] flex flex-col justify-center gap-6'>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Criar conta grátis
          </h1>

          <p className='text-sm text-muted-foreground'>
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

        <FormSignUp />
      </div>
    </div>
  );
}
