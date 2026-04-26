import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import {
  categorySchema,
  type CategoryFormValues,
} from '../schemas/category.schema';
import { useCreateCategory, useUpdateCategory } from '../hooks/useCategories';
import { TransactionType } from '@/features/transactions/types/transaction.type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import type { Category } from '../types/category.type';

interface CategoryFormProps {
  initialData?: Category;
  onSuccess?: () => void;
  onCancel?: () => void;
  showCard?: boolean;
}

export const CategoryForm = ({
  initialData,
  onSuccess,
  onCancel,
  showCard = true,
}: CategoryFormProps) => {
  const isEditing = !!initialData;
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || '',
      transactionType: initialData?.transactionType || TransactionType.EXPENSE,
      icon: initialData?.icon || 'tag',
      color: initialData?.color || '#3b82f6',
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    if (isEditing && initialData) {
      updateCategory.mutate(
        {
          id: initialData.id,
          data: data,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );
    } else {
      createCategory.mutate(data, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });
    }
  };

  const isPending = createCategory.isPending || updateCategory.isPending;

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <Label
            htmlFor="name"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
          >
            Category Name
          </Label>
          <Input
            id="name"
            className="h-10 py-2 rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors focus:border-primary"
            placeholder="e.g. Coffee, Salary"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-[10px] text-destructive font-bold uppercase mt-1 ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5 text-left">
          <Label
            htmlFor="transactionType"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
          >
            Transaction Type
          </Label>
          <Controller
            name="transactionType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-10 py-2 rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-md">
                  <SelectGroup>
                    <SelectLabel className="text-[10px] uppercase font-black text-slate-400">
                      Action Type
                    </SelectLabel>
                    <SelectItem
                      value={TransactionType.EXPENSE}
                      className="text-red-600 dark:text-red-400 font-bold"
                    >
                      Expense
                    </SelectItem>
                    <SelectItem
                      value={TransactionType.INCOME}
                      className="text-primary font-bold"
                    >
                      Income
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.transactionType && (
            <p className="text-[10px] text-destructive font-bold uppercase mt-1 ml-1">
              {errors.transactionType.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-900 mt-4">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="h-10 px-6 rounded-md font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="h-10 px-8 rounded-md font-bold text-xs uppercase tracking-widest bg-primary text-white"
        >
          {isPending
            ? 'Saving...'
            : isEditing
              ? 'Update Category'
              : 'Save Category'}
        </Button>
      </div>
    </form>
  );

  if (!showCard) {
    return <div className="p-6 bg-white dark:bg-slate-950">{formContent}</div>;
  }

  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md overflow-hidden rounded-lg">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {isEditing ? 'Edit Category' : 'New Category'}
        </h3>
        {onCancel && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md text-slate-400"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="p-6">{formContent}</div>
    </Card>
  );
};
