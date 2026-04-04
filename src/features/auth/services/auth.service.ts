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
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  async changePassword(data: ChangePasswordDto): Promise<void> {
    await apiClient.post('/auth/change-password', data);
  },
};
