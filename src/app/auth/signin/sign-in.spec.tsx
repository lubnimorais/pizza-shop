import { render } from '@testing-library/react';

import SignInPage from './page';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';

describe('Page: SignIn', () => {
  it('should set default e-mail input value if e-mail is present on search params', () => {
    vi.mock('next/navigation', () => ({
      useSearchParams() {
        return {
          get: () => {
            return 'johndoe@test.com';
          },
        };
      },
    }));

    const wrapper = render(<SignInPage />, {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        );
      },
    });

    const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement;

    expect(emailInput.value).toEqual('johndoe@test.com');
  });
});
