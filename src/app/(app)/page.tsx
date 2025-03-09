import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Dashboard | pizza.shop',
};

export default function DashboardPage() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Button>dsds</Button>
    </div>
  );
}
