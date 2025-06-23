import api from '../../../api/api';
import {
  ICreateTransactionDto,
  ICreateTransactionResponse,
  IGetAllTransactionsResponse,
  IGetTransactionResponse,
  IUpdateTransactionDto,
} from '../model/transaction.controller';

export async function fetchAllTransactions() {
  try {
    console.log('Obteniendo la lista de transacciones...');
    const response = await api.get<IGetAllTransactionsResponse>('/transactions');

    console.log('Lista de transacciones obtenida.');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al obtener la lista de transacciones', error);
    Promise.reject(error);
  }
}

export async function createTransaction(body: ICreateTransactionDto) {
  try {
    console.log('Creando transaccion...');
    const response = await api.post<ICreateTransactionResponse>('/transactions', body);

    console.log('Transaccion creada exitosamente');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al crear la transaccion', error);
    Promise.reject(error);
  }
}

export async function deleteTransaction(id: number) {
  try {
    console.log('Eliminando transaccion...');
    const response = await api.delete(`/transactions/${id}`);

    console.log('Transaccion eliminada exitosamente');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al eliminar la transaccion', error);
    Promise.reject(error);
  }
}

export async function updateTransaction(id: number, body: IUpdateTransactionDto) {
  try {
    console.log('Actualizando transaccion...', body);
    const response = await api.patch(`/transactions/${id}`, body);

    console.log('Transaccion actualizada exitosamente');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al actualizar la transaccion', error);
    Promise.reject(error);
  }
}

export async function getTransactionById(id: number): Promise<IGetTransactionResponse | undefined> {
  try {
    console.log('Obteniendo transaccion...');
    const response = await api.get<IGetTransactionResponse>(`/transactions/${id}`);

    console.log('Transaccion obtenida exitosamente');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al obtener la transaccion', error);
    Promise.reject(error);
  }
}
