import api from "../../../api/api";
import { ILoginResponse } from "../model/auth.controller";
import { IRegisterRequest } from "../model/auth.model";

export async function postRegister(body: IRegisterRequest): Promise<ILoginResponse> {
  try {
    console.log("Registrando usuario...", { body });

    const response = await api.post<ILoginResponse>("/auth/signup", body);

    console.log("Usuario registrado exitosamente", { response });
    return response.data;
  } catch (error) {
    console.error("Error al registrar un usuario", error);
    throw error;
  }
}
