import { server } from '../../../declarations/server';
import { Principal } from '@dfinity/principal';
import { TransferResult } from '../model/wallet.model';

/**
 * Obtiene el balance de un usuario específico
 */
export const getBalance = async (principal: Principal): Promise<bigint> => {
  try {
    const balance = await server.getBalance(principal);
    return balance;
  } catch (error) {
    console.error('Error en getBalance:', error);
    throw error;
  }
};

/**
 * Obtiene la tarifa de transacción
 */
export const getFee = async (): Promise<bigint> => {
  try {
    const fee = await server.getFee();
    return fee;
  } catch (error) {
    console.error('Error en getFee:', error);
    throw error;
  }
};

/**
 * Envía ICP de un usuario a otro
 */
export const sendICP = async (
  from: Principal,
  to: Principal,
  amount: bigint
): Promise<TransferResult> => {
  try {
    const result = (await server.sendICP(from, to, amount)) as TransferResult;
    return result;
  } catch (error) {
    console.error('Error en sendICP:', error);
    throw error;
  }
};

/**
 * Helper para verificar si una transferencia fue exitosa
 */
export const isTransferSuccessful = (result: TransferResult): boolean => {
  return 'ok' in result;
};

/**
 * Helper para obtener el ID de transacción de una transferencia exitosa
 */
export const getTransferId = (result: TransferResult): bigint | undefined => {
  return 'ok' in result ? result.ok : undefined;
};

/**
 * Helper para obtener el mensaje de error de una transferencia fallida
 */
export const getTransferError = (result: TransferResult): string | undefined => {
  return 'err' in result ? result.err : undefined;
};

/**
 * Convierte bigint a string para mostrar en UI
 */
export const formatBalance = (balance: bigint): string => {
  return balance.toString();
};

/**
 * Convierte string a bigint para operaciones
 */
export const parseAmount = (amount: string): bigint => {
  return BigInt(amount);
};
