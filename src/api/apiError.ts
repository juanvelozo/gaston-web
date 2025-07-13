import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ICustomError } from '../types/proyect.model';

export function handleApiError(error: unknown): never {
  console.log('Ocurrió un error en la petición', error);

  if (error instanceof AxiosError) {
    const isTimeout = error.code === 'ECONNABORTED';
    const noResponse = !error.response;

    if (isTimeout) {
      toast.error('Ocurrió un error', {
        description: ERROR_MESSAGES.TIMEOUT,
      });
    } else if (noResponse) {
      toast.error('Ocurrió un error', {
        description: ERROR_MESSAGES.NO_RESPONSE,
      });
    } else {
      const data = error.response?.data as ICustomError;

      if (data?.message && Array.isArray(data.message)) {
        data.message.forEach((m) =>
          toast.error('Ocurrió un error', {
            description: m,
          })
        );
      } else {
        toast.error('Ocurrió un error', {
          description: ERROR_MESSAGES.INVALID_FORMAT,
        });
      }
    }
  } else {
    toast.error('Ocurrió un error', {
      description: ERROR_MESSAGES.UNKNOWN,
    });
  }

  throw error;
}

const ERROR_MESSAGES = {
  TIMEOUT: 'El servidor tardó demasiado en responder. Intentalo de nuevo más tarde.',
  NO_RESPONSE: 'No se pudo conectar con el servidor. Verificá tu conexión a Internet.',
  INVALID_FORMAT: 'Error inesperado en la respuesta del servidor.',
  UNKNOWN: 'Se produjo un error desconocido.',
};
