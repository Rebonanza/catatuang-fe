export const TransactionType = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  id: string;
  amount: number;
  transactionType: TransactionType;
  merchant?: string;
  bankSource?: string;
  note?: string;
  source: 'auto_parsed' | 'manual';
  parseStatus?: 'success' | 'failed' | 'needs_review';
  transactedAt: string;
  categoryId?: string;
  category?: { name: string; icon: string | null };
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionDto {
  amount: number;
  transactionType: TransactionType;
  merchant?: string;
  note?: string;
  transactedAt: string;
  categoryId?: string;
}

export type UpdateTransactionDto = Partial<CreateTransactionDto>;
