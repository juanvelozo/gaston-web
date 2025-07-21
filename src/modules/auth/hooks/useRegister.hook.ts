import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
import { IRegisterRequest } from '../model/auth.model';
import { postRegister } from '../api/Register.api';
import { toast } from 'sonner';

export const useRegister = () => {
  const { loading, error, data, call } = useEndpoint({
    endpoint: postRegister,
    immediate: false,
  });
  const navigate = useNavigate();

  async function signUp(body: IRegisterRequest) {
    await call(body);
  }
  useEffect(() => {
    if (data?.status === 201) {
      const userId = data?.data.userId;

      if (userId) {
        localStorage.setItem('user_id', userId.toString());
      }
      toast.success('Usuario registrado', { description: '¡Bienvenidx!' });

      navigate('/', { replace: true });
    }
  }, [data, navigate]);

  return { signUp, loading, error };
};
