export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  hasPassword?: boolean;
}

export interface ChangePasswordDto {
  currentPassword?: string;
  newPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

export interface LoginDto {
  email: string;
  password?: string;
}

export interface RegisterDto {
  email: string;
  password?: string;
  name: string;
}
