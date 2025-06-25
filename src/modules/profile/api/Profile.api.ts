import { AxiosError } from 'axios';
import api from '../../../api/api';
import {
  IGetProfileResponse,
  IUpdatePasswordDto,
  IUpdateProfileDto,
} from '../model/profile.controller';
import { comprimirArchivoImagen } from '../../../utils/comprimirImagen';

export async function getProfile(): Promise<IGetProfileResponse | undefined> {
  try {
    console.log('Obteniendo perfil...');
    const response = await api.get<IGetProfileResponse>('/user/profile');

    console.log('Perfil obtenido exitosamente');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al obtener el perfil', error);
    throw error;
  }
}

export async function updateProfile(body: IUpdateProfileDto) {
  try {
    console.log('Actualizando perfil...', body);

    const formData = new FormData();

    if (body.fullName) {
      formData.append('fullName', body.fullName);
    }

    if (body.profile_photo instanceof File) {
      const foto = await comprimirArchivoImagen(body.profile_photo);
      formData.append('file', foto);
    }

    const response = await api.patch('/user/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Perfil actualizado exitosamente');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al actualizar el perfil', error);
    throw error;
  }
}

export async function changePassword(body: IUpdatePasswordDto) {
  try {
    console.log('Actualizando perfil...', body);
    const response = await api.patch('/user/change-password', body);

    console.log('Perfil actualizado exitosamente');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al actualizar el perfil', error);
    throw error;
    // if ((error as AxiosError).response) {
    //   const axiosError = error as AxiosError;

    //   const { status, data } = axiosError.response!;
    //   throw axiosError;
    // }
  }
}
