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
    categoryId?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Transaction[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    // Strip keys with empty string / undefined so they are not sent as ?key=
    const params = filters
      ? Object.fromEntries(
          Object.entries(filters).filter(
            ([, v]) => v !== undefined && v !== '',
          ),
        )
      : undefined;

    const response = await apiClient.get<{
      data: Transaction[];
      meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>('/transactions', { params });
    return response.data;
  },

  async create(data: CreateTransactionDto): Promise<Transaction> {
    const response = await apiClient.post<Transaction>('/transactions', data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/transactions/${id}`);
  },

  async update(
    id: string,
    data: Partial<CreateTransactionDto>,
  ): Promise<Transaction> {
    const response = await apiClient.patch<Transaction>(
      `/transactions/${id}`,
      data,
    );
    return response.data;
  },

  async deleteMany(ids: string[]): Promise<void> {
    await apiClient.delete('/transactions/bulk', { data: { ids } });
  },
};
