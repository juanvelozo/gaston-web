import { useNavigate } from "react-router-dom";
import { useEndpoint } from "../../../hooks/useEndpoint";

export const useLogout = () => {
  const navigate = useNavigate();
  const { call, data, loading, error } = useEndpoint({ endpoint: signOut, immediate: false });

  async function signOut(userId: number) {
    await call(userId);
    if (data) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      navigate("/login", { replace: true });
    }
  }

  return { signOut, loading, error };
};
