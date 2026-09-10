import React, { useState, useMemo } from 'react';
import { Holding } from '@/lib/types';
import { formatIndianCurrency, formatIndianRupeesFull } from '@/lib/scoringEngine';
import { Search, ArrowUpDown, X, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface HoldingsSidebarProps {
  holdings: Holding[];
  selectedHoldingId: string | null;
  onSelectHolding: (holding: Holding | null) => void;
  filterMode?: 'all' | 'draggers';
  onClearFilter?: () => void;
}

type SortField = 'weight' | 'return' | 'name';

export function HoldingsSidebar({
  holdings,
  selectedHoldingId,
  onSelectHolding,
  filterMode = 'all',
  onClearFilter,
}: HoldingsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('weight');
  const [activeFilter, setActiveFilter] = useState<'all' | 'gainers' | 'draggers'>(
    filterMode === 'draggers' ? 'draggers' : 'all'
  );

  // Sync if parent passes draggers filter
  React.useEffect(() => {
    if (filterMode === 'draggers') {
      setActiveFilter('draggers');
    }
  }, [filterMode]);

  const filteredHoldings = useMemo(() => {
    return holdings
      .filter((h) => {
        const matchesQuery =
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.sector.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesQuery) return false;

        if (activeFilter === 'gainers') return h.gainLossAmount > 0;
        if (activeFilter === 'draggers') return h.gainLossAmount < 0;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'weight') return b.currentValue - a.currentValue;
        if (sortBy === 'return') return b.gainLossPercent - a.gainLossPercent;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [holdings, searchQuery, sortBy, activeFilter]);

  const getStatusDot = (status: Holding['status']) => {
    switch (status) {
      case 'healthy':
        return <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block flex-shrink-0" title="Healthy Compounder" />;
      case 'warning':
        return <span className="w-2 h-2 rounded-full bg-amber-500 inline-block flex-shrink-0" title="High Risk / Concentration" />;
      case 'dragger':
        return <span className="w-2 h-2 rounded-full bg-rose-500 inline-block flex-shrink-0" title="Performance Dragger" />;
    }
  };

  return (
    <aside className="w-full lg:w-80 xl:w-88 flex-shrink-0 bg-white border-r border-slate-200/90 flex flex-col h-auto lg:h-[calc(100vh-65px)] lg:sticky lg:top-[65px]">
      {/* Top Search & Controls */}
      <div className="p-4 border-b border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Holdings ({holdings.length})
            </h2>
            {selectedHoldingId && (
              <button
                onClick={() => onSelectHolding(null)}
                className="text-[11px] text-brand-600 hover:text-brand-700 font-semibold"
              >
                Clear selection
              </button>
            )}
          </div>

          {/* Quick Sort dropdown/toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSortBy(sortBy === 'weight' ? 'return' : sortBy === 'return' ? 'name' : 'weight')}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-[11px] font-medium inline-flex items-center gap-1"
              title={`Sorting by ${sortBy}`}
            >
              <ArrowUpDown className="w-3 h-3" />
              <span className="capitalize">{sortBy}</span>
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search stock or sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs pl-8 pr-7 py-2 rounded-lg border border-slate-200 focus:border-brand-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 pt-0.5">
          <button
            onClick={() => {
              setActiveFilter('all');
              if (onClearFilter) onClearFilter();
            }}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({holdings.length})
          </button>
          <button
            onClick={() => setActiveFilter('gainers')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
              activeFilter === 'gainers'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Winners (10)
          </button>
          <button
            onClick={() => setActiveFilter('draggers')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
              activeFilter === 'draggers'
                ? 'bg-rose-700 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Draggers (6)
          </button>
        </div>
      </div>

      {/* Independently Scrollable Stock List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100/80">
        {filteredHoldings.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No holdings match your search or filter.
          </div>
        ) : (
          filteredHoldings.map((h) => {
            const isSelected = selectedHoldingId === h.id || selectedHoldingId === h.symbol;
            const isPositive = h.gainLossAmount >= 0;

            return (
              <button
                key={h.id}
                onClick={() => onSelectHolding(h)}
                className={`w-full text-left p-3.5 sm:px-4 transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? 'bg-slate-100 border-l-4 border-slate-900 pl-3'
                    : 'hover:bg-slate-50'
                }`}
              >
                {/* Left info: Status dot, Name & Symbol */}
                <div className="flex items-start gap-2.5 min-w-0 pr-2">
                  <div className="pt-1">{getStatusDot(h.status)}</div>
                  <div className="truncate">
                    <div className="flex items-baseline gap-1.5 truncate">
                      <span className="text-xs font-semibold text-slate-900 group-hover:text-brand-700 truncate">
                        {h.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-mono font-medium">{h.symbol}</span>
                      <span>•</span>
                      <span className="truncate">{h.sector}</span>
                    </div>
                  </div>
                </div>

                {/* Right info: Value, Weight % & Gain/Loss */}
                <div className="text-right flex-shrink-0">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-xs font-bold text-slate-900">
                      {formatIndianCurrency(h.currentValue)}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {h.weightPercent}%
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold block mt-0.5 ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {formatIndianCurrency(h.gainLossAmount)} ({isPositive ? '+' : ''}
                    {h.gainLossPercent.toFixed(0)}%)
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Sidebar Footer info */}
      <div className="p-3 bg-slate-50/90 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Click any holding for plain-English analysis</span>
      </div>
    </aside>
  );
}
