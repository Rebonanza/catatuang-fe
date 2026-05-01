import { Link } from 'react-router-dom';
import { RouteConstant } from '@/constants/routes.constant';
import { useState, useRef, useEffect } from 'react';
import {
  Mail,
  ShieldCheck,
  BarChart3,
  Sparkles,
  ArrowRight,
  Tag,
  TrendingUp,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  LANGUAGE_OPTIONS,
  DEFAULT_LANGUAGE,
} from '@/constants/language.constant';
import type { Language } from '@/constants/language.constant';
import { getTranslation } from '@/locales';

const FEATURE_STYLES = [
  {
    icon: Mail,
    iconBg: 'bg-blue-500/10 text-blue-500',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: BarChart3,
    iconBg: 'bg-emerald-500/10 text-emerald-500',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Tag,
    iconBg: 'bg-violet-500/10 text-violet-500',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-amber-500/10 text-amber-500',
    gradient: 'from-amber-500 to-orange-400',
  },
] as const;

const LanguageDropdown = ({
  value,
  onChange,
}: {
  value: Language;
  onChange: (lang: Language) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = LANGUAGE_OPTIONS.find((opt) => opt.code === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{selected?.flag}</span>
        <span className="hidden sm:inline">{selected?.label}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => {
                onChange(opt.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                opt.code === value
                  ? 'text-primary bg-primary/5 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-base">{opt.flag}</span>
              <span className="flex-1 text-left">{opt.label}</span>
              {opt.code === value && <Check className="w-4 h-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const LandingPage = () => {
  const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE);
  const t = getTranslation(lang);

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
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageDropdown value={lang} onChange={setLang} />
            <Link to={RouteConstant.LOGIN}>
              <Button
                variant="ghost"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {t.nav.login}
              </Button>
            </Link>
            <Link to={RouteConstant.REGISTER}>
              <Button className="h-9 px-5 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-lg shadow-md shadow-primary/20">
                {t.nav.getStarted}
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
                {t.hero.badge}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {t.hero.titlePre}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={RouteConstant.REGISTER}>
                <Button className="h-12 px-8 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-primary/25 group">
                  {t.hero.ctaPrimary}{' '}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to={RouteConstant.LOGIN}>
                <Button
                  variant="outline"
                  className="h-12 px-8 border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-xs rounded-xl"
                >
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>
            <div className="mt-14 flex items-center justify-center gap-6 text-slate-400 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t.badges.first}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t.badges.second}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t.badges.third}
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
              {t.features.label}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.features.title}
            </h2>
            <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">
              {t.features.subtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.features.items.map((feature, index) => {
              const style = FEATURE_STYLES[index];
              if (!style) return null;
              const IconComponent = style.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center mb-5`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                  <div
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${style.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-3">
              {t.steps.label}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.steps.title}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {t.steps.items.map((step, i) => (
              <div key={i} className="relative text-center group">
                {i < t.steps.items.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-gradient-to-r from-primary/30 to-primary/10" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-105 transition-transform">
                  <span className="text-lg font-black text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {step.description}
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
            {t.cta.title}
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              {t.cta.titleHighlight}
            </span>
          </h2>
          <p className="mt-5 text-slate-400 text-base max-w-md mx-auto">
            {t.cta.subtitle}
          </p>
          <Link to={RouteConstant.REGISTER}>
            <Button className="mt-10 h-12 px-10 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-primary/30 group">
              {t.cta.button}{' '}
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
                {t.footer.privacy}
              </Link>
              <Link
                to={RouteConstant.TERMS_OF_SERVICE}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t.footer.terms}
              </Link>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
