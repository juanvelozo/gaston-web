import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
import { changePassword, getProfile, updateProfile } from '../api/Profile.api';
import { IUpdatePasswordDto, IUpdateProfileDto } from '../model/profile.controller';
import { useEffect } from 'react';

export const useProfile = () => {
  const navigate = useNavigate();
  const profile = useEndpoint({ endpoint: getProfile, immediate: true });
  const edit = useEndpoint({ endpoint: updateProfile });
  const updatePassword = useEndpoint({ endpoint: changePassword });

  async function cambiarContraseña(body: IUpdatePasswordDto) {
    await updatePassword.call(body).then(() => {
      // acá va un feedback o algo
    });
  }

  async function editar(arg: IUpdateProfileDto) {
    await edit.call(arg).then(() => {
      // acá va un feedback o algo
    });
  }

  useEffect(() => {
    if (updatePassword.data?.status === 201 || edit.data?.status === 201) {
      navigate('/profile', { replace: true });
    }
  }, [updatePassword.data, edit.data]);

  return { profile, editar, cambiarContraseña };
};
