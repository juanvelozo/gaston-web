import {
  ICreateTransactionDto,
  ICreateTransactionResponse,
  IDeleteTransactionResponse,
  IGetAllTransactionsResponse,
  IGetTransactionResponse,
  IUpdateTransactionDto,
} from '../model/transaction.controller';

export async function fetchAllTransactions() {
  try {
    console.log('Obteniendo la lista de transacciones...');
    const response: IGetAllTransactionsResponse = { data: [], status: 200 };

    console.log('Lista de transacciones obtenida.');
    return response.data;
  } catch (error) {
    console.error('Hubo un error al obtener la lista de transacciones', error);
    // handleApiError(error);
  }
}

export async function createTransaction(body: ICreateTransactionDto) {
  try {
    console.log('Creando transaccion...');
    const response: ICreateTransactionResponse | undefined = undefined;

    console.log('Transaccion creada exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al crear la transaccion', error);
    // handleApiError(error);
  }
}

export async function deleteTransaction(id: number) {
  try {
    console.log('Eliminando transaccion...');
    const response: IDeleteTransactionResponse | undefined = undefined;

    console.log('Transaccion eliminada exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al eliminar la transaccion', error);
    // handleApiError(error);
  }
}

export async function updateTransaction(id: number, body: IUpdateTransactionDto) {
  try {
    console.log('Actualizando transaccion...', body);
    const response: IUpdateTransactionDto | undefined = undefined;

    console.log('Transaccion actualizada exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al actualizar la transaccion', error);
    // handleApiError(error);
  }
}

export async function getTransactionById(id: number): Promise<IGetTransactionResponse | undefined> {
  try {
    console.log('Obteniendo transaccion...');
    const response: IGetTransactionResponse | undefined = undefined;

    console.log('Transaccion obtenida exitosamente');
    return response;
  } catch (error) {
    console.error('Hubo un error al obtener la transaccion', error);
    // handleApiError(error);
  }
}
