import { useAuthStore } from '@/stores/auth.store';
import { useNavigate, NavLink } from 'react-router-dom';
import { RouteConstant } from '@/constants/routes.constant';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InstallAppButton } from '../InstallAppButton';
import {
  LayoutDashboard,
  Receipt,
  Tag,
  LogOut,
  User,
  Settings,
} from 'lucide-react';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(RouteConstant.LOGIN);
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: RouteConstant.DASHBOARD,
      icon: LayoutDashboard,
    },
    { label: 'Transactions', path: RouteConstant.TRANSACTIONS, icon: Receipt },
    { label: 'Categories', path: RouteConstant.CATEGORIES, icon: Tag },
    { label: 'Settings', path: RouteConstant.SETTINGS, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="flex h-16 items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate(RouteConstant.DASHBOARD)}
            >
              <img
                src="/logo.webp"
                alt="CatatUang"
                className="w-10 h-10 object-contain rounded-md"
              />
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
                CatatUang
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-md transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800',
                    )
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-4">
            <InstallAppButton />

            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-black uppercase tracking-tighter text-slate-700 dark:text-slate-200">
                {user?.name || 'User'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 shrink-0"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-8 animate-in fade-in duration-500">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 z-50 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 safe-area-bottom">
        <div className="flex items-center justify-around h-20 mx-auto px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1.5 p-2 rounded-md transition-colors w-24',
                  isActive ? 'text-primary bg-primary/5' : 'text-slate-500',
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[8px] font-black uppercase tracking-normal leading-none text-center truncate w-full">
                {item.label === 'Dashboard' ? 'Home' : item.label}
              </span>
            </NavLink>
          ))}

          {/* <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1.5 p-2 text-slate-400 hover:text-red-500 transition-colors w-16"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-normal leading-none text-center w-full">
              Exit
            </span>
          </button> */}
        </div>
      </nav>
    </div>
  );
};
