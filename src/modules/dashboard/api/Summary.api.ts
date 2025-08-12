import { IGetSummaryResponse } from '../model/dashboard.controller';

export async function getSummary(): Promise<IGetSummaryResponse | undefined> {
  try {
    console.log('Obteniendo resumen...');

    const response: IGetSummaryResponse | undefined = undefined;

    console.log('Resumen obtenido.');
    return response;
  } catch (error) {
    console.log('Hubo un error al obtener resumen', error);
    // handleApiError(error);
  }
}
