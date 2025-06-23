import api from "../../../api/api";
import { IGetSummaryResponse } from "../model/dashboard.controller";

export async function getSummary(): Promise<IGetSummaryResponse> {
  try {
    console.log("Obteniendo resumen...");

    const response = await api.get<IGetSummaryResponse>("/transactions/summary");

    console.log("Resumen obtenido.");
    return response.data;
  } catch (error) {
    console.log("Hubo un error al obtener resumen", error);
    throw error;
  }
}
