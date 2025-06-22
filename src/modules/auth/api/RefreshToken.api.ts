import api from "../../../api/api";
import { ITokens } from "../model/auth.model";

export async function postRefreshToken(userId: number, refreshToken: string): Promise<ITokens> {
  try {
    console.log("Actualizando token...");

    const response = await api.post<ITokens>("/auth/refresh", { userId, refreshToken });

    console.log("Token actualizado exitosamente");
    return response.data;
  } catch (error) {
    console.error("Error en refresh token", error);
    throw error;
  }
}
