import { IBaseResponse } from '../../../types/proyect.model';
import { IUser } from '../../auth/model/auth.model';

/**
 * Editar perfil
 */
export type IUpdateProfileDto = {
  fullName?: string;
  profile_photo?: string | File;
};

/**
 * Cambiar contraseña
 */
export type IUpdatePasswordDto = {
  currentPassword: string;
  newPassword: string;
};

/**
 * Perfil
 */
export type IGetProfileResponse = IBaseResponse<IUser>;
