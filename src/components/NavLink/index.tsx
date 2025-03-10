'use client';

import type { ReactNode } from 'react';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface INavLinkProps extends LinkProps {
  children: ReactNode;
}

export function NavLink({ children, ...props }: INavLinkProps) {
  // PEGAR CAMINHO DA ROTA ATUAL
  const pathName = usePathname();

  return (
    <Link
      data-current={pathName === props.href}
      className='flex items-center gap-1.5 font-medium text-sm text-muted-foreground hover:text-foreground data-[current=true]:text-foreground'
      {...props}
    >
      {children}
    </Link>
  );
}
