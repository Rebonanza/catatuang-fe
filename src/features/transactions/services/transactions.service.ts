import { apiClient } from '@/config/axios.config';
import type {
  Transaction,
  CreateTransactionDto,
} from '../types/transaction.type';

export { TransactionType } from '../types/transaction.type';

export const transactionsService = {
  async getAll(filters?: {
    startDate?: string;
    endDate?: string;
    transactionType?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Transaction[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        data: Transaction[];
        meta: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
    }>('/transactions', { params: filters });
    return response.data.data;
  },

  async create(data: CreateTransactionDto): Promise<Transaction> {
    const response = await apiClient.post<{
      success: boolean;
      data: Transaction;
    }>('/transactions', data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/transactions/${id}`);
  },

  async update(
    id: string,
    data: Partial<CreateTransactionDto>,
  ): Promise<Transaction> {
    const response = await apiClient.patch<{
      success: boolean;
      data: Transaction;
    }>(`/transactions/${id}`, data);
    return response.data.data;
  },

  async deleteMany(ids: string[]): Promise<void> {
    await apiClient.delete('/transactions/bulk', { data: { ids } });
  },
};
