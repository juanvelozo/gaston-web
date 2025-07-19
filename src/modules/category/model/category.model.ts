import { Colors } from '../../../styles/colors';
import { ITransaction } from '../../transactions/model/transactions.model';

export interface ICategory {
  id: number;
  name: string;
  description: string;
  color: keyof Colors;
  icon: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  transactions: ITransaction[];
}
