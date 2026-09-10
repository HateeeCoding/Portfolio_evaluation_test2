import React, { useState } from 'react';
import { PortfolioPillar } from '@/lib/types';
import { Badge, BadgeVariant } from '@/components/ui/Badge';
import {
  ConcentrationBar,
  DownsideRiskGauge,
  QualityDistributionBar,
  ValuationSpectrum,
  SectorDistributionStrip,
  WinnersDraggersBar,
} from '@/components/ui/MicroCharts';
import { ChevronRight, X, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface PillarCardProps {
  pillar: PortfolioPillar;
}

export function PillarCard({ pillar }: PillarCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const getStatusVariant = (status: PortfolioPillar['status']): BadgeVariant => {
    if (status === 'Strong' || status === 'Good') return 'emerald';
    if (status === 'Moderate') return 'slate';
    return 'amber';
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-600';
    if (score >= 50) return 'text-slate-700';
    return 'text-amber-600';
  };

  // Render the appropriate micro-visualization based on pillar ID
  const renderMicroChart = () => {
    switch (pillar.id) {
      case 'spread':
        return <ConcentrationBar topWeight={59.7} topSymbol="MIDWEST" />;
      case 'downside':
        return <DownsideRiskGauge />;
      case 'quality':
        return <QualityDistributionBar />;
      case 'valuation':
        return <ValuationSpectrum />;
      case 'balance':
        return <SectorDistributionStrip />;
      case 'drag':
        return <WinnersDraggersBar gainers={10} losers={6} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
        <div>
          {/* Header: Title, Score & Status */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                {pillar.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xl font-bold ${getScoreColor(pillar.score)}`}>
                  {pillar.score}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </span>
                <Badge variant={getStatusVariant(pillar.status)} size="sm">
                  {pillar.status}
                </Badge>
              </div>
            </div>

            {/* Quick Key Metric Tag */}
            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                {pillar.keyMetricLabel}
              </span>
              <span className="text-xs font-semibold text-slate-700">
                {pillar.keyMetricValue}
              </span>
            </div>
          </div>

          {/* One-Sentence Plain Human Explanation */}
          <p className="text-xs font-medium text-slate-600 leading-relaxed mb-4 min-h-[36px]">
            "{pillar.explanation}"
          </p>

          {/* Micro Infographic / Visualization */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 mb-4">
            {renderMicroChart()}
          </div>
        </div>

        {/* Footer: View Details Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Plain English diagnostic</span>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>View details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-elevated max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <Badge variant={getStatusVariant(pillar.status)}>
                    {pillar.status}
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${getScoreColor(pillar.score)}`}>
                    {pillar.score} / 100
                  </span>
                  <span className="text-xs text-slate-500">
                    ({pillar.keyMetricLabel}: <strong>{pillar.keyMetricValue}</strong>)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-5 space-y-5">
              {/* Beginner Context */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  What this means in plain English
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.details.beginnerContext}
                </p>
              </div>

              {/* Why It Matters */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-brand-600" />
                  Why it matters for your money
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.details.whyItMatters}
                </p>
              </div>

              {/* Actionable Insight */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Suggested Action
                </h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {pillar.details.actionableInsight}
                </p>
              </div>

              {/* Micro Visual in Modal */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                  Current Diagnostic Overview
                </span>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  {renderMicroChart()}
                </div>
              </div>

              {/* Collapsible Advanced Financial Details */}
              {pillar.details.advancedMetrics && pillar.details.advancedMetrics.length > 0 && (
                <div className="border-t border-slate-100 pt-4">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center justify-between w-full text-left py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <span>Advanced Financial Metrics (Optional)</span>
                    {showAdvanced ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {showAdvanced && (
                    <div className="mt-3 space-y-2 bg-slate-50/80 rounded-lg p-3.5 border border-slate-200/60">
                      {pillar.details.advancedMetrics.map((m) => (
                        <div key={m.label} className="flex items-start justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                          <div>
                            <span className="font-medium text-slate-700 block">{m.label}</span>
                            <span className="text-[10px] text-slate-400">{m.hint}</span>
                          </div>
                          <span className="font-semibold text-slate-900 text-right">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
