import { apiClient } from '@/config/axios.config';
import type { ApiResponse } from '@/types/api.type';

export interface Trend {
  value: number;
  isPositive: boolean;
  noData: boolean;
}

export interface DashboardSummary {
  month: number;
  year: number;
  income: number;
  incomeTrend: Trend;
  expense: number;
  expenseTrend: Trend;
  balance: number;
  balanceTrend: Trend;
}

export const getDashboardSummary = async (
  month?: number,
  year?: number,
): Promise<ApiResponse<DashboardSummary>> => {
  const params = new URLSearchParams();
  if (month) params.append('month', month.toString());
  if (year) params.append('year', year.toString());

  const response = await apiClient.get<ApiResponse<DashboardSummary>>(
    `/transactions/summary`,
    { params },
  );
  return response.data;
};

export interface CategorySummary {
  name: string;
  value: number;
  color: string;
}

export const getCategorySummary = async (
  month?: number,
  year?: number,
): Promise<ApiResponse<CategorySummary[]>> => {
  const params = new URLSearchParams();
  if (month) params.append('month', month.toString());
  if (year) params.append('year', year.toString());

  const response = await apiClient.get<ApiResponse<CategorySummary[]>>(
    `/transactions/categories-summary`,
    { params },
  );
  return response.data;
};
