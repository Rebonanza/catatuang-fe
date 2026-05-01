import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteConstant } from './constants/routes.constant';
import { useAuthStore } from './stores/auth.store';
import type { ReactNode } from 'react';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { LandingPage } from './pages/LandingPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuthStore();
  if (!accessToken) {
    return <Navigate to={RouteConstant.LOGIN} replace />;
  }
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuthStore();
  if (accessToken) {
    return <Navigate to={RouteConstant.DASHBOARD} replace />;
  }
  return <>{children}</>;
};

import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect } from 'react';
import { fcmService } from './features/notifications/services/fcm.service';
import { onMessage } from 'firebase/messaging';
import { messaging } from './config/firebase.config';

function App() {
  // Register PWA service worker
  useRegisterSW({
    onRegistered() {
      // Service worker successfully registered
    },
    onRegisterError() {
      // Error during service worker registration
    },
  });

  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        fcmService.requestPermissionAndGetToken();
      }, 3000);

      // Listen for foreground messages
      const unsubscribe = onMessage(messaging, (payload) => {
        if (payload.notification) {
          if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then((registration) => {
              registration.showNotification(
                payload.notification?.title || 'CatatUang',
                {
                  body: payload.notification?.body,
                  icon: '/android-chrome-192x192.png',
                  badge: '/favicon-32x32.png',
                  tag: 'transaction-notification',
                  data: payload.data,
                },
              );
            });
          }
        }
      });

      return () => {
        clearTimeout(timer);
        unsubscribe();
      };
    }
  }, [accessToken]);

  return (
    <Routes>
      {/* Public Routes (no auth required, no redirect if logged in) */}
      <Route
        path={RouteConstant.PRIVACY_POLICY}
        element={<PrivacyPolicyPage />}
      />
      <Route
        path={RouteConstant.TERMS_OF_SERVICE}
        element={<TermsOfServicePage />}
      />

      {/* Auth Routes */}
      <Route
        path={RouteConstant.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={RouteConstant.REGISTER}
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path={RouteConstant.AUTH_CALLBACK}
        element={<AuthCallbackPage />}
      />

      {/* Landing / Home */}
      <Route
        path={RouteConstant.HOME}
        element={
          accessToken ? (
            <Navigate to={RouteConstant.DASHBOARD} replace />
          ) : (
            <LandingPage />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path={RouteConstant.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteConstant.TRANSACTIONS}
        element={
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteConstant.CATEGORIES}
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteConstant.SETTINGS}
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={RouteConstant.HOME} replace />} />
    </Routes>
  );
}

export default App;
