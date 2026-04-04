import { apiClient } from '@/config/axios.config';
import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  User,
  ChangePasswordDto,
} from '../types/auth.type';

export const authService = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await apiClient.post<{
      success: boolean;
      data: AuthResponse;
    }>('/auth/login', data);
    return response.data.data;
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await apiClient.post<{
      success: boolean;
      data: AuthResponse;
    }>('/auth/register', data);
    return response.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getMe(): Promise<{ success: boolean; data: User }> {
    const response = await apiClient.get<{ success: boolean; data: User }>(
      '/auth/me',
    );
    return response.data;
  },

  async changePassword(data: ChangePasswordDto): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>(
      '/auth/change-password',
      data,
    );
    return response.data;
  },
};
