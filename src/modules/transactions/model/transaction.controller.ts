import { IBaseResponse } from '../../../types/proyect.model';
import { ITransaction, TransactionType } from './transactions.model';

export type IGetAllTransactionsResponse = IBaseResponse<GetAllTransactionsData>;

export type GetAllTransactionsData = ITransaction[];

export interface ICreateTransactionDto {
  type: TransactionType;
  amount: number;
  title: string;
  description?: string;
  categoryId: number;
}

export interface IUpdateTransactionDto extends Partial<ICreateTransactionDto> {}

export type CreateTransactionData = ITransaction;

export type ICreateTransactionResponse = IBaseResponse<CreateTransactionData>;

export type IDeleteTransactionResponse = IBaseResponse<null>;

export type IGetTransactionResponse = IBaseResponse<ITransaction>;
