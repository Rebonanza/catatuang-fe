import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getGmailStatus,
  startGmailWatch,
  stopGmailWatch,
  getGoogleAuthUrl,
  syncGmailManual,
  deleteGmailAccount,
} from '../api/gmail.api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail,
  CheckCircle,
  AlertCircle,
  RefreshCcw,
  Power,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const GmailConnectionCard: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['gmailStatus'],
    queryFn: getGmailStatus,
  });

  const startMutation = useMutation({
    mutationFn: startGmailWatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gmailStatus'] });
    },
  });

  const stopMutation = useMutation({
    mutationFn: stopGmailWatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gmailStatus'] });
    },
  });

  const syncMutation = useMutation({
    mutationFn: syncGmailManual,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['gmailStatus'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      if (res.success) {
        alert(res.message);
      }
    },
  });

  const disconnectAccountMutation = useMutation({
    mutationFn: deleteGmailAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gmailStatus'] });
    },
  });

  const handleConnect = () => {
    window.location.href = getGoogleAuthUrl();
  };

  if (isLoading) {
    return (
      <div className="h-48 rounded-lg bg-slate-50 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
    );
  }

  const isConnected = data?.connected;
  const isWatchValid = data?.watchValid;

  return (
    <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-900 flex items-center gap-3">
        <div
          className={cn(
            'p-2 rounded-md',
            isConnected
              ? 'bg-primary/10 text-primary'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-400',
          )}
        >
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            Sync
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Gmail Integration
          </p>
        </div>
      </div>

      <CardContent className="p-6">
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                {isWatchValid ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                )}
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    {isWatchValid ? 'Active' : 'Paused'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-tighter">
                    {data?.lastSyncedAt
                      ? `Last: ${new Date(data.lastSyncedAt).toLocaleString()}`
                      : 'Never Synced'}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                {isWatchValid && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-md text-[10px] font-black uppercase tracking-widest border-primary/20 text-primary hover:bg-primary/5"
                    onClick={() => syncMutation.mutate()}
                    disabled={syncMutation.isPending}
                  >
                    <RefreshCcw
                      className={cn(
                        'w-3 h-3 mr-1.5',
                        syncMutation.isPending && 'animate-spin',
                      )}
                    />
                    Sync Now
                  </Button>
                )}
                {!isWatchValid && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-md text-[10px] font-black uppercase tracking-widest"
                    onClick={() => startMutation.mutate()}
                    disabled={startMutation.isPending}
                  >
                    <RefreshCcw
                      className={cn(
                        'w-3 h-3 mr-1.5',
                        startMutation.isPending && 'animate-spin',
                      )}
                    />
                    Resume
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 rounded-md text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600"
                  onClick={() => stopMutation.mutate()}
                  disabled={stopMutation.isPending}
                >
                  <Power className="w-3 h-3 mr-1.5" />
                  Close
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 rounded-md text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600"
                  onClick={() => {
                    const confirmed = window.confirm(
                      'Are you sure you want to disconnect your Google account?',
                    );
                    if (confirmed) {
                      disconnectAccountMutation.mutate();
                    }
                  }}
                  disabled={disconnectAccountMutation.isPending}
                >
                  <Trash2 className="w-3 h-3 mr-1.5" />
                  Disconnect
                </Button>
              </div>
            </div>
            <p className="text-[10px] font-medium text-slate-500 text-center uppercase tracking-widest italic opacity-80">
              Auto-sync: BCA, GoPay, OVO, ShopeePay
            </p>
          </div>
        ) : (
          <div className="text-center py-2 space-y-4">
            <Button
              className="w-full h-12 bg-primary text-white rounded-md font-black uppercase tracking-widest text-xs shadow-sm shadow-primary/20"
              onClick={handleConnect}
            >
              <Mail className="w-4 h-4 mr-2" />
              Connect Account
            </Button>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest px-4">
              ReadOnly access to transaction notifications only.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
