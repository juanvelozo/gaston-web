import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
import { ILoginRequest } from '../model/auth.model';
import { postLogin } from '../api/Login.api';
import { toast } from 'sonner';
import { AuthContext } from '../../../context/Auth.context';

export const useLogin = () => {
  const navigate = useNavigate();
  const { call, data, loading, error } = useEndpoint({
    endpoint: postLogin,
    immediate: false,
  });

  const authContext = useContext(AuthContext);
  const { isAuthenticated, checkAuthStatus } = authContext ?? {};

  async function signIn(body: ILoginRequest) {
    await call(body);
  }

  useEffect(() => {
    const handleLoginSuccess = async () => {
      if (data?.status === 201) {
        const userId = data?.data.userId;
        if (userId) localStorage.setItem('user_id', userId.toString());

        toast.success('Sesión iniciada exitosamente', { description: '¡Bienvenidx!' });

        await new Promise((res) => setTimeout(res, 100)); // Para evitar condiciones de carrera
        await checkAuthStatus?.();
      }
    };

    handleLoginSuccess();
  }, [data, checkAuthStatus]);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return { signIn, loading, error };
};
