import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { RouteConstant } from '@/constants/routes.constant';
import { Button } from '@/components/ui/button';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(RouteConstant.LOGIN);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <span className="text-xl font-bold text-primary">CatatUang</span>
            <nav className="flex gap-6">
              <a href="#" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
                Dashboard
              </a>
              <a href="#" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
                Transactions
              </a>
              <a href="#" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
                Categories
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
};
