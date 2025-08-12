import { IUpdatePasswordDto, IUpdateProfileDto } from '../model/profile.controller';
import { comprimirArchivoImagen } from '../../../utils/comprimirImagen';

export async function getProfile(): Promise<undefined> {
  try {
    console.log('Obteniendo perfil...');
    const response: undefined = undefined;
    console.log('Perfil obtenido exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al obtener el perfil', error);
    // handleApiError(error);
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

    // const response = await api.patch('/user/profile', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    console.log('Perfil actualizado exitosamente');
    return null;
  } catch (error) {
    console.error('Hubo un error al actualizar el perfil', error);
    // handleApiError(error);
  }
}

export async function changePassword(body: IUpdatePasswordDto) {
  try {
    console.log('Actualizando perfil...', body);
    const response: IUpdatePasswordDto | undefined = undefined;
    console.log('Perfil actualizado exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al actualizar el perfil', error);
    // handleApiError(error);
  }
}
