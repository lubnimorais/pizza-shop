'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import { useRouter } from 'next/navigation';

import { api } from '@/lib/axios';

type IAuthProviderProps = {
  children: ReactNode;
};

type IAuthContextDataProps = {
  signOut: () => Promise<void>;
};

const AuthContext = createContext<IAuthContextDataProps>(
  {} as IAuthContextDataProps
);

function AuthProvider({ children }: IAuthProviderProps) {
  const router = useRouter();

  const signOut = useCallback(async () => {
    try {
      router.replace('/auth/signin');
    } catch (error) {
      throw error;
    }
  }, []);

  // END FUNCTIONS

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be use whiting an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
