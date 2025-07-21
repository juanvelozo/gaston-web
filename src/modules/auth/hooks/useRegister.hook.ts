import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
import { IRegisterRequest } from '../model/auth.model';
import { postRegister } from '../api/Register.api';
import { toast } from 'sonner';
import { AuthContext } from '../../../context/Auth.context';

export const useRegister = () => {
  const navigate = useNavigate();
  const { call, data, loading, error } = useEndpoint({
    endpoint: postRegister,
    immediate: false,
  });

  const authContext = useContext(AuthContext);
  const { isAuthenticated, checkAuthStatus } = authContext ?? {};

  async function signUp(body: IRegisterRequest) {
    await call(body);
  }

  useEffect(() => {
    const handleRegisterSuccess = async () => {
      if (data?.status === 201) {
        const userId = data?.data.userId;
        if (userId) localStorage.setItem('user_id', userId.toString());

        toast.success('Usuario registrado', { description: '¡Bienvenidx!' });

        await new Promise((res) => setTimeout(res, 100));
        await checkAuthStatus?.();
      }
    };

    handleRegisterSuccess();
  }, [data, checkAuthStatus]);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return { signUp, loading, error };
};
