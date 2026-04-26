import { apiClient } from '@/config/axios.config';
import type { ApiResponse } from '@/types/api.type';

export interface GmailStatus {
  success: boolean;
  connected: boolean;
  watchValid: boolean;
  lastSyncedAt?: string;
}

export const getGmailStatus = async (): Promise<ApiResponse<GmailStatus>> => {
  const response =
    await apiClient.get<ApiResponse<GmailStatus>>('/gmail/status');
  return response.data;
};

export const startGmailWatch = async (): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>('/gmail/connect');
  return response.data;
};

export const stopGmailWatch = async (): Promise<ApiResponse> => {
  const response = await apiClient.delete<ApiResponse>('/gmail/disconnect');
  return response.data;
};

export const deleteGmailAccount = async (): Promise<ApiResponse> => {
  const response = await apiClient.delete<ApiResponse>('/gmail/account');
  return response.data;
};

export const syncGmailManual = async (): Promise<
  ApiResponse<{
    success: boolean;
    message: string;
  }>
> => {
  const response = await apiClient.post<
    ApiResponse<{
      success: boolean;
      message: string;
    }>
  >('/gmail/sync');
  return response.data;
};

export const getGoogleAuthUrl = () => {
  const baseUrl =
    import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
  return `${baseUrl}/auth/google`;
};
