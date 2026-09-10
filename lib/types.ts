export type MarketCap = 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Micro Cap';

export type QualityRating = 'Exceptional' | 'Strong' | 'Average' | 'Speculative';
export type ValuationRating = 'Undervalued' | 'Fair Value' | 'Premium' | 'Overvalued';
export type ContributionType = 'Primary Driver' | 'Steady Compounder' | 'Neutral' | 'Performance Dragger';
export type RiskLevel = 'Very High' | 'High' | 'Moderate' | 'Low';
export type HoldingStatus = 'healthy' | 'warning' | 'dragger';

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  marketCap: MarketCap;
  investedAmount: number;
  currentValue: number;
  weightPercent: number;
  gainLossAmount: number;
  gainLossPercent: number;
  status: HoldingStatus;
  
  // Qualitative human-first assessment
  quality: QualityRating;
  valuation: ValuationRating;
  contribution: ContributionType;
  riskContribution: RiskLevel;
  humanNote: string;

  // Collapsible advanced financial details
  financials: {
    peRatio: number;
    pbRatio: number;
    roe: number; // in %
    roce: number; // in %
    debtToEquity: number;
    revenueGrowth: number; // 3Y CAGR in %
    earningsGrowth: number; // 3Y CAGR in %
    beta: number;
  };
}

export interface PortfolioSummaryData {
  totalValue: number;
  investedCapital: number;
  overallReturnRupees: number;
  overallReturnPercent: number;
  lastSynced: string;
  holdingsCount: number;
  profitableCount: number;
  draggersCount: number;
  topHoldingSymbol: string;
  topHoldingWeight: number;
  topSectorName: string;
  topSectorWeight: number;
}

export interface PortfolioHealthData {
  score: number; // 0-100
  status: 'Healthy' | 'Moderate' | 'Needs attention' | 'Critical';
  humanExplanation: string;
}

export type PillarStatus = 'Strong' | 'Good' | 'Moderate' | 'Needs attention';

export interface PortfolioPillar {
  id: 'spread' | 'downside' | 'quality' | 'valuation' | 'balance' | 'drag';
  title: 'Portfolio Spread' | 'Downside Protection' | 'Investment Quality' | 'Valuation Safety' | 'Industry Balance' | 'Portfolio Drag';
  score: number; // 0-100
  status: PillarStatus;
  explanation: string;
  keyMetricLabel: string;
  keyMetricValue: string;
  details: {
    beginnerContext: string;
    whyItMatters: string;
    actionableInsight: string;
    advancedMetrics?: { label: string; value: string; hint: string }[];
  };
}

export interface Recommendation {
  id: string;
  title: string;
  whatIsHappening: string;
  whyItMatters: string;
  suggestedDirection: string;
  potentialImpact: string[];
  actionLabel: string;
  actionType: 'position' | 'draggers' | 'diversify';
  targetSymbol?: string;
}

export interface ScenarioComparison {
  title: string;
  currentHealth: number;
  potentialHealth: number;
  currentConcentration: number;
  suggestedConcentration: number;
  currentSectorConcentration: number;
  suggestedSectorConcentration: number;
  currentDraggersCount: number;
  suggestedDraggersCount: number;
  freedCapitalEstimate: number;
}

export interface QuestionnaireAnswer {
  questionId: string;
  selectedOptionId: string;
  scoreWeight: number;
}

export interface PortfolioFitResult {
  fitStatus: 'Good fit' | 'Moderate fit' | 'Needs attention';
  fitHeadline: string;
  fitExplanation: string;
  riskTemperament: string;
  keyObservation: string;
  alignmentPoints: {
    title: string;
    aligned: boolean;
    note: string;
  }[];
}
