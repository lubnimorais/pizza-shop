interface IPaginationProps {
  pageIndex: number; // página atual
  totalCount: number; // total de itens
  perPage: number; // número de registro por páginas
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: IPaginationProps) {
  // NÚMERO TOTAL DE PÁGINAS
  // CASO NÃO RETORNE UM NÚMERO VÁLIDO (DIVISÃO POR ZERO), RETORNA 1
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className='flex items-center justify-between'>
      <span className='text-muted-foreground text-sm'>
        Total de {totalCount} item(s)
      </span>
    </div>
  );
}
