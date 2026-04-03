import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardSummary } from '@/features/dashboard/components/DashboardSummary';
import { GmailConnectionCard } from '@/features/gmail/components/GmailConnectionCard';
import { ExpenseChart } from '@/features/dashboard/components/ExpenseChart';
import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '@/features/transactions/services/transactions.service';
import { Button } from '@/components/ui/button';
import { ArrowRight, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RouteConstant } from '@/constants/routes.constant';
import { cn } from '@/lib/utils';

export const DashboardPage = () => {
  const { data: recentTransactions, isLoading } = useQuery({
    queryKey: ['recentTransactions'],
    queryFn: () => transactionsService.getAll({ transactionType: '' }),
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Financial Overview
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Welcome back to your personal finance dashboard.
            </p>
          </div>
          <Link to={RouteConstant.TRANSACTIONS}>
            <Button className="bg-primary text-white h-10 px-6 rounded-md shadow-sm">
              Add Transaction
            </Button>
          </Link>
        </div>

        <DashboardSummary />

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <ExpenseChart />

            <section className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Recent Activity
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Your latest transactions
                  </p>
                </div>
                <Link
                  to={RouteConstant.TRANSACTIONS}
                  className="text-xs font-bold text-primary hover:underline flex items-center bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800"
                >
                  View all <ArrowRight className="ml-1.5 w-3 h-3" />
                </Link>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-md bg-slate-50 dark:bg-slate-900 animate-pulse"
                    />
                  ))}
                </div>
              ) : recentTransactions && recentTransactions.data.length > 0 ? (
                <div className="space-y-1">
                  {recentTransactions.data.slice(0, 5).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 rounded-md border border-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            'p-2 rounded-md',
                            tx.transactionType === 'income'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400',
                          )}
                        >
                          <Receipt className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 dark:text-white truncate">
                            {tx.merchant || 'Uncategorized'}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">
                            {new Date(tx.transactedAt)
                              .toLocaleString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                              })
                              .replace(',', '')}{' '}
                            • {tx.category?.name || 'No Category'}
                          </p>
                        </div>
                      </div>
                      <p
                        className={cn(
                          'font-black text-base',
                          tx.transactionType === 'income'
                            ? 'text-primary'
                            : 'text-slate-900 dark:text-white',
                        )}
                      >
                        {tx.transactionType === 'income' ? '+' : '-'}{' '}
                        {formatCurrency(Number(tx.amount))
                          .replace('Rp', '')
                          .trim()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center bg-slate-50/30">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <Receipt className="w-8 h-8 text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        No transactions yet
                      </h3>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                        Your recent spending will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            <GmailConnectionCard />

            {/* <Card className="bg-slate-900 dark:bg-slate-800 text-white border-none shadow-md overflow-hidden rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-md">
                    <Info className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold">Smart Saving</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-300 italic">
                  "Small steps every day lead to big results. Use Gmail Sync to
                  track every rupiah automatically."
                </p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Finance Tips
                  </span>
                  <Wallet className="w-4 h-4 text-slate-500" />
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
