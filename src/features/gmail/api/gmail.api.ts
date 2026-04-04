import { apiClient } from '@/config/axios.config';

export interface GmailStatus {
  success: boolean;
  connected: boolean;
  watchValid: boolean;
  lastSyncedAt?: string;
}

export const getGmailStatus = async (): Promise<GmailStatus> => {
  const response = await apiClient.get<GmailStatus>('/gmail/status');
  return response.data;
};

export const startGmailWatch = async () => {
  const response = await apiClient.post<unknown>('/gmail/connect');
  return response.data;
};

export const stopGmailWatch = async () => {
  const response = await apiClient.delete<unknown>('/gmail/disconnect');
  return response.data;
};

export const deleteGmailAccount = async () => {
  const response = await apiClient.delete<unknown>('/gmail/account');
  return response.data;
};

export const syncGmailManual = async () => {
  const response = await apiClient.post<{
    success: boolean;
    message: string;
  }>('/gmail/sync');
  return response.data;
};

export const getGoogleAuthUrl = () => {
  const baseUrl =
    import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
  return `${baseUrl}/auth/google`;
};
