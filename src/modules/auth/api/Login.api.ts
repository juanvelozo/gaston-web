import api from "../../../api/api";
import { IAuthResponse } from "../model/auth.controller";
import { ILoginRequest } from "../model/auth.model";

export async function postLogin(body: ILoginRequest): Promise<IAuthResponse> {
  try {
    console.log("Iniciando sesión...");

    const response = await api.post<IAuthResponse>("/auth/signin", body);

    console.log("Sesión iniciada exitosamente", { response });
    return response.data;
  } catch (error) {
    console.log("Hubo un error al iniciar sesión", error);
    throw error;
  }
}
