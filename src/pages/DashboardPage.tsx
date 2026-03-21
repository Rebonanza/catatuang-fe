import { DashboardLayout } from '@/components/layout/DashboardLayout';

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder for Stat Cards */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold tracking-tight text-sm text-muted-foreground uppercase">Total Balance</h3>
          <div className="text-2xl font-bold mt-2">$0.00</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold tracking-tight text-sm text-muted-foreground uppercase">Income</h3>
          <div className="text-2xl font-bold mt-2 text-green-600">$0.00</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold tracking-tight text-sm text-muted-foreground uppercase">Expenses</h3>
          <div className="text-2xl font-bold mt-2 text-red-600">$0.00</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold tracking-tight text-sm text-muted-foreground uppercase">Savings</h3>
          <div className="text-2xl font-bold mt-2 text-blue-600">0%</div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight">Recent Transactions</h2>
        <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow p-6 text-center text-muted-foreground">
          No transactions yet. Connect your Gmail or add one manually!
        </div>
      </div>
    </DashboardLayout>
  );
};
