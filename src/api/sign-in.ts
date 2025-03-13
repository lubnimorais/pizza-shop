import { api } from '@/lib/axios';

export interface iSignInBody {
  email: string;
}

export async function signIn({ email }: iSignInBody) {
  await api.post('/authenticate', { email });
}
