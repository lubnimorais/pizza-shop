import { render } from '@testing-library/react';

import useEvent from '@testing-library/user-event';

import { Pagination } from '.';

// spy
const onPageChangeCallback = vi.fn();

describe('Component: Pagination', () => {
  beforeEach(() => {
    // limpando a chamada para cada teste
    onPageChangeCallback.mockClear();
  });

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument();
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument();
  });

  it('should be able to navigate to the next page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );

    // PERMITE BUSCAR ELEMENTO PELA ROLE (CARGO), QUE VEM DO ARIA-ROLE
    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    });

    const user = useEvent.setup();

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it('should be able to navigate to the previous page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={3}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );

    // PERMITE BUSCAR ELEMENTO PELA ROLE (CARGO), QUE VEM DO ARIA-ROLE
    const nextPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    });

    const user = useEvent.setup();

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(2);
  });

  it('should be able to navigate to the first page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={3}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );

    // PERMITE BUSCAR ELEMENTO PELA ROLE (CARGO), QUE VEM DO ARIA-ROLE
    const nextPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    });

    const user = useEvent.setup();

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it('should be able to navigate to the last page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );

    // PERMITE BUSCAR ELEMENTO PELA ROLE (CARGO), QUE VEM DO ARIA-ROLE
    const nextPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    });

    const user = useEvent.setup();

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});
