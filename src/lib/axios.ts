import axios, {
  isAxiosError,
  type AxiosError,
  type AxiosInstance,
} from 'axios';

type IAPIInstanceProps = AxiosInstance & {
  /**
   * GERENCIAR A INTERCEPTAÇÃO DO TOKEN
   * UMA FUNÇÃO QUE RECEBE OUTRA FUNÇÃO
   * NA PRIMEIRA FUNÇÃO RECEBEMOS O MÉTODO DE SIGNOUT
   * NA SEGUNDA FUNÇÃO VAI SER O INTERCEPTOR
   */
  registerInterceptTokenManager: (signOut: SingOut) => () => void;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // COM QUE OS COOKIES DO FRONT-END SEJAM ENVIADOS AUTOMATICAMENTE PARA O BACK-END
}) as IAPIInstanceProps;

if (process.env.NEXT_PUBLIC_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000))
    );

    return config;
  });
}

type SingOut = () => void;

api.registerInterceptTokenManager = (signOut) => {
  const interceptorId = api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const code = error.response?.data.code;

        if (status === 401 && code === 'UNAUTHORIZED') {
          signOut();
        }
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptorId);
  };
};
