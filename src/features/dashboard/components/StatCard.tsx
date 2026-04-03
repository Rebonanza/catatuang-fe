import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  iconClassName,
}) => {
  return (
    <Card
      className={cn(
        'border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950 rounded-lg overflow-hidden',
        className,
      )}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">
            {title}
          </span>
          <div
            className={cn(
              'p-1.5 sm:p-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400',
              iconClassName,
            )}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 h-4" />
          </div>
        </div>

        <div className="space-y-0.5 sm:space-y-1">
          <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white break-all leading-tight">
            {value}
          </div>

          {(description || trend) && (
            <div className="flex items-center gap-2 mt-2">
              {trend && (
                <span
                  className={cn(
                    'text-[10px] font-black uppercase tracking-tight px-1.5 py-0.5 rounded-sm',
                    trend.isPositive
                      ? 'bg-primary/10 text-primary'
                      : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400',
                  )}
                >
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
              )}
              {description && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
