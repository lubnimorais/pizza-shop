'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { ArrowRight, Search, X } from 'lucide-react';

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Button variant='outline' size='xs'>
          {/**
           * como o botão para o leitor de tela não quer dizer nada
           * vamos colocar um span e colocar ele como sr-only para
           * ser visível para o leitor de tela
           */}
          <Search className='h3- w-3' />
          <span className='sr-only'>Detalhes do pedido</span>
        </Button>
      </TableCell>

      <TableCell className='font-mono font-medium text-xs'>
        212wqwqwqwq221212121
      </TableCell>

      <TableCell className='text-muted-foreground'>há 15 minutos</TableCell>

      <TableCell>
        <div className='flex items-center gap-2'>
          <span className='h-2 w-2 rounded-full bg-slate-400' />

          <span className='font-medium text-muted-foreground'>Pendente</span>
        </div>
      </TableCell>

      <TableCell className='font-medium'>John Doe</TableCell>

      <TableCell className='font-medium'>R$ 150,00</TableCell>

      <TableCell>
        <Button variant='outline' size='xs'>
          <ArrowRight className='h-3 w-3 mr-2' />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button variant='ghost' size='xs'>
          <X className='h-3 w-3 mr-2' />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
