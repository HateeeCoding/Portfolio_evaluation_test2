import { PortfolioFitResult, Holding, PortfolioSummaryData } from './types';
import { QUESTIONNAIRE_QUESTIONS } from './portfolioData';

export function evaluatePortfolioFit(
  answers: Record<string, string>,
  summary: PortfolioSummaryData,
  holdings: Holding[]
): PortfolioFitResult {
  // Calculate average risk score from answers (1 to 4 scale)
  let totalPoints = 0;
  let answeredCount = 0;

  QUESTIONNAIRE_QUESTIONS.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        totalPoints += option.riskPoints;
        answeredCount++;
      }
    }
  });

  const avgRisk = answeredCount > 0 ? totalPoints / answeredCount : 2.2;
  const isConservative = avgRisk < 2.0;
  const isModerate = avgRisk >= 2.0 && avgRisk <= 2.8;
  const isAggressive = avgRisk > 2.8;

  const topWeight = summary.topHoldingWeight; // ~59.7%
  const reactionAnswer = answers['q3-reaction']; // 'q3-a' (sell) or 'q3-b' (worried)
  const goalAnswer = answers['q1-goal']; // 'q1-a' (protect) or 'q1-d' (milestone)

  let riskTemperament = 'Moderate Long-Term Compounder';
  if (isConservative) riskTemperament = 'Conservative Capital Preserver';
  if (isAggressive) riskTemperament = 'Aggressive Growth Seeker';

  // Portfolio Fit logic
  let fitStatus: PortfolioFitResult['fitStatus'] = 'Moderate fit';
  let fitHeadline = '';
  let fitExplanation = '';
  let keyObservation = '';

  if (isConservative || goalAnswer === 'q1-a' || goalAnswer === 'q1-d' || reactionAnswer === 'q3-a') {
    fitStatus = 'Needs attention';
    fitHeadline = 'Your portfolio is considerably more concentrated than your stated risk tolerance suggests.';
    fitExplanation =
      'While your portfolio is strongly profitable on paper (+147%), nearly 60% of your net worth sits in a single high-beta smallcap (Midwest Gold). Your questionnaire answers indicate you value peace of mind and would be distressed by a steep drawdown.';
    keyObservation =
      'A profitable portfolio can still be the wrong portfolio for your risk profile. Locking in gains to reduce single-stock volatility will align your holdings with your temperament.';
  } else if (isModerate) {
    fitStatus = 'Needs attention';
    fitHeadline = 'Your long-term growth orientation matches, but single-holding exposure exceeds safe limits.';
    fitExplanation =
      'You are comfortable with normal market fluctuations, but your 60% concentration in Midwest Gold and 61% exposure to Metals & Mining creates an extreme idiosyncratic risk that outstrips a moderate investor’s safety comfort.';
    keyObservation =
      'You have high-grade compounders (SBI, ICICI, L&T) that fit your profile perfectly, but the outsized weight of one holding distorts your asset allocation.';
  } else {
    // Aggressive
    if (topWeight > 50) {
      fitStatus = 'Moderate fit';
      fitHeadline = 'Your high risk tolerance handles volatility, but concentration remains extreme.';
      fitExplanation =
        'As an aggressive growth seeker, you embrace market drawdowns for high returns. However, holding nearly 60% in a single mining stock leaves you vulnerable to company-specific risks that don’t generate compensatory expected return.';
      keyObservation =
        'Even aggressive investors benefit from multi-sector diversification across tech, clean energy, and consumer champions.';
    } else {
      fitStatus = 'Good fit';
      fitHeadline = 'Your portfolio’s long-term growth profile broadly matches your stated goal.';
      fitExplanation =
        'Your willingness to stomach volatility in pursuit of multibaggers aligns well with your diversified equity exposure.';
      keyObservation =
        'Your risk appetite matches your portfolio’s underlying holdings and multi-year time horizon.';
    }
  }

  const alignmentPoints = [
    {
      title: 'Time Horizon vs Asset Class',
      aligned: true,
      note: 'Equities match your multi-year investment horizon.',
    },
    {
      title: 'Single-Stock Concentration',
      aligned: !isConservative && topWeight <= 30,
      note: `Top holding weight is ${topWeight}%. Safe limit for your profile is 15%–20%.`,
    },
    {
      title: 'Sector Balance',
      aligned: false,
      note: `${summary.topSectorWeight}% concentration in Metals & Mining exceeds balanced limits.`,
    },
    {
      title: 'Underlying Business Quality',
      aligned: true,
      note: '74% of holdings are fundamentally strong, cash-generative franchises.',
    },
  ];

  return {
    fitStatus,
    fitHeadline,
    fitExplanation,
    riskTemperament,
    keyObservation,
    alignmentPoints,
  };
}
