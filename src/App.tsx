import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteConstant } from './constants/routes.constant';
import { useAuthStore } from './stores/auth.store';
import type { ReactNode } from 'react';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuthStore();
  if (!accessToken) {
    return <Navigate to={RouteConstant.LOGIN} replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={RouteConstant.LOGIN} element={<LoginPage />} />
      <Route path={RouteConstant.REGISTER} element={<RegisterPage />} />
      <Route
        path={RouteConstant.AUTH_CALLBACK}
        element={<AuthCallbackPage />}
      />

      {/* Protected Routes */}
      <Route
        path={RouteConstant.HOME}
        element={
          <ProtectedRoute>
            <Navigate to={RouteConstant.DASHBOARD} replace />
          </ProtectedRoute>
        }
      />
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

      {/* Fallback */}
      <Route path="*" element={<Navigate to={RouteConstant.HOME} replace />} />
    </Routes>
  );
}

export default App;
