import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <Button variant="outline" size="xs" disabled>
            {/**
             * como o botão para o leitor de tela não quer dizer nada
             * vamos colocar um span e colocar ele como sr-only para
             * ser visível para o leitor de tela
             */}
            <Search className="h3- w-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[148px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[110px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[64px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[92]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
      </TableRow>
    );
  });
}
