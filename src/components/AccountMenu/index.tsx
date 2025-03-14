'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Building, ChevronDown, LogOut } from 'lucide-react';

import { Skeleton } from '../ui/skeleton';

import { getProfile } from '@/api/get-profile';
import { getManagerRestaurant } from '@/api/get-managed-restaurant';
import { signOut } from '@/api/sign-out';

import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { StoreProfileDialog } from '../StoreProfileDialog';

export function AccountMenu() {
  const router = useRouter();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagerRestaurant,
      staleTime: Number.POSITIVE_INFINITY, // tempo para a informação ficar desatualizada (obsoleto)
    });
  // Infinity porque os dados do restaurante não são dados que ficam mudando o tempo todo

  const { mutateAsync: signOutMutate, isPending: isLoadingSignOut } =
    useMutation({
      mutationFn: signOut,
      onSuccess: () => {
        // VAI SUBSTITUIR A ROTA AO INVÉS DE ENVIAR O USUÁRIO PARA UMA NOVA ROTA
        // VAI FAZER COM QUE O USUÁRIO NÃO POSSA CLICAR NO BOTÃO DE VOLTAR
        // E VOLTAR NOVAMENTE PARA A DASHBOARD
        router.replace('/auth/signin');
      },
    });

  return (
    <Dialog>
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
            {isLoadingManagedRestaurant ? (
              <Skeleton className='h-4 w-40' />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-56'>
          {/* ITEM NÃO CLICÁVEL */}
          <DropdownMenuLabel className='flex flex-col'>
            {isLoadingProfile ? (
              <div className='space-y-1.5'>
                <Skeleton className='h-4 w-32' />

                <Skeleton className='h-3 w-24' />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>

                <span className='font-normal text-xs text-muted-foreground'>
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* ITEM CLICÁVEL */}
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className='w-4 h-4 mr-2' />

              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className='text-rose-500 dark:text-rose-400'
            disabled={isLoadingSignOut}
          >
            <button className='w-full' onClick={() => signOutMutate()}>
              <LogOut className='w-4 h-4 mr-2' />

              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
}
