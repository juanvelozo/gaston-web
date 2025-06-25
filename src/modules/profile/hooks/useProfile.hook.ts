import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../../hooks/useEndpoint';
import { changePassword, getProfile, updateProfile } from '../api/Profile.api';
import { IUpdatePasswordDto, IUpdateProfileDto } from '../model/profile.controller';

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

  function onSuccess() {
    navigate('/profile', { replace: true });
  }

  const mensajes = updatePassword.error?.response?.data.message;
  const errores = mensajes;

  return {
    profile,
    editar,
    cambiarContraseña,
    submittingEditar: edit.loading,
    submittingCambiarContraseña: updatePassword.loading,
    errores,
    onSuccess,
  };
};
