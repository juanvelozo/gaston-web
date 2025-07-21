import api from '../../../api/api';

import { ILoginRequest } from '../model/auth.model';
import { handleApiError } from '../../../api/apiError';
import { toast } from 'sonner';
import { ILoginResponse } from '../model/auth.controller';

export async function postLogin(body: ILoginRequest): Promise<ILoginResponse | undefined> {
  try {
    console.log('Iniciando sesión...');
    const response = await api.post<ILoginResponse>('/auth/signin', body);

    return response.data;
  } catch (error) {
    console.log('Hubo un error al iniciar sesión', error);
    handleApiError(error);
  }
}
