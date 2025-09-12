import { Principal } from '@dfinity/principal';

export interface WalletBalance {
  balance: bigint;
  principal: Principal;
}

export interface TransferRequest {
  to: Principal;
  from: Principal;
  amount: bigint;
}

export type TransferResult = { ok: bigint } | { err: string };

export interface FeeInfo {
  fee: bigint;
}
