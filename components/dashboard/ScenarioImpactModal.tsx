import React from 'react';
import { ScenarioComparison } from '@/lib/types';
import { formatIndianCurrency } from '@/lib/scoringEngine';
import { X, ArrowRight, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';

interface ScenarioImpactModalProps {
  scenario: ScenarioComparison;
  isOpen: boolean;
  onClose: () => void;
}

export function ScenarioImpactModal({ scenario, isOpen, onClose }: ScenarioImpactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                Illustrative Simulation
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              Impact of Suggested Rebalancing
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparison between your current portfolio and an illustrative scenario after implementing the recommendations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Disclaimer */}
        <div className="my-5 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-800">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Illustrative scenario:</strong> This simulation demonstrates potential risk reduction and capital efficiency. Market returns and future performance are never guaranteed.
          </span>
        </div>

        {/* Before vs. After Metric Comparisons */}
        <div className="space-y-4">
          {/* Metric 1: Overall Portfolio Health */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Portfolio Health Score
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                +14 points estimated improvement
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Current Portfolio
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-slate-800">
                    {scenario.currentHealth}
                  </span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
                <span className="text-[11px] text-amber-700 font-medium mt-1 block">
                  Concentration drag
                </span>
              </div>

              <div className="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">
                  After Suggested Changes
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-emerald-700">
                    {scenario.potentialHealth}
                  </span>
                  <span className="text-xs text-emerald-600">/ 100</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                  Robust long-term resilience
                </span>
              </div>
            </div>
          </div>

          {/* Metric 2: Top Holding Concentration */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Single Stock Concentration (Midwest Gold)
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                -39.7% risk reduction
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Current
                </span>
                <span className="text-2xl font-bold text-amber-600 block">
                  {scenario.currentConcentration}%
                </span>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div style={{ width: `${scenario.currentConcentration}%` }} className="h-full bg-amber-500 rounded-full" />
                </div>
              </div>

              <div className="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">
                  Suggested Target
                </span>
                <span className="text-2xl font-bold text-emerald-700 block">
                  {scenario.suggestedConcentration}%
                </span>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div style={{ width: `${scenario.suggestedConcentration}%` }} className="h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Metric 3: Sector Concentration */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Top Sector Exposure (Metals & Mining)
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                Reduced cyclical dependence
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Current Exposure
                </span>
                <span className="text-2xl font-bold text-slate-700 block">
                  {scenario.currentSectorConcentration}%
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Metals & Mining
                </span>
              </div>

              <div className="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">
                  Post-Diversification
                </span>
                <span className="text-2xl font-bold text-emerald-700 block">
                  {scenario.suggestedSectorConcentration}%
                </span>
                <span className="text-[11px] text-emerald-700 mt-1 block">
                  Balanced across Tech, FMCG & Banks
                </span>
              </div>
            </div>
          </div>

          {/* Metric 4: Capital Efficiency & Draggers */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Capital Freed from Underperforming Positions
              </span>
              <span className="text-xs font-semibold text-brand-600">
                Tax-Loss Harvesting Potential
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Current Draggers
                </span>
                <span className="text-2xl font-bold text-rose-600 block">
                  {scenario.currentDraggersCount} stocks
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  ~₹2.15L locked in laggards
                </span>
              </div>

              <div className="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">
                  Capital Redeployed
                </span>
                <span className="text-2xl font-bold text-emerald-700 block">
                  {formatIndianCurrency(scenario.freedCapitalEstimate)}
                </span>
                <span className="text-[11px] text-emerald-700 mt-1 block">
                  Reinvested in high-quality compounders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Recommendations can be staged gradually over 2–4 quarters.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors self-end"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
}
