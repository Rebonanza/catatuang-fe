import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { TransactionForm } from '@/features/transactions/components/TransactionForm';
import { Button } from '@/components/ui/button';
import { Plus, CalendarIcon, Download } from 'lucide-react';
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
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 rounded-md border-slate-200 dark:border-slate-800"
            >
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setEditingTransaction(undefined);
                setIsFormOpen(true);
              }}
              className="h-10 px-4 rounded-md bg-primary text-white hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" /> New Transaction
            </Button>
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
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1.5 flex-1 min-w-[180px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Type
              </label>
              <Select
                value={transactionType}
                onValueChange={(value) => {
                  setTransactionType(value || 'all');
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full h-10 py-2 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-md">
                  <SelectValue placeholder="All Types" />
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

            <div className="space-y-1.5 flex-1 min-w-[180px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Category
              </label>
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value || 'all');
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full h-10 py-2 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-md">
                  <SelectValue placeholder="All Categories" />
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

            <div className="space-y-1.5 min-w-[240px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Date Range
              </label>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full h-10 py-2 justify-start text-left font-medium bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-md',
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
                variant="ghost"
                onClick={clearFilters}
                className="h-10 px-4 text-slate-400 hover:text-primary font-bold text-xs"
              >
                Reset
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
