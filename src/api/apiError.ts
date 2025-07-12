import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ICustomError } from '../types/proyect.model';

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ICustomError;

    if (data?.message && Array.isArray(data.message)) {
      data.message.forEach((m) => toast.error(m));
    }
  }

  throw error; // importante relanzarlo para que no se silencie
}
