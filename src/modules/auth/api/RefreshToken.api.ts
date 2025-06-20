import api from "../../../api/api";
import { IAuthResponse } from "../model/auth.controller";

export async function postRefreshToken(refreshToken: string): Promise<IAuthResponse> {
  try {
    console.log("Actualizando token...");

    const response = await api.post<IAuthResponse>("/auth/refresh", { refreshToken });

    console.log("Token actualizado exitosamente", { response });
    return response.data;
  } catch (error) {
    console.error("Error en refresh token", error);
    throw error;
  }
}
