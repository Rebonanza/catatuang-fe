import { apiClient } from '@/config/axios.config';
import type {
  Transaction,
  CreateTransactionDto,
} from '../types/transaction.type';
import type { ApiResponse, ApiPaginatedResponse } from '@/types/api.type';

export { TransactionType } from '../types/transaction.type';

export const transactionsService = {
  async getAll(filters?: {
    startDate?: string;
    endDate?: string;
    transactionType?: string;
    categoryId?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiPaginatedResponse<Transaction>> {
    // Strip keys with empty string / undefined so they are not sent as ?key=
    const params = filters
      ? Object.fromEntries(
          Object.entries(filters).filter(
            ([, v]) => v !== undefined && v !== '',
          ),
        )
      : undefined;

    const response = await apiClient.get<ApiPaginatedResponse<Transaction>>(
      '/transactions',
      { params },
    );
    return response.data;
  },

  async create(data: CreateTransactionDto): Promise<ApiResponse<Transaction>> {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      '/transactions',
      data,
    );
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/transactions/${id}`,
    );
    return response.data;
  },

  async update(
    id: string,
    data: Partial<CreateTransactionDto>,
  ): Promise<ApiResponse<Transaction>> {
    const response = await apiClient.patch<ApiResponse<Transaction>>(
      `/transactions/${id}`,
      data,
    );
    return response.data;
  },

  async deleteMany(ids: string[]): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      '/transactions/bulk',
      { data: { ids } },
    );
    return response.data;
  },
};
