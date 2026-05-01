export const RouteConstant = {
  HOME: '/',
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  CATEGORIES: '/categories',
  SETTINGS: '/settings',
  AUTH_CALLBACK: '/auth/callback',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
} as const;

export type RouteConstant = (typeof RouteConstant)[keyof typeof RouteConstant];
