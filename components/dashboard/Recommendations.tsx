import React from 'react';
import { Recommendation } from '@/lib/types';
import { ArrowRight, Sparkles, TrendingDown, Layers, ShieldAlert } from 'lucide-react';

interface RecommendationsProps {
  recommendations: Recommendation[];
  onSelectHolding: (symbol: string) => void;
  onFilterDraggers: () => void;
  onOpenSimulator: () => void;
}

export function Recommendations({
  recommendations,
  onSelectHolding,
  onFilterDraggers,
  onOpenSimulator,
}: RecommendationsProps) {
  const handleAction = (rec: Recommendation) => {
    if (rec.actionType === 'position' && rec.targetSymbol) {
      onSelectHolding(rec.targetSymbol);
    } else if (rec.actionType === 'draggers') {
      onFilterDraggers();
    } else {
      onOpenSimulator();
    }
  };

  const getCardIcon = (id: string) => {
    switch (id) {
      case 'rec-concentration':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'rec-draggers':
        return <TrendingDown className="w-4 h-4 text-rose-600" />;
      default:
        return <Layers className="w-4 h-4 text-brand-600" />;
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Improve Your Portfolio
          </h2>
          <p className="text-xs text-slate-500">
            Intelligent, personalized recommendations to reduce single-point vulnerabilities and optimize capital
          </p>
        </div>

        <button
          onClick={onOpenSimulator}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>See Before vs. After Simulation →</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle flex flex-col justify-between hover:border-slate-300 transition-all duration-200"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  {getCardIcon(rec.id)}
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  {rec.title}
                </h3>
              </div>

              {/* 1. What is happening */}
              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  What is happening
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {rec.whatIsHappening}
                </p>
              </div>

              {/* 2. Why it matters */}
              <div className="mb-3 bg-slate-50/80 rounded-lg p-3 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Why it matters
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rec.whyItMatters}
                </p>
              </div>

              {/* 3. Suggested direction */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Suggested direction
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {rec.suggestedDirection}
                </p>
              </div>

              {/* 4. Potential Impact */}
              <div className="mb-5 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Potential impact
                </span>
                <ul className="space-y-1">
                  {rec.potentialImpact.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-medium text-emerald-700 bg-emerald-50/70 px-2.5 py-1 rounded border border-emerald-100 flex items-center gap-1.5"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleAction(rec)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <span>{rec.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
