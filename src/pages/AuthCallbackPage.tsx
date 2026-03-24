import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { authService } from '@/features/auth/services/auth.service';
import { RouteConstant } from '@/constants/routes.constant';

export const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);

      // Fetch user data
      authService
        .getMe()
        .then((res) => {
          if (res.success) {
            setUser(res.data);
            navigate(RouteConstant.DASHBOARD, { replace: true });
          } else {
            navigate(RouteConstant.LOGIN, { replace: true });
          }
        })
        .catch(() => {
          navigate(RouteConstant.LOGIN, { replace: true });
        });
    } else {
      navigate(RouteConstant.LOGIN, { replace: true });
    }
  }, [searchParams, setTokens, setUser, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm font-medium text-muted-foreground">
          Completing login...
        </p>
      </div>
    </div>
  );
};
