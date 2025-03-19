import type { ReactNode } from 'react';

import { AuthProvider } from './auth';

type IAppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: IAppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
