import { render } from '@testing-library/react';
import { NavLink } from '.';
import { usePathname, useRouter } from 'next/navigation';

describe('Component: NavLink', () => {
  it('should highlight the nav link when is the current page link', () => {
    vi.mock('next/navigation', () => ({
      usePathname() {
        return '/about';
      },
    }));

    const wrapper = render(
      <>
        <NavLink href="/">Home</NavLink>

        <NavLink href="/about">About</NavLink>
      </>
    );

    expect(wrapper.getByText('Home').dataset.current).toEqual('false');
    expect(wrapper.getByText('About').dataset.current).toEqual('true');
  });
});
