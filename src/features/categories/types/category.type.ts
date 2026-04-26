import { TransactionType } from '@/features/transactions/types/transaction.type';

export interface Category {
  id: string;
  name: string;
  icon: string | null;
  color: string;
  userId: string;
  transactionType: TransactionType;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  icon?: string;
  color?: string;
  transactionType: TransactionType;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
