import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
import { signOut } from '../api/Logout.api';
import { toast } from 'sonner';
import { AuthContext } from '../../../context/Auth.context';

export const useLogout = () => {
  const navigate = useNavigate();
  const { call, data, loading, error } = useEndpoint({
    endpoint: signOut,
    immediate: false,
  });

  const authContext = useContext(AuthContext);
  const { checkAuthStatus } = authContext ?? {};

  async function cerrarSesion() {
    await call();
  }

  // ✅ Efecto para manejo del éxito
  useEffect(() => {
    const handleLogoutSuccess = async () => {
      if (data?.status === 201) {
        localStorage.removeItem('user_id');
        toast.error('Sesión cerrada exitosamente', { description: '¡Hasta la próxima!' });

        await new Promise((res) => setTimeout(res, 100));
        await checkAuthStatus?.();

        navigate('/login', { replace: true });
      }
    };

    handleLogoutSuccess();
  }, [data, checkAuthStatus, navigate]);

  // ✅ Efecto para errores
  useEffect(() => {
    if (error) {
      toast.warning('No se pudo cerrar sesión correctamente');
    }
  }, [error]);

  return { cerrarSesion, loading, error };
};
