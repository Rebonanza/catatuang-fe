import { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Extend Navigator for iOS standalone check
interface ExtendedNavigator extends Navigator {
  standalone?: boolean;
}

export const InstallAppButton = ({ className }: { className?: string }) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosTip, setShowIosTip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      // Check if app is already installed
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as ExtendedNavigator).standalone;

      setIsStandalone(!!isStandaloneMode);

      if (isStandaloneMode) return;

      // Detect iOS
      const isIosDevice =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
      setIsIos(isIosDevice);

      // If it's iOS and not standalone, show it
      if (isIosDevice) {
        setIsVisible(true);
      }
    };

    checkStatus();

    // Listen for beforeinstallprompt for Android/Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (isIos) {
      setShowIosTip(true);
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  if (isStandalone || !isVisible) return null;

  return (
    <>
      <Button
        onClick={handleInstall}
        variant="outline"
        size="sm"
        className={cn(
          'flex h-8 items-center gap-2 border-primary/20 bg-primary/10 text-[10px] font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/20',
          className,
        )}
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Install App</span>
        <span className="sm:hidden">Install</span>
      </Button>

      {/* iOS Installation Tip */}
      {showIosTip && (
        <div className="fixed inset-0 z-[100] flex animate-in fade-in items-end justify-center bg-black/60 p-4 duration-300 sm:items-center">
          <div className="w-full max-w-sm animate-in slide-in-from-bottom rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl duration-500 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  Install CatatUang
                </h3>
              </div>
              <button
                onClick={() => setShowIosTip(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Install aplikasi ini di iPhone kamu untuk akses lebih cepat:
            </p>

            <ol className="space-y-4 text-sm font-medium text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs dark:bg-slate-800">
                  1
                </span>
                <span>
                  Tap tombol{' '}
                  <strong className="font-bold text-primary">Share</strong> di
                  browser (bawah/atas)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs dark:bg-slate-800">
                  2
                </span>
                <span>
                  Scroll ke bawah dan pilih{' '}
                  <strong className="font-bold text-primary">
                    Add to Home Screen
                  </strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs dark:bg-slate-800">
                  3
                </span>
                <span>
                  Tap <strong className="font-bold text-primary">Add</strong> di
                  pojok kanan atas
                </span>
              </li>
            </ol>

            <Button
              className="mt-8 w-full py-6 font-black uppercase tracking-widest"
              onClick={() => setShowIosTip(false)}
            >
              OKE, SAYA MENGERTI
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
