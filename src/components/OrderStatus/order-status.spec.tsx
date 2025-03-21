import { render } from '@testing-library/react';
import { OrderStatus } from '.';

describe('Component: Order Status', () => {
  it('should display the right text based on order status', () => {
    const wrapper = render(<OrderStatus status="pending" />);

    // MOSTRA NO TERMINAL O HTML GERADO DESTA RENDERIZAÇÃO
    // wrapper.debug();

    const statusText = wrapper.getByText('Pendente');

    expect(statusText).toBeVisible();
  });
});
