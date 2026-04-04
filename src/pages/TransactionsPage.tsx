import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { TransactionForm } from '@/features/transactions/components/TransactionForm';
import { Button } from '@/components/ui/button';
import { Plus, CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import {
  TransactionType,
  type Transaction,
} from '../features/transactions/types/transaction.type';
import { useCategories } from '@/features/categories/hooks/useCategories';
import type { Category } from '@/features/categories/services/categories.service';
import { cn } from '@/lib/utils';
import { AppPagination } from '@/components/ui/AppPagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const TransactionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [transactionType, setTransactionType] = useState<string>('all');
  const [categoryId, setCategoryId] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const { data: categoriesResult } = useCategories();
  const categories = categoriesResult?.data || [];

  const { data: transactionsResult, isLoading } = useTransactions({
    startDate: dateRange.from?.toISOString(),
    endDate: dateRange.to?.toISOString(),
    transactionType: transactionType === 'all' ? '' : transactionType,
    categoryId: categoryId === 'all' ? '' : categoryId,
    page: currentPage,
    limit: itemsPerPage,
  });

  const transactions = transactionsResult?.data || [];
  const meta = transactionsResult?.meta;

  const clearFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setTransactionType('all');
    setCategoryId('all');
    setCurrentPage(1);
  };

  const hasFilters =
    dateRange.from !== undefined ||
    dateRange.to !== undefined ||
    transactionType !== 'all' ||
    categoryId !== 'all';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Transactions
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage and track your financial activities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Action buttons can be added here if needed in the future */}
          </div>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent
            className="sm:max-w-2xl p-0 overflow-hidden border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl"
            showCloseButton={false}
          >
            <TransactionForm
              initialData={editingTransaction}
              onSuccess={() => {
                setIsFormOpen(false);
                setEditingTransaction(undefined);
              }}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTransaction(undefined);
              }}
            />
          </DialogContent>
        </Dialog>

        <div className="bg-white dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
            <div className="space-y-1.5 w-full sm:flex-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Type
              </label>
              <Select
                value={transactionType}
                onValueChange={(value) => {
                  setTransactionType(value || 'all');
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full h-11 py-2 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-md focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="All Types">
                    {transactionType === 'all'
                      ? 'All Types'
                      : transactionType === TransactionType.INCOME
                        ? 'Income'
                        : 'Expense'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-md">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                  <SelectItem value={TransactionType.EXPENSE}>
                    Expense
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 w-full sm:flex-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Category
              </label>
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value || 'all');
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full h-11 py-2 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-md focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="All Categories">
                    {categoryId === 'all'
                      ? 'All Categories'
                      : (categories.find(
                          (cat: Category) => cat.id === categoryId,
                        )?.name ?? 'All Categories')}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-md">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat: Category) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 w-full sm:min-w-[240px]">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Date Range
              </label>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full h-11 py-2 justify-start text-left font-medium bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-md focus:ring-2 focus:ring-primary/20',
                        !dateRange.from && 'text-slate-400',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'LLL dd')} -{' '}
                            {format(dateRange.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(dateRange.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  }
                />
                <PopoverContent
                  className="w-auto p-0 rounded-md border-slate-200 dark:border-slate-800 shadow-xl"
                  align="start"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range || { from: undefined, to: undefined });
                      setCurrentPage(1);
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {hasFilters && (
              <Button
                variant="secondary"
                onClick={clearFilters}
                className="h-11 px-6 text-slate-500 hover:text-red-500 font-black uppercase tracking-widest text-[10px] w-full sm:w-auto bg-slate-100/50 dark:bg-slate-900/50 border-none rounded-md"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        <TransactionList
          transactions={transactions}
          isLoading={isLoading}
          onEdit={(tx) => {
            setEditingTransaction(tx);
            setIsFormOpen(true);
          }}
        />

        {/* Floating Action Button */}
        <Button
          size="icon"
          onClick={() => {
            setEditingTransaction(undefined);
            setIsFormOpen(true);
          }}
          className="fixed bottom-28 md:bottom-8 right-6 md:right-8 w-14 h-14 rounded-2xl bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/40 z-50 animate-in zoom-in duration-300"
        >
          <Plus className="w-6 h-6" />
        </Button>

        {meta && meta.totalPages > 1 && (
          <div className="mt-8 mb-12 flex justify-center">
            <AppPagination
              currentPage={currentPage}
              totalPages={meta.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
