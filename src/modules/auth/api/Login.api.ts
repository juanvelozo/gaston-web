import api from '../../../api/api';
import { ILoginResponse } from '../model/auth.controller';
import { ILoginRequest } from '../model/auth.model';
import { handleApiError } from '../../../api/apiError';

export async function postLogin(body: ILoginRequest): Promise<ILoginResponse> {
  try {
    console.log('Iniciando sesión...');

    const response = await api.post<ILoginResponse>('/auth/signin', body);

    console.log('Sesión iniciada exitosamente', { response });
    return response.data;
  } catch (error) {
    console.log('Hubo un error al iniciar sesión', error);
    handleApiError(error);
  }
}
