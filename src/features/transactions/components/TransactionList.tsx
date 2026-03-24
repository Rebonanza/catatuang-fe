import { useState } from 'react';
import {
  Pencil,
  Trash2,
  Mail,
  User,
  Info,
  ArrowUpCircle,
  ArrowDownCircle,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { TransactionType, type Transaction } from '../types/transaction.type';
import { useDeleteTransaction } from '../hooks/useTransactions';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onEdit: (transaction: Transaction) => void;
}

export const TransactionList = ({
  transactions,
  isLoading,
  onEdit,
}: TransactionListProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const deleteTransaction = useDeleteTransaction();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === transactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(transactions.map((t) => t.id));
    }
  };

  const formatAmount = (amount: number, type: TransactionType) => {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
    return type === TransactionType.EXPENSE
      ? `- ${formatted}`
      : `+ ${formatted}`;
  };

  const formatDate = (date: string) => {
    return new Date(date)
      .toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(',', '');
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-20 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/30">
        <div className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Info className="h-6 w-6 text-slate-300" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          No transactions found
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Try adjusting your filters or add a new transaction.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={
                selectedIds.length === transactions.length &&
                transactions.length > 0
              }
              onCheckedChange={toggleSelectAll}
              id="select-all"
            />
            <label
              htmlFor="select-all"
              className="text-[10px] font-black uppercase tracking-wider text-slate-500 cursor-pointer"
            >
              Select All ({selectedIds.length})
            </label>
          </div>
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="h-8 px-3 text-[10px] font-black uppercase tracking-widest rounded-md"
              onClick={() => {
                if (
                  window.confirm(`Delete ${selectedIds.length} transactions?`)
                ) {
                  // Bulk delete logic would go here
                  setSelectedIds([]);
                }
              }}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete Selected
            </Button>
          )}
        </div>
      )}

      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={cn(
              'flex items-center gap-4 p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors',
              selectedIds.includes(transaction.id) &&
                'border-primary bg-primary/5',
            )}
          >
            <Checkbox
              checked={selectedIds.includes(transaction.id)}
              onCheckedChange={() => toggleSelect(transaction.id)}
            />

            <div
              className={cn(
                'p-2 rounded-md shrink-0',
                transaction.transactionType === TransactionType.INCOME
                  ? 'bg-primary/10 text-primary'
                  : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400',
              )}
            >
              {transaction.transactionType === TransactionType.INCOME ? (
                <ArrowUpCircle className="h-5 w-5" />
              ) : (
                <ArrowDownCircle className="h-5 w-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate">
                    {transaction.merchant}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3 w-3 text-slate-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        {transaction.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                    <div className="text-[10px] font-medium text-slate-400">
                      {formatDate(transaction.transactedAt)}
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded-md">
                      {transaction.source === 'auto_parsed' ? (
                        <Mail className="h-2.5 w-2.5 text-slate-400" />
                      ) : (
                        <User className="h-2.5 w-2.5 text-slate-400" />
                      )}
                      <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500">
                        {transaction.source}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={cn(
                      'font-black tracking-tight',
                      transaction.transactionType === TransactionType.INCOME
                        ? 'text-primary'
                        : 'text-slate-900 dark:text-white',
                    )}
                  >
                    {formatAmount(
                      transaction.amount,
                      transaction.transactionType,
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-md text-slate-400 hover:text-primary hover:bg-primary/5"
                      onClick={() => onEdit(transaction)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-md text-slate-400 hover:text-destructive hover:bg-destructive/5"
                      onClick={() => {
                        if (window.confirm('Delete this transaction?')) {
                          deleteTransaction.mutate(transaction.id);
                        }
                      }}
                      disabled={deleteTransaction.isPending}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
