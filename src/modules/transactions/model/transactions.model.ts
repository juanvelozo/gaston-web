import { ICategory } from '../../category/model/category.model';
import { Principal } from '@dfinity/principal';

export interface ITransaction {
  id: bigint;
  type: TransactionType; // Enum para uso en frontend
  amount: bigint;
  title: string;
  description?: string;
  createdAt: bigint;
  updatedAt: bigint;
  userId: Principal;
  categoryId?: bigint; // ✅ Ahora es opcional
  category?: ICategory;
}

// Tipo del canister (no modificar)
export type CanisterTransactionType = { INCOME: null } | { EXPENSE: null };

// Enum para uso en el frontend
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

// Interfaces para los tipos que vienen del canister
export interface CanisterTransaction {
  id: bigint;
  type: CanisterTransactionType; // ✅ Usar 'type' para coincidir con las declaraciones del servidor
  amount: bigint;
  title: string;
  description: [] | [string];
  createdAt: bigint;
  updatedAt: bigint;
  userId: Principal;
  categoryId?: bigint; // ✅ Ahora es opcional
}

export interface CanisterCreateTransactionRequest {
  categoryId: [] | [bigint]; // ✅ Formato correcto para campos opcionales en Candid
  title: string;
  type: CanisterTransactionType; // ✅ Usar 'type' para coincidir con las declaraciones del servidor
  description: [] | [string];
  amount: bigint;
}

export interface CanisterUpdateTransactionRequest {
  id: bigint;
  categoryId: [] | [bigint];
  title: [] | [string];
  type: [] | [CanisterTransactionType]; // ✅ Usar 'type' para coincidir con las declaraciones del servidor
  description: [] | [string];
  amount: [] | [bigint];
}

// Funciones de conversión
export const canisterToFrontend = (type: CanisterTransactionType): TransactionType => {
  return 'INCOME' in type ? TransactionType.INCOME : TransactionType.EXPENSE;
};

export const frontendToCanister = (type: TransactionType): CanisterTransactionType => {
  return type === TransactionType.INCOME ? { INCOME: null } : { EXPENSE: null };
};

export const canisterTransactionToFrontend = (transaction: CanisterTransaction): ITransaction => {
  return {
    ...transaction,
    type: canisterToFrontend(transaction['type']), // ✅ Convertir 'type' a type
    description: transaction.description.length > 0 ? transaction.description[0] : undefined,
    categoryId: transaction.categoryId, // ✅ Mantener como opcional
  };
};

export interface CreateTransactionRequest {
  categoryId?: bigint; // ✅ Ahora es opcional
  title: string;
  type: TransactionType;
  description?: string;
  amount: bigint;
}

export interface UpdateTransactionRequest {
  id: bigint;
  categoryId?: bigint;
  title?: string;
  type?: TransactionType;
  description?: string;
  amount?: bigint;
}

export interface UseTransactionsState {
  transactions: ITransaction[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

export interface UseTransactionsActions {
  fetch: () => Promise<void>;
  create: (data: CreateTransactionRequest) => Promise<ITransaction | null>;
  update: (data: UpdateTransactionRequest) => Promise<ITransaction | null>;
  clearError: () => void;
}
