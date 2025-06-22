import { useEffect } from "react";
import { useEndpoint } from "../../../hooks/useEndpoint";
import { signOut } from "../api/Logout.api";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { call, data, loading, error } = useEndpoint({ endpoint: signOut, immediate: false });

  async function cerrarSesion() {
    await call();
  }

  useEffect(() => {
    if (data?.status === 201) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      navigate("/login", { replace: true });
    }
  }, [data, navigate]);

  return { cerrarSesion, loading, error };
};
