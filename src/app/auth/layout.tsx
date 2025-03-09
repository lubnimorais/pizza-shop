import { Pizza } from 'lucide-react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen grid grid-cols-2'>
      <div className='h-full flex flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground'>
        <div className='flex items-center gap-3 text-lg text-foreground'>
          <Pizza className='w-5 h-5' />

          <span className='font-semibold'>pizza.shop</span>
        </div>

        <footer className='text-sm'>
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className='flex flex-col items-center justify-center relative'>
        {children}
      </div>
    </div>
  );
}
