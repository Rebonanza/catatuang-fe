import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';
import { RouteConstant } from '../constants/routes.constant';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 10000,
});

// Request interceptor — attach access token
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor — handle standardized envelope & error refresh
apiClient.interceptors.response.use(
  (response) => {
    // If the response follows our standardized envelope { success, data, meta }
    if (
      response.data &&
      typeof response.data === 'object' &&
      'success' in response.data
    ) {
      const { success, data, meta } = response.data;

      if (success) {
        // If meta and data are present at the top level, re-wrap for existing service patterns
        if (meta !== undefined && Array.isArray(data)) {
          return {
            ...response,
            data: { data, meta },
          };
        }
        // Otherwise, just return the data directly
        return {
          ...response,
          data,
        };
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshAccessToken } = useAuthStore.getState();
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = RouteConstant.LOGIN;
      }
    }
    return Promise.reject(error);
  },
);
