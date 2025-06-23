import { ITransaction } from '../../transactions/model/transactions.model';

export interface ICategory {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  transactions: ITransaction[];
}
