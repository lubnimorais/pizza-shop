'use client';

import { useQuery } from '@tanstack/react-query';

import { Building, ChevronDown, LogOut } from 'lucide-react';

import { getProfile } from '@/api/get-profile';
import { getManagerRestaurant } from '@/api/get-managed-restaurant';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function AccountMenu() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagerRestaurant,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/**
         * select-none : as vezes quando fecha e abre o menu rápido
         * o navegador entende que é como se estivesse dando dois
         * cliques para selecionar o texto do botão
         */}
        <Button
          variant='outline'
          className='flex items-center gap-2 select-none'
        >
          {managedRestaurant?.name}
          <ChevronDown className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-56'>
        {/* ITEM NÃO CLICÁVEL */}
        <DropdownMenuLabel className='flex flex-col'>
          <span>{profile?.name}</span>

          <span className='font-normal text-xs text-muted-foreground'>
            {profile?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* ITEM CLICÁVEL */}
        <DropdownMenuItem>
          <Building className='w-4 h-4 mr-2' />

          <span>Perfil da loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className='text-rose-500 dark:text-rose-400'>
          <LogOut className='w-4 h-4 mr-2' />

          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
