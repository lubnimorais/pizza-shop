'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const navigation = useRouter();

  function handleNavigationGoBack() {
    navigation.back();
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-2'>
      <h1 className='font-bold text-4xl'>Página não encontrada</h1>

      <p className='text-accent-foreground'>
        Voltar para página{' '}
        <button
          onClick={handleNavigationGoBack}
          className='text-sky-500 dark:text-sky-400'
        >
          anterior
        </button>
      </p>
    </div>
  );
}
