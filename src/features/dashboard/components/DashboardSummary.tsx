import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '../api/dashboard.api';
import { StatCard } from './StatCard';
import { Wallet, TrendingUp, TrendingDown, Percent } from 'lucide-react';

export const DashboardSummary: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: () => getDashboardSummary(),
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 font-bold text-xs uppercase tracking-wider">
        Failed to load dashboard summary.
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const savingsRate = data?.income
    ? Math.round((data.balance / data.income) * 100)
    : 0;

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 w-full min-w-0">
      <StatCard
        title="Total Balance"
        value={formatCurrency(data?.balance || 0)}
        icon={Wallet}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Monthly Income"
        value={formatCurrency(data?.income || 0)}
        icon={TrendingUp}
        trend={{ value: 8, isPositive: true }}
        iconClassName="text-primary"
      />
      <StatCard
        title="Monthly Expenses"
        value={formatCurrency(data?.expense || 0)}
        icon={TrendingDown}
        trend={{ value: 5, isPositive: false }}
        iconClassName="text-red-500"
      />
      <StatCard
        title="Savings Rate"
        value={`${savingsRate}%`}
        icon={Percent}
        description="Of income saved"
        iconClassName="text-slate-500"
      />
    </div>
  );
};
