import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | pizza.shop',
};

export default function DashboardPage() {
  return (
    <div className='h-screen'>
      <h1>Dashboard</h1>
    </div>
  );
}
