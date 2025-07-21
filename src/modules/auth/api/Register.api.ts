import api from '../../../api/api';
import { handleApiError } from '../../../api/apiError';
import { ILoginResponse } from '../model/auth.controller';
import { IRegisterRequest } from '../model/auth.model';

export async function postRegister(body: IRegisterRequest): Promise<ILoginResponse> {
  try {
    console.log('Registrando usuario...');

    const response = await api.post<ILoginResponse>('/auth/signup', body);
    return response.data;
  } catch (error) {
    console.error('Error al registrar un usuario', error);
    handleApiError(error);
  }
}
