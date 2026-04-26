import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import {
  transactionSchema,
  type TransactionFormValues,
} from '../schemas/transaction.schema';
import { TransactionType } from '../types/transaction.type';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  useCreateTransaction,
  useUpdateTransaction,
} from '../hooks/useTransactions';
import type { Transaction } from '../types/transaction.type';
import type { Category } from '@/features/categories/types/category.type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export const TransactionForm = ({
  onSuccess,
  onCancel,
  initialData,
  showCard = true,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: Transaction;
  showCard?: boolean;
}) => {
  const { data: categoriesResult, isLoading: isCategoriesLoading } =
    useCategories();
  const categories = categoriesResult?.data || [];
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();

  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData
      ? {
          amount: initialData.amount,
          transactionType: initialData.transactionType,
          merchant: initialData.merchant || '',
          note: initialData.note || '',
          transactedAt: initialData.transactedAt,
          categoryId: initialData.categoryId || '',
        }
      : {
          transactionType: TransactionType.EXPENSE,
          transactedAt: new Date().toISOString(),
          amount: 0,
        },
  });

  const transactionType = watch('transactionType');
  const categoryId = watch('categoryId');
  const filteredCategories = categories.filter(
    (c: Category) =>
      c.transactionType === transactionType || c.id === categoryId,
  );

  const onSubmit = (data: TransactionFormValues) => {
    if (isEditing && initialData) {
      updateTransaction.mutate(
        { id: initialData.id, data },
        {
          onSuccess: () => {
            reset();
            onSuccess?.();
          },
        },
      );
    } else {
      createTransaction.mutate(data, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });
    }
  };

  const isPending = createTransaction.isPending || updateTransaction.isPending;

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <Label
            htmlFor="merchant"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
          >
            Merchant / Description
          </Label>
          <Input
            id="merchant"
            className="h-10 py-2 rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors focus:border-primary"
            placeholder="Starbucks, Salary..."
            {...register('merchant')}
          />
          {errors.merchant && (
            <p className="text-[10px] text-destructive font-bold uppercase mt-1 ml-1">
              {errors.merchant.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5 text-left">
          <Label
            htmlFor="amount"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
          >
            Amount (IDR)
          </Label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <NumericFormat
                id="amount"
                customInput={Input}
                className="h-10 py-2 rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors focus:border-primary font-mono font-bold"
                placeholder="0"
                thousandSeparator="."
                decimalSeparator=","
                value={field.value || ''}
                onValueChange={(values) => {
                  field.onChange(values.floatValue || 0);
                }}
              />
            )}
          />
          {errors.amount && (
            <p className="text-[10px] text-destructive font-bold uppercase mt-1 ml-1">
              {errors.amount.message}
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
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  setValue('categoryId', '');
                }}
                value={field.value}
              >
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

        <div className="space-y-1.5 text-left">
          <Label
            htmlFor="categoryId"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
          >
            Category
          </Label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className="w-full h-10 py-2 rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  disabled={isCategoriesLoading}
                >
                  <SelectValue
                    placeholder={
                      isCategoriesLoading ? 'Loading...' : 'Select category'
                    }
                  >
                    {field.value &&
                      categories.find((c: Category) => c.id === field.value)
                        ?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-md">
                  <SelectGroup>
                    <SelectLabel className="text-[10px] uppercase font-black text-slate-400">
                      Available Categories
                    </SelectLabel>
                    {filteredCategories.map((category: Category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        className="rounded-md"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                    {filteredCategories.length === 0 && (
                      <div className="py-6 px-2 text-center text-xs text-slate-400 font-bold uppercase italic">
                        No categories found
                      </div>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.categoryId && (
            <p className="text-[10px] text-destructive font-bold uppercase mt-1 ml-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left">
            <Label
              htmlFor="transactedAt"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
            >
              Date
            </Label>
            <Controller
              name="transactedAt"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full h-10 py-2 px-3 justify-start text-left font-medium rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                        {field.value ? (
                          format(new Date(field.value), 'LLL dd, yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    }
                  />
                  <PopoverContent
                    className="w-auto p-0 rounded-md border-slate-200 dark:border-slate-800 shadow-xl"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (!date) return;
                        const currentTime = field.value
                          ? new Date(field.value)
                          : new Date();
                        date.setHours(currentTime.getHours());
                        date.setMinutes(currentTime.getMinutes());
                        field.onChange(date.toISOString());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>

          <div className="space-y-1.5 text-left">
            <Label
              htmlFor="transactionTime"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
            >
              Time (HH:mm)
            </Label>
            <Controller
              name="transactedAt"
              control={control}
              render={({ field }) => (
                <Input
                  id="transactionTime"
                  type="time"
                  className="h-10 py-2 rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors focus:border-primary"
                  value={
                    field.value ? format(new Date(field.value), 'HH:mm') : ''
                  }
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value
                      .split(':')
                      .map(Number);
                    if (hours === undefined || minutes === undefined) return;
                    const date = field.value
                      ? new Date(field.value)
                      : new Date();
                    date.setHours(hours);
                    date.setMinutes(minutes);
                    date.setSeconds(0);
                    field.onChange(date.toISOString());
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <Label
            htmlFor="note"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
          >
            Note (Optional)
          </Label>
          <Input
            id="note"
            className="h-10 rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors focus:border-primary"
            placeholder="Details..."
            {...register('note')}
          />
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
          {isPending ? 'Saving...' : 'Save Record'}
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
          {isEditing ? 'Edit Transaction' : 'New Transaction'}
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
