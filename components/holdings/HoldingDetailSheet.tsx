import React, { useState } from 'react';
import { Holding } from '@/lib/types';
import { formatIndianCurrency, formatIndianRupeesFull } from '@/lib/scoringEngine';
import { Badge, BadgeVariant } from '@/components/ui/Badge';
import { X, ChevronDown, ChevronUp, ShieldAlert, Award, TrendingUp, AlertCircle } from 'lucide-react';

interface HoldingDetailSheetProps {
  holding: Holding | null;
  onClose: () => void;
}

export function HoldingDetailSheet({ holding, onClose }: HoldingDetailSheetProps) {
  const [showFinancials, setShowFinancials] = useState(false);

  if (!holding) return null;

  const isPositive = holding.gainLossAmount >= 0;

  const getStatusVariant = (status: Holding['status']): BadgeVariant => {
    if (status === 'healthy') return 'emerald';
    if (status === 'warning') return 'amber';
    return 'rose';
  };

  const getQualityVariant = (q: Holding['quality']): BadgeVariant => {
    if (q === 'Exceptional' || q === 'Strong') return 'emerald';
    if (q === 'Average') return 'slate';
    return 'rose';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-elevated max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                {holding.symbol}
              </span>
              <Badge variant={getStatusVariant(holding.status)}>
                {holding.status === 'healthy'
                  ? 'Healthy Compounder'
                  : holding.status === 'warning'
                  ? 'High Risk / Heavy Weight'
                  : 'Performance Dragger'}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {holding.name}
            </h3>
            <span className="text-xs text-slate-400">
              {holding.sector} • {holding.marketCap}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Position Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-100">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              Current Value
            </span>
            <span className="text-sm font-bold text-slate-900">
              {formatIndianCurrency(holding.currentValue)}
            </span>
            <span className="text-[10px] text-slate-400 block">
              {holding.weightPercent}% weight
            </span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              Invested
            </span>
            <span className="text-sm font-bold text-slate-700">
              {formatIndianCurrency(holding.investedAmount)}
            </span>
            <span className="text-[10px] text-slate-400 block">Capital in</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 col-span-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              Current Return
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-sm font-bold ${
                  isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {isPositive ? '+' : ''}
                {formatIndianCurrency(holding.gainLossAmount)}
              </span>
              <span
                className={`text-xs font-semibold ${
                  isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                ({isPositive ? '+' : ''}
                {holding.gainLossPercent.toFixed(1)}%)
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              {formatIndianRupeesFull(holding.gainLossAmount)}
            </span>
          </div>
        </div>

        {/* Plain Human Note */}
        <div className="my-4 bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Portfolio Analyst Verdict
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            "{holding.humanNote}"
          </p>
        </div>

        {/* 5 Understandable Qualitative Pillars */}
        <div className="space-y-2 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Core Analysis
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg border border-slate-100 bg-white flex items-center justify-between">
              <span className="text-slate-500">Investment Quality</span>
              <Badge variant={getQualityVariant(holding.quality)} size="sm">
                {holding.quality}
              </Badge>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-100 bg-white flex items-center justify-between">
              <span className="text-slate-500">Valuation</span>
              <span className="font-semibold text-slate-800">{holding.valuation}</span>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-100 bg-white flex items-center justify-between">
              <span className="text-slate-500">Portfolio Role</span>
              <span className="font-semibold text-slate-800">{holding.contribution}</span>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-100 bg-white flex items-center justify-between">
              <span className="text-slate-500">Risk Contribution</span>
              <span
                className={`font-semibold ${
                  holding.riskContribution === 'Very High' || holding.riskContribution === 'High'
                    ? 'text-rose-600'
                    : 'text-slate-700'
                }`}
              >
                {holding.riskContribution}
              </span>
            </div>
          </div>
        </div>

        {/* Collapsible Advanced Financial Details */}
        <div className="border-t border-slate-100 pt-4 mt-3">
          <button
            onClick={() => setShowFinancials(!showFinancials)}
            className="flex items-center justify-between w-full text-left py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span>Advanced Financial Details (P/E, ROE, Debt, Growth)</span>
            {showFinancials ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showFinancials && (
            <div className="mt-3 grid grid-cols-2 gap-2 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70 text-xs">
              <div className="py-1 border-b border-slate-100">
                <span className="text-slate-500 block text-[11px]">P/E Ratio</span>
                <span className="font-semibold text-slate-800">{holding.financials.peRatio}x</span>
              </div>
              <div className="py-1 border-b border-slate-100">
                <span className="text-slate-500 block text-[11px]">P/B Ratio</span>
                <span className="font-semibold text-slate-800">{holding.financials.pbRatio}x</span>
              </div>
              <div className="py-1 border-b border-slate-100">
                <span className="text-slate-500 block text-[11px]">Return on Equity (ROE)</span>
                <span className="font-semibold text-emerald-700">{holding.financials.roe}%</span>
              </div>
              <div className="py-1 border-b border-slate-100">
                <span className="text-slate-500 block text-[11px]">ROCE</span>
                <span className="font-semibold text-emerald-700">{holding.financials.roce}%</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block text-[11px]">Debt to Equity</span>
                <span className="font-semibold text-slate-800">{holding.financials.debtToEquity}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block text-[11px]">Beta (Volatility)</span>
                <span className="font-semibold text-slate-800">{holding.financials.beta}</span>
              </div>
              <div className="py-1 col-span-2 border-t border-slate-100 pt-2 flex justify-between">
                <div>
                  <span className="text-slate-500 block text-[11px]">3Y Revenue CAGR</span>
                  <span className="font-semibold text-slate-800">+{holding.financials.revenueGrowth}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">3Y Earnings CAGR</span>
                  <span className="font-semibold text-slate-800">+{holding.financials.earningsGrowth}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-5 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
}
