import { IUser } from '../../auth/model/auth.model';
import { ICategory } from '../../category/model/category.model';

export interface ITransaction {
  id: number;
  type: TransactionType;
  amount: number;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: Partial<IUser>;
  categoryId: number;
  category: ICategory;
}

export type TransactionType = 'INCOME' | 'EXPENSE';
