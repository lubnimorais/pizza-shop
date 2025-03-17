import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '../ui/button';

interface IPaginationProps {
  pageIndex: number; // página atual
  totalCount: number; // total de itens
  perPage: number; // número de registro por páginas
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: IPaginationProps) {
  // NÚMERO TOTAL DE PÁGINAS
  // CASO NÃO RETORNE UM NÚMERO VÁLIDO (DIVISÃO POR ZERO), RETORNA 1
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className='flex items-center justify-between'>
      <span className='text-muted-foreground text-sm'>
        Total de {totalCount} item(s)
      </span>

      <div className='flex items-center gap-6 lg:gap-8'>
        <div className='font-medium text-sm'>
          Página {pageIndex + 1} de {pages}
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
            className='h-8 w-8 p-0'
          >
            <ChevronsLeft className='h-4 w-4' />
            <span className='sr-only'>Primeira página</span>
          </Button>

          <Button
            variant='outline'
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            className='h-8 w-8 p-0'
          >
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Página anterior</span>
          </Button>

          <Button
            variant='outline'
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
            className='h-8 w-8 p-0'
          >
            <ChevronRight className='h-4 w-4' />
            <span className='sr-only'>Próxima página</span>
          </Button>

          <Button
            variant='outline'
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
            className='h-8 w-8 p-0'
          >
            <ChevronsRight className='h-4 w-4' />
            <span className='sr-only'>Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
