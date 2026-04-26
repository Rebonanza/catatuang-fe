import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategorySummary } from '../api/dashboard.api';
import { Card, CardContent } from '@/components/ui/card';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { PieChart } from 'lucide-react';
import { formatCurrency, formatMonthYear } from '@/lib/format.util';

export const ExpenseChart: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['categorySummary'],
    queryFn: async () => {
      const res = await getCategorySummary();
      return res.data;
    },
  });

  const data = apiResponse ?? [];

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) {
    return (
      <div className="h-80 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="h-80 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg shadow-sm">
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 mb-3">
          <PieChart className="w-6 h-6 text-slate-300" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          No expense data yet
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Breakdown will appear here.
        </p>
      </Card>
    );
  }

  const monthLabel = formatMonthYear();

  return (
    <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Expense Breakdown
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            {monthLabel} · By Category
          </p>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-100 dark:border-slate-800">
          <PieChart className="w-4 h-4 text-primary" />
        </div>
      </div>
      <CardContent className="h-[300px] p-1 sm:p-6 overflow-hidden">
        <div className="w-full h-full min-w-0">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  strokeWidth={0}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: unknown) => formatCurrency(Number(value))}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '8px 12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    textTransform: 'uppercase',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  iconSize={8}
                  layout="horizontal"
                  wrapperStyle={{
                    paddingTop: '0px',
                    fontSize: '9px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    lineHeight: '1.4',
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
