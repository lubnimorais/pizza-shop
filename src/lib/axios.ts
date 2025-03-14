import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // COM QUE OS COOKIES DO FRONT-END SEJAM ENVIADOS AUTOMATICAMENTE PARA O BACK-END
});

if (process.env.NEXT_PUBLIC_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return config;
  });
}
