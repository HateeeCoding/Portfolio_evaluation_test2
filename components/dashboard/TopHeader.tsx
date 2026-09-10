import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';

interface TopHeaderProps {
  lastSynced: string;
  onSyncComplete: (newTimestamp: string) => void;
  onOpenQuestionnaire: () => void;
  onOpenSimulator: () => void;
}

export function TopHeader({
  lastSynced,
  onSyncComplete,
  onOpenQuestionnaire,
  onOpenSimulator,
}: TopHeaderProps) {
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'synced'>('idle');

  const handleSync = () => {
    if (syncState === 'syncing') return;
    setSyncState('syncing');

    setTimeout(() => {
      setSyncState('synced');
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      onSyncComplete(`Today, ${timeStr}`);

      setTimeout(() => {
        setSyncState('idle');
      }, 2500);
    }, 1400);
  };

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title & Sync Info */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Portfolio
            </h1>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="text-xs text-slate-500 font-medium">
              Last synced: <span className="text-slate-700 font-semibold">{lastSynced}</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time health, risk diagnostics, and actionable improvements for your investments
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Simulator button */}
          <button
            onClick={onOpenSimulator}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors shadow-sm"
            title="Preview how rebalancing changes would improve your portfolio"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Simulate Impact</span>
          </button>

          {/* Questionnaire button */}
          <button
            onClick={onOpenQuestionnaire}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>Investor Fit</span>
          </button>

          {/* Sync Broker Button */}
          <button
            onClick={handleSync}
            disabled={syncState === 'syncing'}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 shadow-sm ${
              syncState === 'syncing'
                ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-wait'
                : syncState === 'synced'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
            }`}
          >
            {syncState === 'syncing' && (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-500" />
                <span>Syncing...</span>
              </>
            )}
            {syncState === 'synced' && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Updated successfully</span>
              </>
            )}
            {syncState === 'idle' && (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync Broker</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
