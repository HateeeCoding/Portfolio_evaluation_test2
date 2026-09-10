'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_HOLDINGS, MOCK_PILLARS, MOCK_RECOMMENDATIONS, MOCK_SCENARIO } from '@/lib/portfolioData';
import { calculatePortfolioSummary, calculatePortfolioHealth } from '@/lib/scoringEngine';
import { Holding } from '@/lib/types';
import { TopHeader } from '@/components/dashboard/TopHeader';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { PortfolioHealth } from '@/components/dashboard/PortfolioHealth';
import { SixPillarsGrid } from '@/components/dashboard/SixPillarsGrid';
import { Recommendations } from '@/components/dashboard/Recommendations';
import { HoldingsSidebar } from '@/components/holdings/HoldingsSidebar';
import { HoldingDetailSheet } from '@/components/holdings/HoldingDetailSheet';
import { ScenarioImpactModal } from '@/components/dashboard/ScenarioImpactModal';
import { InvestorFitModal } from '@/components/questionnaire/InvestorFitModal';

export default function PortfolioDashboardPage() {
  const [holdings, setHoldings] = useState<Holding[]>(MOCK_HOLDINGS);
  const [lastSynced, setLastSynced] = useState<string>('Today, 10:42 AM');
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'draggers'>('all');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState<boolean>(false);

  // Compute live portfolio metrics
  const summary = useMemo(() => {
    return calculatePortfolioSummary(holdings, lastSynced);
  }, [holdings, lastSynced]);

  const health = useMemo(() => {
    return calculatePortfolioHealth(MOCK_PILLARS);
  }, []);

  const handleSyncComplete = (newTimestamp: string) => {
    setLastSynced(newTimestamp);
  };

  const handleSelectHoldingBySymbol = (symbol: string) => {
    const target = holdings.find((h) => h.symbol.toLowerCase() === symbol.toLowerCase());
    if (target) {
      setSelectedHolding(target);
    }
  };

  const handleFilterDraggers = () => {
    setFilterMode('draggers');
    // Scroll smoothly to sidebar if on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900">
      {/* Top Header */}
      <TopHeader
        lastSynced={lastSynced}
        onSyncComplete={handleSyncComplete}
        onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Main Container: Left Holdings Sidebar + Right Dashboard */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        {/* Left Holdings Sidebar (Persistent and independently scrollable) */}
        <HoldingsSidebar
          holdings={holdings}
          selectedHoldingId={selectedHolding?.id || null}
          onSelectHolding={(h) => setSelectedHolding(h)}
          filterMode={filterMode}
          onClearFilter={() => setFilterMode('all')}
        />

        {/* Main Dashboard Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-7 min-w-0 overflow-x-hidden">
          {/* 1. Portfolio Summary (Primary Value, Invested, Return metrics + Trendline) */}
          <PortfolioSummary summary={summary} />

          {/* 2. Central Portfolio Health Section */}
          <PortfolioHealth
            health={health}
            onExploreRecommendations={() => {
              const recSection = document.getElementById('recommendations-section');
              if (recSection) {
                recSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />

          {/* 3. Six Portfolio Pillars */}
          <SixPillarsGrid pillars={MOCK_PILLARS} />

          {/* 4. Recommendations / Improve Your Portfolio */}
          <div id="recommendations-section">
            <Recommendations
              recommendations={MOCK_RECOMMENDATIONS}
              onSelectHolding={handleSelectHoldingBySymbol}
              onFilterDraggers={handleFilterDraggers}
              onOpenSimulator={() => setIsSimulatorOpen(true)}
            />
          </div>

          {/* Footer note adhering to Impeccable standards */}
          <footer className="pt-6 pb-4 border-t border-slate-200/80 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-medium">
            <span>
              Designed for retail clarity. All metrics computed on consolidated trade book data.
            </span>
            <span>
              Mock Data Mode • Ready for Production API Hookup
            </span>
          </footer>
        </main>
      </div>

      {/* Holding Detail Sheet (Opens when holding clicked in sidebar or recommendation) */}
      <HoldingDetailSheet
        holding={selectedHolding}
        onClose={() => setSelectedHolding(null)}
      />

      {/* Before vs After Rebalancing Scenario Impact Modal */}
      <ScenarioImpactModal
        scenario={MOCK_SCENARIO}
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />

      {/* Separate Investor Profile & Portfolio Fit Questionnaire */}
      <InvestorFitModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        summary={summary}
        holdings={holdings}
      />
    </div>
  );
}
