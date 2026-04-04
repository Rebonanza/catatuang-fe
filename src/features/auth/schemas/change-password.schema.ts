import { z } from 'zod';

/**
 * Shared base for all password update forms
 */
const passwordFields = {
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
};

export const changePasswordSchema = z
  .object({
    ...passwordFields,
    currentPassword: z.string().min(1, 'Current password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const setPasswordSchema = z
  .object({
    ...passwordFields,
    currentPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type SetPasswordFormData = z.infer<typeof setPasswordSchema>;
