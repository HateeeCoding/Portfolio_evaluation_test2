import React from 'react';
import { PortfolioPillar } from '@/lib/types';
import { PillarCard } from './PillarCard';

interface SixPillarsGridProps {
  pillars: PortfolioPillar[];
}

export function SixPillarsGrid({ pillars }: SixPillarsGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Portfolio Pillars
          </h2>
          <p className="text-xs text-slate-500">
            Six comprehensive dimensions evaluating diversification, business quality, and capital risks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </section>
  );
}
