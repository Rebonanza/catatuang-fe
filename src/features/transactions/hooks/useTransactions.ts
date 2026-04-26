import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import type { CreateTransactionDto } from '../types/transaction.type';

export const useTransactions = (filters?: {
  startDate?: string;
  endDate?: string;
  transactionType?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      const res = await transactionsService.getAll(filters);
      return res; // ApiPaginatedResponse already has { data, meta } as top level keys in my new type
    },
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTransactionDto) => {
      const res = await transactionsService.create(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => transactionsService.deleteMany(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateTransactionDto>;
    }) => {
      const res = await transactionsService.update(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};
