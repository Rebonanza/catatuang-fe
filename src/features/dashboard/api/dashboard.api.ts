import { apiClient } from '@/config/axios.config';

export interface DashboardSummary {
  month: number;
  year: number;
  income: number;
  expense: number;
  balance: number;
}

export const getDashboardSummary = async (
  month?: number,
  year?: number,
): Promise<DashboardSummary> => {
  const params = new URLSearchParams();
  if (month) params.append('month', month.toString());
  if (year) params.append('year', year.toString());

  const response = await apiClient.get<{
    success: boolean;
    data: DashboardSummary;
  }>(`/transactions/summary`, { params });
  return response.data.data;
};

export interface CategorySummary {
  name: string;
  value: number;
  color: string;
}

export const getCategorySummary = async (
  month?: number,
  year?: number,
): Promise<CategorySummary[]> => {
  const params = new URLSearchParams();
  if (month) params.append('month', month.toString());
  if (year) params.append('year', year.toString());

  const response = await apiClient.get<{
    success: boolean;
    data: CategorySummary[];
  }>(`/transactions/categories-summary`, { params });
  return response.data.data;
};
