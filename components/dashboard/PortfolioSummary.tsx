import React from 'react';
import { PortfolioSummaryData } from '@/lib/types';
import { formatIndianCurrency, formatIndianRupeesFull } from '@/lib/scoringEngine';
import { PerformanceTrendSparkline } from '@/components/ui/MicroCharts';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioSummaryProps {
  summary: PortfolioSummaryData;
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  const isPositive = summary.overallReturnRupees >= 0;

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-subtle">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Three Primary Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 flex-1">
          {/* 1. Portfolio Value */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Portfolio Value
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                {formatIndianCurrency(summary.totalValue)}
              </span>
            </div>
            <span className="text-xs text-slate-400 block mt-1 font-medium">
              {formatIndianRupeesFull(summary.totalValue)}
            </span>
          </div>

          {/* 2. Invested Capital */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Invested Capital
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-700">
                {formatIndianCurrency(summary.investedCapital)}
              </span>
            </div>
            <span className="text-xs text-slate-400 block mt-1 font-medium">
              {formatIndianRupeesFull(summary.investedCapital)} across {summary.holdingsCount} stocks
            </span>
          </div>

          {/* 3. Overall Return */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Overall Return
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                  isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                +{formatIndianCurrency(summary.overallReturnRupees)}
              </span>
              <span
                className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                  isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}
              >
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                +{summary.overallReturnPercent}%
              </span>
            </div>
            <span className="text-xs text-slate-400 block mt-1 font-medium">
              +{formatIndianRupeesFull(summary.overallReturnRupees)} total net profit
            </span>
          </div>
        </div>

        {/* Small Elegant Performance Trendline */}
        <div className="hidden lg:flex items-center border-l border-slate-100 pl-8">
          <PerformanceTrendSparkline />
        </div>
      </div>
    </section>
  );
}
