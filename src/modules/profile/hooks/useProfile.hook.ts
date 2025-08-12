import { useNavigate } from 'react-router-dom';
import { changePassword, getProfile, updateProfile } from '../api/Profile.api';
import { IUpdatePasswordDto, IUpdateProfileDto } from '../model/profile.controller';

export const useProfile = () => {
  const navigate = useNavigate();
  const profile = getProfile();

  async function cambiarContraseña(body: IUpdatePasswordDto) {
    await changePassword(body).then(() => {
      // acá va un feedback o algo
    });
  }

  async function editar(arg: IUpdateProfileDto) {
    await updateProfile(arg).then(() => {
      // acá va un feedback o algo
    });
  }

  function onSuccess() {
    navigate('/profile', { replace: true });
  }

  const mensajes = [];
  const errores: never[] = [];

  return {
    profile,
    editar,
    cambiarContraseña,
    submittingEditar: false,
    submittingCambiarContraseña: false,
    errores,
    onSuccess,
  };
};
