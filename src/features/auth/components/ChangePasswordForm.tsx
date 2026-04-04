import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  changePasswordSchema,
  setPasswordSchema,
} from '../schemas/change-password.schema';
import { useChangePassword } from '../hooks/useChangePassword';
import type { ChangePasswordDto } from '../types/auth.type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, Info, Loader2 } from 'lucide-react';

interface ChangePasswordFormProps {
  hasPassword?: boolean;
}

interface FormValues {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordForm = ({
  hasPassword,
}: ChangePasswordFormProps) => {
  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(
      hasPassword ? changePasswordSchema : setPasswordSchema,
    ),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    changePassword(data as ChangePasswordDto);
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden bg-white dark:bg-slate-950">
      <CardHeader className="border-b border-slate-50 dark:border-slate-900 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-md">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-none">
            {hasPassword ? 'Update Security' : 'Set Account Password'}
          </CardTitle>
        </div>
        <CardDescription className="text-sm font-medium text-slate-500">
          {hasPassword
            ? 'Change your current password to a new, secure one.'
            : 'You currently sign in via Google. Setting a password adds an extra layer of security and allows you to log in with your email directly.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8">
        {!hasPassword && (
          <Alert className="mb-8 bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/50">
            <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <div className="ml-2">
              <AlertTitle className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Google Account Connected
              </AlertTitle>
              <AlertDescription className="text-xs font-medium text-emerald-600 dark:text-emerald-500/80 leading-relaxed mt-1.5">
                Setting a password will allow you to log in using your email and
                password as an alternative to Google Sign-In.
              </AlertDescription>
            </div>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {hasPassword && (
            <div className="space-y-2.5">
              <Label
                htmlFor="currentPassword"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1"
              >
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                className="h-11 rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                {...register('currentPassword')}
              />
              {errors.currentPassword && (
                <p className="text-[10px] text-red-500 font-bold uppercase mt-1.5 ml-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-red-500" />
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2.5">
            <Label
              htmlFor="newPassword"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              className="h-11 rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <p className="text-[10px] text-red-500 font-bold uppercase mt-1.5 ml-1 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-red-500" />
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <Label
              htmlFor="confirmPassword"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1"
            >
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="h-11 rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-[10px] text-red-500 font-bold uppercase mt-1.5 ml-1 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-red-500" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-50 dark:border-slate-900">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.15em] text-xs rounded-md shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : hasPassword ? (
                'Update Security Credentials'
              ) : (
                'Establish Account Password'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
