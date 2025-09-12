import { canister } from '../../../api/api';
import { Principal } from '@dfinity/principal';
import {
  ITransaction,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  TransactionType,
  CanisterTransactionType,
  CanisterTransaction,
  CanisterCreateTransactionRequest,
  CanisterUpdateTransactionRequest,
  canisterToFrontend,
  frontendToCanister,
  canisterTransactionToFrontend,
} from '../model/transactions.model';
import { Result } from '../../../types/proyect.model';

/**
 * Obtiene todas las transacciones del usuario
 */
export const getTransactions = async (): Promise<ITransaction[]> => {
  try {
    const result = (await canister.getTransactions()) as Result<CanisterTransaction[]>;

    if ('ok' in result) {
      // Convertir tipos del canister a tipos del frontend
      return result.ok.map(canisterTransactionToFrontend);
    } else {
      throw new Error(`Error al obtener transacciones: ${JSON.stringify(result.err)}`);
    }
  } catch (error) {
    console.error('Error en getTransactions:', error);
    throw error;
  }
};

/**
 * Crea una nueva transacción
 */
export const createTransaction = async (
  request: CreateTransactionRequest
): Promise<ITransaction> => {
  try {
    // Convertir request del frontend al formato del canister
    const canisterRequest: CanisterCreateTransactionRequest = {
      categoryId: request.categoryId ? [request.categoryId] : [], // ✅ Convertir a formato [] | [bigint]
      title: request.title,
      type: frontendToCanister(request.type), // ✅ Usar 'type' para coincidir con las declaraciones del servidor
      description: request.description ? [request.description] : [],
      amount: request.amount,
    };

    const result = (await canister.createTransaction(
      canisterRequest
    )) as Result<CanisterTransaction>;

    if ('ok' in result) {
      // Convertir tipo del canister a tipo del frontend
      return canisterTransactionToFrontend(result.ok);
    } else {
      throw new Error(`Error al crear transacción: ${JSON.stringify(result.err)}`);
    }
  } catch (error) {
    console.error('Error en createTransaction:', error);
    throw error;
  }
};

/**
 * Actualiza una transacción existente
 */
export const updateTransaction = async (
  request: UpdateTransactionRequest
): Promise<ITransaction> => {
  try {
    // Convertir request del frontend al formato del canister
    const canisterRequest: CanisterUpdateTransactionRequest = {
      id: request.id,
      categoryId: request.categoryId !== undefined ? [request.categoryId] : [],
      title: request.title !== undefined ? [request.title] : [],
      type: request.type !== undefined ? [frontendToCanister(request.type)] : [], // ✅ Usar 'type' para coincidir con las declaraciones del servidor
      description: request.description !== undefined ? [request.description] : [],
      amount: request.amount !== undefined ? [request.amount] : [],
    };

    const result = (await canister.updateTransaction(
      canisterRequest
    )) as Result<CanisterTransaction>;

    if ('ok' in result) {
      // Convertir tipo del canister a tipo del frontend
      return canisterTransactionToFrontend(result.ok);
    } else {
      throw new Error(`Error al actualizar transacción: ${JSON.stringify(result.err)}`);
    }
  } catch (error) {
    console.error('Error en updateTransaction:', error);
    throw error;
  }
};

/**
 * Helper para crear una descripción opcional
 */
export const createOptionalDescription = (description?: string): [] | [string] => {
  return description ? [description] : [];
};

/**
 * Helper para crear un campo opcional de actualización
 */
export const createOptionalField = <T>(value?: T): [] | [T] => {
  return value !== undefined ? [value] : [];
};

/**
 * Helper para verificar si una transacción es de tipo INCOME
 */
export const isIncomeTransaction = (type: TransactionType): boolean => {
  return type === TransactionType.INCOME;
};

/**
 * Helper para verificar si una transacción es de tipo EXPENSE
 */
export const isExpenseTransaction = (type: TransactionType): boolean => {
  return type === TransactionType.EXPENSE;
};
