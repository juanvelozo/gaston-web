import api from "../../../api/api";

export async function getSummary(): Promise<any> {
  try {
    console.log("Obteniendo resumen...");

    const response = await api.get<any>("/transactions/summary");

    console.log("Resumen obtenido.");
    return response.data;
  } catch (error) {
    console.log("Hubo un error al obtener resumen", error);
    throw error;
  }
}
