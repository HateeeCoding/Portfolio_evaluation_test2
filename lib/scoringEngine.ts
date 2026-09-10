import { Holding, PortfolioSummaryData, PortfolioHealthData, PortfolioPillar, ScenarioComparison } from './types';

export function calculatePortfolioSummary(holdings: Holding[], lastSynced = 'Today, 10:42 AM'): PortfolioSummaryData {
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const investedCapital = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  const overallReturnRupees = totalValue - investedCapital;
  const overallReturnPercent = investedCapital > 0 ? (overallReturnRupees / investedCapital) * 100 : 0;

  const sortedHoldings = [...holdings].sort((a, b) => b.currentValue - a.currentValue);
  const topHolding = sortedHoldings[0] || { symbol: 'N/A', weightPercent: 0 };
  const topHoldingWeight = totalValue > 0 ? (topHolding.currentValue / totalValue) * 100 : 0;

  // Sector breakdown
  const sectorWeights: Record<string, number> = {};
  holdings.forEach((h) => {
    sectorWeights[h.sector] = (sectorWeights[h.sector] || 0) + h.currentValue;
  });

  let topSectorName = 'None';
  let topSectorValue = 0;
  Object.entries(sectorWeights).forEach(([sector, val]) => {
    if (val > topSectorValue) {
      topSectorValue = val;
      topSectorName = sector;
    }
  });
  const topSectorWeight = totalValue > 0 ? (topSectorValue / totalValue) * 100 : 0;

  const profitableCount = holdings.filter((h) => h.gainLossAmount > 0).length;
  const draggersCount = holdings.filter((h) => h.gainLossAmount < 0).length;

  return {
    totalValue: Math.round(totalValue),
    investedCapital: Math.round(investedCapital),
    overallReturnRupees: Math.round(overallReturnRupees),
    overallReturnPercent: Number(overallReturnPercent.toFixed(1)),
    lastSynced,
    holdingsCount: holdings.length,
    profitableCount,
    draggersCount,
    topHoldingSymbol: topHolding.symbol,
    topHoldingWeight: Number(topHoldingWeight.toFixed(1)),
    topSectorName,
    topSectorWeight: Number(topSectorWeight.toFixed(1)),
  };
}

export function calculatePortfolioHealth(pillars: PortfolioPillar[]): PortfolioHealthData {
  // Weighted calculation across 6 pillars
  const weights: Record<PortfolioPillar['id'], number> = {
    spread: 0.25,      // Concentration is paramount for retail risk
    quality: 0.20,     // Business fundamental quality
    downside: 0.18,    // Drawdown protection
    balance: 0.15,     // Sector diversification
    valuation: 0.12,   // Overpayment risk
    drag: 0.10,        // Capital efficiency
  };

  let totalScore = 0;
  pillars.forEach((p) => {
    totalScore += p.score * (weights[p.id] || 0.16);
  });

  const finalScore = Math.round(totalScore);

  let status: PortfolioHealthData['status'] = 'Healthy';
  let humanExplanation = '';

  if (finalScore >= 70) {
    status = 'Healthy';
    humanExplanation =
      'Your portfolio has strong long-term potential, but a few holdings account for a large share of your overall risk.';
  } else if (finalScore >= 50) {
    status = 'Moderate';
    humanExplanation =
      'Your portfolio has decent quality foundations, but heavy concentration and drag are blunting your overall potential.';
  } else {
    status = 'Needs attention';
    humanExplanation =
      'Significant concentration, high volatility, and multiple draggers create elevated downside vulnerability.';
  }

  return {
    score: finalScore,
    status,
    humanExplanation,
  };
}

export function formatIndianCurrency(amount: number): string {
  const absVal = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (absVal >= 10000000) {
    return `${sign}₹${(absVal / 10000000).toFixed(2)} Cr`;
  }
  if (absVal >= 100000) {
    return `${sign}₹${(absVal / 100000).toFixed(1)}L`;
  }
  if (absVal >= 1000) {
    return `${sign}₹${(absVal / 1000).toFixed(0)}K`;
  }
  return `${sign}₹${absVal.toLocaleString('en-IN')}`;
}

export function formatIndianRupeesFull(amount: number): string {
  const sign = amount < 0 ? '-' : amount > 0 ? '+' : '';
  const abs = Math.abs(Math.round(amount));
  return `${sign}₹${abs.toLocaleString('en-IN')}`;
}
