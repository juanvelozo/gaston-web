import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
import { postLogin } from '../api/Login.api';
import { ILoginRequest } from '../model/auth.model';
import { toast } from 'sonner';

export const useLogin = () => {
  const { loading, error, data, call } = useEndpoint({
    endpoint: postLogin,
  });
  const navigate = useNavigate();

  async function signIn(body: ILoginRequest) {
    await call(body);
  }

  useEffect(() => {
    if (data?.status === 201) {
      const userId = data?.data.userId;

      if (userId) {
        localStorage.setItem('user_id', userId.toString());
      }
      toast.success('Sesión iniciada exitosamente', { description: '¡Bienvenidx!' });

      navigate('/', { replace: true });
    }
  }, [data, navigate]);

  return { signIn, loading, error };
};
