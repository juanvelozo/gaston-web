import { useNavigate } from "react-router-dom";
import { useEndpoint } from "../../../hooks/useEndpoint";
import { postLogin } from "../api/Login.api";
import { ILoginRequest } from "../model/auth.model";

export const useLogin = () => {
  const { loading, error, data, call } = useEndpoint({
    endpoint: postLogin,
    immediate: false,
  });
  const navigate = useNavigate();

  async function signIn(body: ILoginRequest) {
    await call(body);
    const token = data?.tokens.access_token;
    const refreshToken = data?.tokens.refresh_token;
    const userId = data?.user.id;

    if (userId) {
      localStorage.setItem("user_id", userId.toString());
    }

    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
    if (token) {
      console.log("Guardando token de acceso...");

      localStorage.setItem("access_token", token);

      console.log("Token de acceso guardado exitosamente");

      navigate("/", { replace: true });
    }
  }

  return { signIn, loading, error };
};
