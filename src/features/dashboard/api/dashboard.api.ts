import { apiClient } from '@/config/axios.config';

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
