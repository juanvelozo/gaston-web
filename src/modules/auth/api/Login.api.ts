import api from "../../../api/api";
import { IAuthResponse } from "../model/auth.controller";
import { ILoginRequest } from "../model/auth.model";

export async function postLogin(body: ILoginRequest) {
  try {
    console.log("Iniciando sesión...");

    const response = await api.post<IAuthResponse>("/auth/login", body);

    console.log("Sesión iniciada exitosamente", { response });
    return response;
  } catch (error) {
    console.log("Hubo un error al iniciar sesión", error);
    throw error;
  }
}
