import axios, { AxiosError } from "axios";
import { postRefreshToken } from "../modules/auth/api/RefreshToken.api";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para agregar token en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
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

    // Solo intentar refresh si no lo intentamos antes
    if (error.response?.status === 401) {
      console.log("Token expirado, intentando actualizar el token...");

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      const response = await postRefreshToken(refreshToken);

      if (response.access_token) {
        const newAccessToken = response.access_token;

        localStorage.setItem("access_token", newAccessToken);

        // Volver a intentar la request original con el nuevo token
        if (originalRequest && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest!);
      } else {
        localStorage.removeItem("access_token");
        console.log("No se pudo actualizar el token");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
