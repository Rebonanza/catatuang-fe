import { z } from 'zod';
import { TransactionType } from '@/features/transactions/types/transaction.type';

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  transactionType: z.nativeEnum(TransactionType),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
