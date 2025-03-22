import { render } from '@testing-library/react';
import { OrderStatus } from '.';

describe('Component: Order Status', () => {
  it('should display the right text when order status is pending', () => {
    // Pending
    const wrapper = render(<OrderStatus status="pending" />);

    // MOSTRA NO TERMINAL O HTML GERADO DESTA RENDERIZAÇÃO
    // wrapper.debug();

    const statusText = wrapper.getByText('Pendente');
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-slate-400');
  });

  it('should display the right text when order status is canceled', () => {
    // Pending
    const wrapper = render(<OrderStatus status="canceled" />);

    // MOSTRA NO TERMINAL O HTML GERADO DESTA RENDERIZAÇÃO
    // wrapper.debug();

    const statusText = wrapper.getByText('Cancelado');
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-rose-500');
  });

  it('should display the right text when order status is delivering', () => {
    // Pending
    const wrapper = render(<OrderStatus status="delivering" />);

    // MOSTRA NO TERMINAL O HTML GERADO DESTA RENDERIZAÇÃO
    // wrapper.debug();

    const statusText = wrapper.getByText('Em entrega');
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-amber-400');
  });

  it('should display the right text when order status is processing', () => {
    // Pending
    const wrapper = render(<OrderStatus status="processing" />);

    // MOSTRA NO TERMINAL O HTML GERADO DESTA RENDERIZAÇÃO
    // wrapper.debug();

    const statusText = wrapper.getByText('Em preparo');
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-amber-400');
  });

  it('should display the right text when order status is delivered', () => {
    // Pending
    const wrapper = render(<OrderStatus status="delivered" />);

    // MOSTRA NO TERMINAL O HTML GERADO DESTA RENDERIZAÇÃO
    // wrapper.debug();

    const statusText = wrapper.getByText('Entregue');
    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-emerald-400');
  });
});
