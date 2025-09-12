import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'NotFound' : null } |
  { 'Unauthorized' : null } |
  { 'InternalError' : string } |
  { 'BadRequest' : string };
export interface Category {
  'id' : bigint,
  'userId' : Principal,
  'icon' : string,
  'name' : string,
  'createdAt' : bigint,
  'color' : string,
  'description' : string,
  'updatedAt' : bigint,
}
export interface CreateCategoryRequest {
  'icon' : string,
  'name' : string,
  'color' : string,
  'description' : string,
}
export interface CreateTransactionRequest {
  'categoryId' : [] | [bigint],
  'title' : string,
  'type' : TransactionType,
  'description' : [] | [string],
  'amount' : bigint,
}
export type Result = { 'ok' : Transaction } |
  { 'err' : ApiError };
export type Result_1 = { 'ok' : Category } |
  { 'err' : ApiError };
export type Result_2 = { 'ok' : Array<Transaction> } |
  { 'err' : ApiError };
export type Result_3 = { 'ok' : Array<Category> } |
  { 'err' : ApiError };
export interface Transaction {
  'id' : bigint,
  'categoryId' : [] | [bigint],
  'title' : string,
  'userId' : Principal,
  'createdAt' : bigint,
  'type' : TransactionType,
  'description' : [] | [string],
  'updatedAt' : bigint,
  'amount' : bigint,
}
export type TransactionType = { 'INCOME' : null } |
  { 'EXPENSE' : null };
export type TransferResult = { 'ok' : bigint } |
  { 'err' : string };
export interface UpdateCategoryRequest {
  'id' : bigint,
  'icon' : [] | [string],
  'name' : [] | [string],
  'color' : [] | [string],
  'description' : [] | [string],
}
export interface UpdateTransactionRequest {
  'id' : bigint,
  'categoryId' : [] | [bigint],
  'title' : [] | [string],
  'type' : [] | [TransactionType],
  'description' : [] | [string],
  'amount' : [] | [bigint],
}
export interface _SERVICE {
  'createCategory' : ActorMethod<[CreateCategoryRequest], Result_1>,
  'createTransaction' : ActorMethod<[CreateTransactionRequest], Result>,
  'getBalance' : ActorMethod<[Principal], bigint>,
  'getCategories' : ActorMethod<[], Result_3>,
  'getFee' : ActorMethod<[], bigint>,
  'getTransactions' : ActorMethod<[], Result_2>,
  'sendICP' : ActorMethod<[Principal, Principal, bigint], TransferResult>,
  'updateCategory' : ActorMethod<[UpdateCategoryRequest], Result_1>,
  'updateTransaction' : ActorMethod<[UpdateTransactionRequest], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
