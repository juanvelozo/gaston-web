import api from '../../../api/api';
import { IRefreshTokenResponse } from '../model/auth.controller';

export async function postRefreshToken(
  userId: number,
  refreshToken: string
): Promise<IRefreshTokenResponse> {
  try {
    console.log('Actualizando token...');

    const response = await api.post<IRefreshTokenResponse>('/auth/refresh', {
      userId,
      refreshToken,
    });

    console.log('Token actualizado exitosamente');
    return response.data;
  } catch (error) {
    console.error('Error en refresh token', error);
    throw error;
  }
}
