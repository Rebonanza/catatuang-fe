import { apiClient } from '@/config/axios.config';
import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  User,
  ChangePasswordDto,
} from '../types/auth.type';
import type { ApiResponse } from '@/types/api.type';

export const authService = {
  async login(data: LoginDto): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      data,
    );
    return response.data;
  },

  async register(data: RegisterDto): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      data,
    );
    return response.data;
  },

  async logout(): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  },

  async getMe(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  async changePassword(data: ChangePasswordDto): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(
      '/auth/change-password',
      data,
    );
    return response.data;
  },
};
