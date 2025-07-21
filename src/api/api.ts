import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { signOut } from '../modules/auth/api/Logout.api';

// Enum con los posibles entornos
export enum EnvironmentsEnum {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}

// URL del backend por entorno
const envConfig = {
  [EnvironmentsEnum.LOCAL]: 'http://localhost:3000',
  [EnvironmentsEnum.DEV]: process.env.REACT_APP_SERVER_DEV!,
  [EnvironmentsEnum.PROD]: process.env.REACT_APP_SERVER_PROD!,
};

// Detectamos el entorno actual desde variables de entorno
const serverEnvironment = process.env.REACT_APP_SERVER as EnvironmentsEnum;

// Verificación básica para evitar errores de configuración
if (!serverEnvironment) throw new Error('SERVER environment variable is not set');

if (serverEnvironment !== 'prod') {
  console.log('🎯 Le estamos apuntando al servidor:', serverEnvironment);
}

// Creamos la instancia de axios con configuración común
const api = axios.create({
  baseURL: envConfig[serverEnvironment],
  timeout: 10000,
  withCredentials: true, // Importante: permite enviar cookies HTTP-only automáticamente
});

// Variables para manejar múltiples requests fallidos simultáneamente
let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = [];

/**
 * Procesa la cola de requests que fallaron con 401 mientras se refrescaba el token.
 * Si el refresh fue exitoso, reintenta las requests originales.
 * Si falló, rechaza todas con el error.
 */
const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(true)));
  failedQueue = [];
};

const habiaSesionIniciada = Boolean(localStorage.getItem('user_id'));

/**
 * Limpia la sesión del usuario y hace logout si corresponde.
 */
const clearSession = async () => {
  if (habiaSesionIniciada) {
    localStorage.clear();
    try {
      await signOut();
    } catch (err) {
      console.warn('Error signing out:', err);
    }
  }
};

// Interceptor de requests (podés agregar tokens manuales si no usás cookies)
api.interceptors.request.use((config) => config, Promise.reject);

// Interceptor de respuestas para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const is401 = error.response?.status === 401;
    const isRefreshEndpoint = originalRequest?.url === '/auth/refresh';

    // Si el token expiró y no estamos ya reintentando, intentamos refrescarlo
    if (is401 && !isRefreshEndpoint && !originalRequest._retry) {
      originalRequest._retry = true;

      // Si ya estamos refrescando, encolamos esta request y esperamos
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        // El navegador envía automáticamente el refresh_token como cookie
        await api.post('/auth/refresh');

        isRefreshing = false;
        processQueue(null); // Resolvemos todas las requests en espera

        // Reintentamos la original
        return api(originalRequest);
      } catch (refreshError: any) {
        isRefreshing = false;
        processQueue(refreshError); // Rechazamos todas las requests en espera

        await clearSession();
        return Promise.reject(refreshError);
      }
    }

    // Si el refresh falla (ej: refresh token expirado o inválido)
    if (error.response?.status === 403 && isRefreshEndpoint) {
      console.log('⚠️ Refresh token inválido o expirado.');
      await clearSession();
    }

    // Mensaje de error específico desde el backend (opcional)
    const mensaje = (error.response?.data as any)?.message?.[0];
    if (mensaje === 'Usuario no encontrado') {
      console.log('⚠️ Usuario eliminado.');
    }

    return Promise.reject(error); // Rechazamos el error original si no es recuperable
  }
);

export default api;
