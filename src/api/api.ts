import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export enum EnvironmentsEnum {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}

type EnvConfig = {
  [x in EnvironmentsEnum]: string;
};

const envConfig: EnvConfig = {
  [EnvironmentsEnum.LOCAL]: 'http://localhost:3000', // Asegúrate de que este es el puerto de tu backend
  [EnvironmentsEnum.DEV]: process.env.REACT_APP_SERVER_DEV as string,
  [EnvironmentsEnum.PROD]: process.env.REACT_APP_SERVER_PROD as string,
};

const serverEnvironment = process.env.REACT_APP_SERVER as EnvironmentsEnum | undefined;

if (serverEnvironment !== 'prod') {
  console.log('🎯 Le estamos apuntando al servidor: ', serverEnvironment);
}

if (!serverEnvironment) {
  throw new Error('SERVER environment variable is not set');
}

const baseURL = envConfig[serverEnvironment];
const TIMEOUT_REQUEST = 10000;
const api = axios.create({
  baseURL,
  timeout: TIMEOUT_REQUEST,
  withCredentials: true, // ¡CRUCIAL! Esto permite enviar y recibir cookies.
});

// Variables para controlar el refresco de tokens y la cola de solicitudes fallidas
let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = [];

// Función para procesar la cola de solicitudes pendientes
const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(true);
    }
  });
  failedQueue = [];
};

// Interceptor de solicitudes (no necesita adjuntar tokens manualmente si son HTTP-only)
api.interceptors.request.use(
  (config) => {
    // Si tu access_token es HTTP-only, el navegador lo envía automáticamente.
    // No necesitas leerlo de localStorage ni adjuntarlo manualmente.
    // Si aun así envías tokens por headers (ej. para APIs de terceros), manten esta lógica.
    // const token = localStorage.getItem('access_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas para manejar errores de autenticación (401)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Solo intentar refresh si el error es 401 y no es la petición de refresh_token misma
    // y si la petición original no es ya un reintento (para evitar bucles)
    if (
      error.response?.status === 401 &&
      originalRequest?.url !== '/auth/refresh' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Marca la solicitud como reintentada

      // Si ya estamos refrescando el token, encola la solicitud original
      // y espera a que el refresco termine.
      const retryOriginalRequest = new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });

      if (!isRefreshing) {
        isRefreshing = true;
        console.log('Token expirado, intentando actualizar el token...');

        try {
          // Llama al endpoint de refresco. El 'refresh_token' se enviará automáticamente
          // por el navegador como una cookie debido a `withCredentials: true`.
          // El backend ya no espera un 'userId' en el cuerpo para refresh.
          await api.post('/auth/refresh');

          // Una vez que la solicitud de refresco es exitosa, el servidor habrá establecido
          // las nuevas cookies de 'access_token' y 'refresh_token'.
          // No hay necesidad de leer response.data para obtener los tokens.

          isRefreshing = false;
          processQueue(null); // Resuelve todas las solicitudes en cola (indica éxito)

          // Reintentar la solicitud original. El navegador adjuntará la nueva cookie de access_token.
          return api(originalRequest);
        } catch (refreshError: any) {
          console.error('No se pudo actualizar el token:', refreshError);
          localStorage.clear(); // Limpia localStorage (si aún tienes user_id, etc.)
          // Aquí puedes disparar una acción global para redirigir al login
          // window.location.href = '/login'; // O tu ruta de login (AuthContext se encargará de esto)
          isRefreshing = false;
          processQueue(refreshError); // Rechaza todas las solicitudes en cola (indica fallo)
          return Promise.reject(refreshError);
        }
      }
      return retryOriginalRequest; // Devuelve la promesa que se resolverá/rechazará más tarde.
    }

    // Manejo de error específico si el propio refresco del token falla (ej. 403 para token inválido)
    const falloRefrescarToken =
      error.response?.status === 403 && originalRequest?.url === '/auth/refresh';

    if (falloRefrescarToken) {
      console.log('Falló al refrescar token (refresh_token inválido/expirado), redirigiendo...');
      localStorage.clear(); // Limpiar todo si el refresh token es inválido
      // Aquí puedes disparar una acción global para redirigir al login
      // window.location.href = '/login'; // Redirigir al login
      return Promise.reject(error);
    }

    // @ts-ignore (Si sigues teniendo este tipo de manejo de errores específico)
    if (error.response?.data?.message?.[0] === 'Usuario no encontrado') {
      console.log('Usuario borrado');
    }

    return Promise.reject(error);
  }
);

export default api;
