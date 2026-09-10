import React from 'react';

/**
 * Visualizes Single Stock Concentration (Portfolio Spread)
 */
export function ConcentrationBar({ topWeight = 59.7, topSymbol = 'MIDWEST' }: { topWeight?: number; topSymbol?: string }) {
  const remainder = Math.max(0, 100 - topWeight);

  return (
    <div className="space-y-1.5 w-full">
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200/80 p-0.5">
        <div
          style={{ width: `${topWeight}%` }}
          className="bg-amber-500 rounded-l-full transition-all duration-500 relative group"
          title={`${topSymbol}: ${topWeight}%`}
        />
        <div
          style={{ width: `${remainder}%` }}
          className="bg-slate-300 rounded-r-full transition-all duration-500"
          title={`Remaining 15 holdings: ${remainder.toFixed(1)}%`}
        />
      </div>
      <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1 text-amber-700">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          {topSymbol} ({topWeight}%)
        </span>
        <span className="flex items-center gap-1 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
          15 Other Holdings ({remainder.toFixed(1)}%)
        </span>
      </div>
    </div>
  );
}

/**
 * Visualizes Sector Exposure (Industry Balance)
 */
export function SectorDistributionStrip() {
  const sectors = [
    { name: 'Metals & Mining', pct: 61.4, color: 'bg-amber-500' },
    { name: 'Banking', pct: 10.2, color: 'bg-emerald-500' },
    { name: 'Auto', pct: 6.4, color: 'bg-sky-500' },
    { name: 'Telecom & Tech', pct: 6.4, color: 'bg-indigo-500' },
    { name: 'Others', pct: 15.6, color: 'bg-slate-300' },
  ];

  return (
    <div className="space-y-1.5 w-full">
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200/80 p-0.5">
        {sectors.map((s, idx) => (
          <div
            key={s.name}
            style={{ width: `${s.pct}%` }}
            className={`${s.color} transition-all duration-500 ${idx === 0 ? 'rounded-l-full' : ''} ${
              idx === sectors.length - 1 ? 'rounded-r-full' : ''
            }`}
            title={`${s.name}: ${s.pct}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium gap-x-3 gap-y-1">
        <span className="flex items-center gap-1 text-amber-700">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          Metals (61.4%)
        </span>
        <span className="flex items-center gap-1 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Banking (10.2%)
        </span>
        <span className="flex items-center gap-1 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
          Other Sectors (28.4%)
        </span>
      </div>
    </div>
  );
}

/**
 * Visualizes Fundamental Quality Distribution (Investment Quality)
 */
export function QualityDistributionBar() {
  return (
    <div className="space-y-1.5 w-full">
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200/80 p-0.5">
        <div style={{ width: '74%' }} className="bg-emerald-500 rounded-l-full" title="High Quality: 74%" />
        <div style={{ width: '18%' }} className="bg-sky-400" title="Average Quality: 18%" />
        <div style={{ width: '8%' }} className="bg-rose-400 rounded-r-full" title="Speculative: 8%" />
      </div>
      <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Strong Moats (74%)
        </span>
        <span className="flex items-center gap-1 text-sky-700">
          <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
          Average (18%)
        </span>
        <span className="flex items-center gap-1 text-rose-700">
          <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
          Speculative (8%)
        </span>
      </div>
    </div>
  );
}

/**
 * Visualizes Valuation Spectrum (Valuation Safety)
 */
export function ValuationSpectrum() {
  return (
    <div className="space-y-1.5 w-full">
      <div className="relative pt-2">
        {/* Background track with 3 zones */}
        <div className="h-2.5 w-full rounded-full flex overflow-hidden border border-slate-200/80">
          <div className="w-1/3 bg-emerald-100" title="Undervalued" />
          <div className="w-1/3 bg-slate-200" title="Fair Value" />
          <div className="w-1/3 bg-amber-200" title="Premium / Overvalued" />
        </div>
        {/* Pointer indicator for current weighted PE ~88.4x */}
        <div
          className="absolute top-0 flex flex-col items-center"
          style={{ left: '78%', transform: 'translateX(-50%)' }}
        >
          <div className="w-3.5 h-3.5 bg-amber-600 border-2 border-white rounded-full shadow-sm" />
        </div>
      </div>
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium pt-1">
        <span>Attractively Priced</span>
        <span>Fair Value</span>
        <span className="text-amber-700 font-semibold">Premium (88.4x P/E)</span>
      </div>
    </div>
  );
}

/**
 * Visualizes Winners vs Draggers (Portfolio Drag)
 */
export function WinnersDraggersBar({ gainers = 10, losers = 6 }: { gainers?: number; losers?: number }) {
  const total = gainers + losers;
  const gainersPct = (gainers / total) * 100;
  const losersPct = (losers / total) * 100;

  return (
    <div className="space-y-1.5 w-full">
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200/80 p-0.5">
        <div style={{ width: `${gainersPct}%` }} className="bg-emerald-500 rounded-l-full" title={`Profitable: ${gainers}`} />
        <div style={{ width: `${losersPct}%` }} className="bg-rose-500 rounded-r-full" title={`Draggers: ${losers}`} />
      </div>
      <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          {gainers} Profitable Holdings
        </span>
        <span className="flex items-center gap-1 text-rose-700">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
          {losers} Draggers (-₹93K)
        </span>
      </div>
    </div>
  );
}

/**
 * Visualizes Downside Beta Volatility (Downside Protection)
 */
export function DownsideRiskGauge() {
  return (
    <div className="space-y-1.5 w-full">
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200/80 p-0.5">
        <div style={{ width: '45%' }} className="bg-emerald-500 rounded-l-full" title="Low Volatility Bluechips (45%)" />
        <div style={{ width: '55%' }} className="bg-amber-500 rounded-r-full" title="High Beta & Smallcaps (55%)" />
      </div>
      <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Defensive Bedrock (45%)
        </span>
        <span className="flex items-center gap-1 text-amber-700">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          High-Beta Swing (55%)
        </span>
      </div>
    </div>
  );
}

/**
 * Performance Sparkline - 12-Month Calm Visual Trajectory
 */
export function PerformanceTrendSparkline() {
  // 12 data points representing monthly progression
  const points = [
    { m: 'Mar', val: 15.2 },
    { m: 'Apr', val: 16.1 },
    { m: 'May', val: 17.5 },
    { m: 'Jun', val: 19.2 },
    { m: 'Jul', val: 22.8 },
    { m: 'Aug', val: 25.4 },
    { m: 'Sep', val: 27.1 },
    { m: 'Oct', val: 29.8 },
    { m: 'Nov', val: 32.4 },
    { m: 'Dec', val: 34.2 },
    { m: 'Jan', val: 35.8 },
    { m: 'Feb', val: 37.7 },
  ];

  const min = 14;
  const max = 40;
  const width = 280;
  const height = 48;

  // Compute SVG polyline coordinates
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * (width - 16) + 8;
    const y = height - ((p.val - min) / (max - min)) * (height - 12) - 6;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-end">
      <div className="w-[180px] h-10">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <polyline
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={coords}
          />
        </svg>
      </div>
      <span className="text-[11px] text-slate-400 mt-1 font-medium">12-Month Trajectory</span>
    </div>
  );
}
