export interface ITransaction {
  id: number;
  type: string;
  amount: number;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number;
}

export type TransactionType = "INCOME" | "EXPENSE" | "SAVING";
