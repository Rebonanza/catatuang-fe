import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import type { User } from '@/features/auth/types/auth.type';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken });
        localStorage.setItem('refreshToken', refreshToken);
      },
      setUser: (user) => set({ user }),
      logout: () => {
        set({ accessToken: null, user: null });
        localStorage.removeItem('refreshToken');
      },
      refreshAccessToken: async () => {
        const refresh = localStorage.getItem('refreshToken');
        if (!refresh) throw new Error('No refresh token available');

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL || '/api/v1'}/auth/refresh`,
            {
              refreshToken: refresh,
            },
          );
          const { accessToken, refreshToken } = res.data.data;
          get().setTokens(accessToken, refreshToken);
          return accessToken;
        } catch (error) {
          get().logout();
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
