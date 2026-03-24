import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { authService } from '@/features/auth/services/auth.service';
import { RouteConstant } from '@/constants/routes.constant';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      setLoading(true);
      const res = await authService.register(data);
      if (res.success && res.data) {
        setTokens(res.data.accessToken, res.data.refreshToken);
        if (res.data.user) setUser(res.data.user);
        navigate(RouteConstant.DASHBOARD);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || err.message
          : 'Registration failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg overflow-hidden">
      <div className="px-8 pt-8 pb-6 border-b border-slate-50 dark:border-slate-900">
        <h1 className="text-2xl font-black tracking-tight text-center text-slate-900 dark:text-white uppercase italic">
          CatatUang
        </h1>
        <p className="text-[10px] font-black uppercase text-center text-slate-400 tracking-[0.2em] mt-2">
          New Account Registration
        </p>
      </div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 text-left">
            <Label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
            >
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Your Name"
              className="h-10 rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors focus:border-primary"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2 text-left">
            <Label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="h-10 rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors focus:border-primary"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2 text-left">
            <Label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
            >
              Secret Password
            </Label>
            <Input
              id="password"
              type="password"
              className="h-10 rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors focus:border-primary"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/50">
              <p className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase text-center">
                {error}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-md shadow-sm shadow-primary/20"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-50 dark:border-slate-900">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            Already have an account?{' '}
            <Link
              to={RouteConstant.LOGIN}
              className="text-primary hover:underline ml-1"
            >
              Login Here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
