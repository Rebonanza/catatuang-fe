import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { RouteConstant } from '@/constants/routes.constant';
import type { ChangePasswordDto } from '../types/auth.type';

export const useChangePassword = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ChangePasswordDto) => authService.changePassword(data),
    onSuccess: () => {
      // Server revokes all refresh tokens, so we must clear local state and re-login
      logout();
      navigate(RouteConstant.LOGIN, {
        state: {
          message: 'Password changed successfully. Please log in again.',
        },
      });
    },
  });
};
