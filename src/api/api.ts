import axios, { AxiosError } from 'axios';
import { postRefreshToken } from '../modules/auth/api/RefreshToken.api';

export enum EnvironmentsEnum {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}

type EnvConfig = {
  [x in EnvironmentsEnum]: string;
};

const envConfig: EnvConfig = {
  [EnvironmentsEnum.LOCAL]: 'http://localhost:3000',
  [EnvironmentsEnum.DEV]: process.env.REACT_APP_SERVER_DEV as string,
  [EnvironmentsEnum.PROD]: process.env.REACT_APP_SERVER_PROD as string,
};

const serverEnvironment = process.env.REACT_APP_SERVER as EnvironmentsEnum | undefined;

console.log('🎯 Le estamos apuntando al servidor: ', serverEnvironment);

if (!serverEnvironment) {
  throw new Error('SERVER environment variable is not set');
}

const baseURL = envConfig[serverEnvironment];

const api = axios.create({
  baseURL,
});

// Interceptor para agregar token en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores 401
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    const falloRefrescarToken =
      error.response?.status === 403 && originalRequest?.url === '/auth/refresh';

    if (falloRefrescarToken) {
      console.log('Falló al refrescar token, redirigiendo...');
      localStorage.clear();
      window.location.href = '/login'; // redirección segura
      return Promise.reject(error);
    }

    // Si el error es por usuario borrado
    // @ts-ignore
    if (error.response?.data?.message?.[0] === 'Usuario no encontrado') {
      console.log('Usuario borrado');
    }
    
    // Solo intentar refresh si no lo intentamos antes
    if (error.response?.status === 401) {
      console.log('Token expirado, intentando actualizar el token...');

      const refreshToken = localStorage.getItem('refresh_token');
      const userId = localStorage.getItem('user_id');

      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await postRefreshToken(Number(userId), refreshToken);

      if (response.data.access_token) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        localStorage.setItem('refresh_token', newRefreshToken);
        localStorage.setItem('access_token', newAccessToken);

        // Volver a intentar la request original con el nuevo token
        if (originalRequest && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest!);
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        console.log('No se pudo actualizar el token');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
