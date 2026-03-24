import { apiClient } from '@/config/axios.config';

export interface GmailStatus {
  success: boolean;
  connected: boolean;
  watchValid: boolean;
  lastSyncedAt?: string;
}

export const getGmailStatus = async (): Promise<GmailStatus> => {
  const response = await apiClient.get<{
    success: boolean;
    data: GmailStatus;
  }>('/gmail/status');
  return response.data.data;
};

export const startGmailWatch = async () => {
  const response = await apiClient.post<{
    success: boolean;
    data: any;
  }>('/gmail/connect');
  return response.data.data;
};

export const stopGmailWatch = async () => {
  const response = await apiClient.delete<{
    success: boolean;
    data: any;
  }>('/gmail/disconnect');
  return response.data.data;
};

export const deleteGmailAccount = async () => {
  const response = await apiClient.delete<{
    success: boolean;
    data: any;
  }>('/gmail/account');
  return response.data.data;
};

export const syncGmailManual = async () => {
  const response = await apiClient.post<{
    success: boolean;
    data: {
      success: boolean;
      message: string;
    };
  }>('/gmail/sync');
  return response.data.data;
};

export const getGoogleAuthUrl = () => {
  const baseUrl =
    import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
  return `${baseUrl}/auth/google`;
};
