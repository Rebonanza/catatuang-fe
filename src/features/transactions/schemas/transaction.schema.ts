import * as z from 'zod';
import { TransactionType } from '../types/transaction.type';

export const transactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  transactionType: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
  merchant: z.string().min(1, 'Merchant/Description is required').max(255),
  note: z.string().max(500).optional(),
  transactedAt: z.string().min(1, 'Date is required'),
  categoryId: z.string().min(1, 'Category is required'),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
