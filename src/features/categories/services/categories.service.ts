import { apiClient } from '@/config/axios.config';
import type { ApiResponse, ApiPaginatedResponse } from '@/types/api.type';

import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../types/category.type';

export const categoriesService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
  }): Promise<ApiPaginatedResponse<Category>> {
    const response = await apiClient.get<ApiPaginatedResponse<Category>>(
      '/categories',
      { params },
    );
    return response.data;
  },

  async create(data: CreateCategoryDto): Promise<ApiResponse<Category>> {
    const response = await apiClient.post<ApiResponse<Category>>(
      '/categories',
      data,
    );
    return response.data;
  },

  async update(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const response = await apiClient.patch<ApiResponse<Category>>(
      `/categories/${id}`,
      data,
    );
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/categories/${id}`,
    );
    return response.data;
  },
};
