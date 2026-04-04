import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChangePasswordForm } from '@/features/auth/components/ChangePasswordForm';
import { useQuery } from '@tanstack/react-query';
import { authService } from '@/features/auth/services/auth.service';
import { User, Settings, Shield, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SettingsPage = () => {
  const { data: userResponse, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => authService.getMe(),
  });

  const user = userResponse?.data;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
                User Configuration
              </h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.1em] mt-1">
                Manage your account preferences and security
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 max-w-6xl">
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-24 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-slate-50 dark:border-slate-900" />
                <div className="px-6 pb-8 -mt-12 text-center">
                  <div className="inline-flex relative">
                    {isLoading ? (
                      <Skeleton className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-950 shadow-md" />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-900 shadow-lg flex items-center justify-center overflow-hidden group">
                        {user?.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <User className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    {isLoading ? (
                      <div className="space-y-2 flex flex-col items-center">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight uppercase italic tracking-tight">
                          {user?.name}
                        </h2>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                          Member since 2024
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-transparent transition-all hover:bg-white hover:border-slate-100 dark:hover:bg-slate-900 dark:hover:border-slate-800 group">
                    <div className="p-2 bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4 text-emerald-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Primary Email
                      </p>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate mt-0.5">
                        {isLoading ? (
                          <Skeleton className="h-3 w-40 mt-1" />
                        ) : (
                          user?.email
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-transparent transition-all hover:bg-white hover:border-slate-100 dark:hover:bg-slate-900 dark:hover:border-slate-800 group">
                    <div className="p-2 bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm group-hover:scale-105 transition-transform">
                      <Shield className="w-4 h-4 text-emerald-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Account Verification
                      </p>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Authenticated Securely
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {isLoading ? (
              <Card className="p-8 border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="space-y-6">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="space-y-4 pt-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              </Card>
            ) : (
              <ChangePasswordForm hasPassword={user?.hasPassword} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
