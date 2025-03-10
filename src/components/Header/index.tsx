import { Home, Pizza, UtensilsCrossed } from 'lucide-react';

import { Separator } from '../ui/separator';

import { NavLink } from '../NavLink';
import { ThemeToggle } from '../Theme/ThemeToggle';
import { AccountMenu } from '../AccountMenu';

export function Header() {
  return (
    <div className='border-b'>
      <div className='h-16 flex items-center gap-6 px-6'>
        <Pizza className='w-6 h-6' />

        <Separator orientation='vertical' className='h-6' />

        <nav className='flex items-center space-x-4 lg:space-x-6'>
          <NavLink href='/'>
            <Home className='w-4 h-4' />
            Início
          </NavLink>

          <NavLink href='/orders'>
            <UtensilsCrossed className='w-4 h-4' />
            Pedidos
          </NavLink>
        </nav>

        <div className='flex items-center gap-2 ml-auto'>
          <ThemeToggle />

          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
