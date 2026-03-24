import { apiClient } from '@/config/axios.config';
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

export const categoriesService = {
  async getAll(params?: { page?: number; limit?: number }): Promise<{
    data: Category[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        data: Category[];
        meta: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
    }>('/categories', { params });
    return response.data.data;
  },

  async create(data: CreateCategoryDto): Promise<Category> {
    const response = await apiClient.post<{ success: boolean; data: Category }>(
      '/categories',
      data,
    );
    return response.data.data;
  },

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const response = await apiClient.patch<{
      success: boolean;
      data: Category;
    }>(`/categories/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};
