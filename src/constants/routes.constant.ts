export const RouteConstant = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  CATEGORIES: '/categories',
  AUTH_CALLBACK: '/auth/callback',
} as const;

export type RouteConstant = (typeof RouteConstant)[keyof typeof RouteConstant];
