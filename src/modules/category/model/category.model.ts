import { Colors } from '../../../styles/colors';
import { ITransaction } from '../../transactions/model/transactions.model';
import { Principal } from '@dfinity/principal';

export interface ICategory {
  id: bigint;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdAt: bigint;
  updatedAt: bigint;
  userId: Principal;
  transactions?: ITransaction[];
}

export interface CreateCategoryRequest {
  icon: string;
  name: string;
  color: string;
  description: string;
}

export interface UpdateCategoryRequest {
  id: bigint;
  icon: [] | [string];
  name: [] | [string];
  color: [] | [string];
  description: [] | [string];
}

export interface UseCategoriesState {
  categories: ICategory[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

export interface UseCategoriesActions {
  fetch: () => Promise<void>;
  create: (data: CreateCategoryRequest) => Promise<ICategory | null>;
  update: (data: UpdateCategoryRequest) => Promise<ICategory | null>;
  clearError: () => void;
}
