import api from '../../../api/api';
import { handleApiError } from '../../../api/apiError';

export async function signOut() {
  try {
    const response = await api.post('/auth/logout', { userId: 1 });

    console.log('Sesión cerrada exitosamente', { response });

    return response;
  } catch (error) {
    console.log('Hubo un error al cerrar la sesión', error);
    handleApiError(error);
  }
}
