import api from "../../../api/api";
import { ICreateTransactionDto, ICreateTransactionResponse, IGetAllTransactionsResponse } from "../model/transaction.controller";

export async function fetchAllTransactions() {
  try {
    console.log("Obteniendo la lista de transacciones...");
    const response = await api.get<IGetAllTransactionsResponse>("/transactions");

    console.log("Lista de transacciones obtenida.");
    return response.data;
  } catch (error) {
    console.error("Hubo un error al obtener la lista de transacciones", error);
    Promise.reject(error);
  }
}

export async function createTransaction(body: ICreateTransactionDto) {
  try {
    console.log("Creando transaccion...");
    const response = await api.post<ICreateTransactionResponse>("/transactions");

    console.log("Transaccion creada exitosamente");
    return response.data;
  } catch (error) {
    console.error("Hubo un error al crear la transaccion", error);
    Promise.reject(error);
  }
}

export async function deleteTransaction() {
  try {
    console.log("Eliminando transaccion...");
    const response = await api.delete("/transactions");

    console.log("Transaccion eliminada exitosamente");
    return response.data;
  } catch (error) {
    console.error("Hubo un error al eliminar la transaccion", error);
    Promise.reject(error);
  }
}

export async function updateTransaction() {
  try {
    console.log("Actualizando transaccion...");
    const response = await api.put("/transactions");

    console.log("Transaccion actualizada exitosamente");
    return response.data;
  } catch (error) {
    console.error("Hubo un error al actualizar la transaccion", error);
    Promise.reject(error);
  }
}

export async function getTransactionById() {
  try {
    console.log("Obteniendo transaccion...");
    const response = await api.get("/transactions");

    console.log("Transaccion obtenida exitosamente");
    return response.data;
  } catch (error) {
    console.error("Hubo un error al obtener la transaccion", error);
    Promise.reject(error);
  }
}
