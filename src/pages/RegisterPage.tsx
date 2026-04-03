import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { InstallAppButton } from '@/components/InstallAppButton';

export const RegisterPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="absolute top-4 right-4">
        <InstallAppButton />
      </div>
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};
