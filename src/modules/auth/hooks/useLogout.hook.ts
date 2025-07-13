import { useEffect } from 'react';
import { useEndpoint } from '../../../hooks/useEndpoint';
import { signOut } from '../api/Logout.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogout = () => {
  const navigate = useNavigate();
  const { call, data, loading, error } = useEndpoint({ endpoint: signOut, immediate: false });

  async function cerrarSesion() {
    await call();
  }

  useEffect(() => {
    if (data?.status === 201) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_id');
      navigate('/login', { replace: true });
      toast.error('Sesión cerrada exitosamente', { description: '¡Hasta la próxima!' });
    }
  }, [data, navigate]);

  return { cerrarSesion, loading, error };
};
