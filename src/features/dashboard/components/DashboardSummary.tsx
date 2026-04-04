import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '../api/dashboard.api';
import { StatCard } from './StatCard';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Percent,
  CalendarDays,
  Eye,
  EyeOff,
} from 'lucide-react';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getPrevMonthLabel(month: number, year: number): string {
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  return `${MONTH_NAMES[prevMonth - 1]} ${prevYear}`;
}

export const DashboardSummary: React.FC = () => {
  const [isHidden, setIsHidden] = React.useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: () => getDashboardSummary(),
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-5 w-48 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse"
            />
          ))}
        </div>
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

  const mask = (value: string) => (isHidden ? 'Rp ••••••' : value);

  const savingsRate = data?.income
    ? Math.round((data.balance / data.income) * 100)
    : 0;

  const currentMonthLabel = data
    ? `${MONTH_NAMES[(data.month ?? 1) - 1]} ${data.year}`
    : '';
  const prevMonthLabel = data
    ? getPrevMonthLabel(data.month ?? 1, data.year ?? new Date().getFullYear())
    : '';

  return (
    <div className="space-y-3">
      {/* Period header */}
      {data && (
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <CalendarDays className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {currentMonthLabel}
          </span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>
            Trends vs{' '}
            <span className="font-medium text-slate-600 dark:text-slate-400">
              {prevMonthLabel}
            </span>
          </span>

          {/* Hide / Show toggle */}
          <button
            type="button"
            onClick={() => setIsHidden((prev) => !prev)}
            className="ml-auto flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label={isHidden ? 'Show amounts' : 'Hide amounts'}
          >
            {isHidden ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {isHidden ? 'Show' : 'Hide'}
            </span>
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 w-full min-w-0">
        <StatCard
          title="Total Balance"
          value={mask(formatCurrency(data?.balance || 0))}
          icon={Wallet}
          trend={data?.balanceTrend}
        />
        <StatCard
          title="Monthly Income"
          value={mask(formatCurrency(data?.income || 0))}
          icon={TrendingUp}
          trend={data?.incomeTrend}
          iconClassName="text-primary"
        />
        <StatCard
          title="Monthly Expenses"
          value={mask(formatCurrency(data?.expense || 0))}
          icon={TrendingDown}
          trend={data?.expenseTrend}
          iconClassName="text-red-500"
        />
        <StatCard
          title="Savings Rate"
          value={isHidden ? '••%' : `${savingsRate}%`}
          icon={Percent}
          description={`Of income saved this ${MONTH_NAMES[(data?.month ?? 1) - 1]}`}
          iconClassName="text-slate-500"
        />
      </div>
    </div>
  );
};
