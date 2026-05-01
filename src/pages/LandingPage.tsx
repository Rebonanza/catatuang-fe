import { Link } from 'react-router-dom';
import { RouteConstant } from '@/constants/routes.constant';
import {
  Mail,
  ShieldCheck,
  BarChart3,
  Sparkles,
  ArrowRight,
  Wallet,
  Tag,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    icon: Mail,
    title: 'Gmail Auto-Sync',
    description:
      'Automatically parse transaction emails from your bank and e-wallet.',
    iconBg: 'bg-blue-500/10 text-blue-500',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: BarChart3,
    title: 'Visual Analytics',
    description: 'Interactive charts and breakdowns of your spending patterns.',
    iconBg: 'bg-emerald-500/10 text-emerald-500',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Tag,
    title: 'Smart Categories',
    description: 'Auto-categorize transactions to match your financial habits.',
    iconBg: 'bg-violet-500/10 text-violet-500',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description: 'Your data is encrypted with bank-grade AES-256 encryption.',
    iconBg: 'bg-amber-500/10 text-amber-500',
    gradient: 'from-amber-500 to-orange-400',
  },
] as const;

const STEPS = [
  {
    step: '01',
    title: 'Create Account',
    description: 'Sign up with email or Google.',
  },
  {
    step: '02',
    title: 'Connect Gmail',
    description: 'Link Gmail to auto-detect bank emails.',
  },
  {
    step: '03',
    title: 'Track & Analyze',
    description: 'Watch finances organize themselves.',
  },
] as const;

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            to={RouteConstant.LANDING}
            className="flex items-center gap-2.5"
          >
            <img
              src="/logo.webp"
              alt="CatatUang"
              className="w-9 h-9 object-contain rounded-lg"
            />
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              CatatUang
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to={RouteConstant.LOGIN}>
              <Button
                variant="ghost"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Login
              </Button>
            </Link>
            <Link to={RouteConstant.REGISTER}>
              <Button className="h-9 px-5 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-lg shadow-md shadow-primary/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-28 sm:pt-28 sm:pb-36">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Smart Financial Tracking
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Track Your Money{' '}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Automatically sync transactions from your Gmail, categorize
              spending, and gain full visibility into your financial health.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={RouteConstant.REGISTER}>
                <Button className="h-12 px-8 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-primary/25 group">
                  Start Free{' '}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to={RouteConstant.LOGIN}>
                <Button
                  variant="outline"
                  className="h-12 px-8 border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-xs rounded-xl"
                >
                  I already have an account
                </Button>
              </Link>
            </div>
            <div className="mt-14 flex items-center justify-center gap-6 text-slate-400 flex-wrap">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Free Forever
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Bank-Grade Security
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Real-time Sync
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Everything You Need
            </h2>
            <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">
              Powerful features to make personal finance tracking simple and
              automated.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-5`}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
                <div
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${f.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Get Started in Minutes
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={s.step} className="relative text-center group">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-gradient-to-r from-primary/30 to-primary/10" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-105 transition-transform">
                  <span className="text-lg font-black text-primary">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Ready to Take Control of{' '}
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Your Finances?
            </span>
          </h2>
          <p className="mt-5 text-slate-400 text-base max-w-md mx-auto">
            Join users who trust CatatUang to manage their personal finances
            smarter.
          </p>
          <Link to={RouteConstant.REGISTER}>
            <Button className="mt-10 h-12 px-10 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-primary/30 group">
              Create Free Account{' '}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.webp"
                alt="CatatUang"
                className="w-7 h-7 object-contain rounded-md"
              />
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
                CatatUang
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                to={RouteConstant.PRIVACY_POLICY}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to={RouteConstant.TERMS_OF_SERVICE}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              © {new Date().getFullYear()} CatatUang. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
