import { Header } from '@/components/Header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <div className='flex flex-1 flex-col gap-4 p-8 pt-6'>{children}</div>
    </div>
  );
}
