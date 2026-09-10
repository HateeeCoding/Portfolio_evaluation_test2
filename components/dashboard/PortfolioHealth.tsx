import React from 'react';
import { PortfolioHealthData } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, AlertCircle, TrendingUp } from 'lucide-react';

interface PortfolioHealthProps {
  health: PortfolioHealthData;
  onExploreRecommendations: () => void;
}

export function PortfolioHealth({ health, onExploreRecommendations }: PortfolioHealthProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getBadgeVariant = (status: PortfolioHealthData['status']) => {
    if (status === 'Healthy') return 'emerald';
    if (status === 'Moderate') return 'amber';
    return 'rose';
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-subtle">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Score Badge & Number */}
        <div className="flex items-center gap-5">
          {/* Circular Score Visual with clean stroke */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              {/* Background circle */}
              <path
                className="text-slate-100"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Foreground progress arc */}
              <path
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${health.score}, 100`}
                strokeLinecap="round"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-2xl font-bold tracking-tight ${getScoreColor(health.score)}`}>
                {health.score}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Portfolio Health
              </span>
              <Badge variant={getBadgeVariant(health.status)} size="sm">
                <ShieldCheck className="w-3 h-3" />
                {health.status}
              </Badge>
            </div>
            <p className="text-sm font-medium text-slate-700 max-w-xl leading-relaxed">
              "{health.humanExplanation}"
            </p>
          </div>
        </div>

        {/* Right: Key Contributing Signals & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          <div className="space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Strength:</strong> 74% in top business moats
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Weakness:</strong> 60% in one stock (Midwest Gold)
              </span>
            </div>
          </div>

          <button
            onClick={onExploreRecommendations}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline flex-shrink-0 pt-1 sm:pt-0"
          >
            How to improve score →
          </button>
        </div>
      </div>
    </section>
  );
}
