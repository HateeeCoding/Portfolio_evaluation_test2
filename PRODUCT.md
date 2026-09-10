# Product Truth: Retail Portfolio Evaluation Dashboard

## Overview
A human-centered portfolio analysis dashboard built for retail stock investors. The product translates sophisticated multi-factor financial engineering (concentration indices, beta, capital efficiency, quality scoring) into calm, clear, and actionable insights that any novice can understand in under 10 seconds.

## Target Audience
Indian retail stock investors with ₹15L–₹35L invested capital who want to understand their portfolio health without needing to read financial jargon, dense terminal screens, or confusing charts.

## Core Questions Answered
1. **What is the current state of my portfolio?** (Portfolio Value: ₹37.7L, Invested: ₹15.2L, Overall Return: +₹22.5L / +147.6%)
2. **How healthy is my portfolio?** (Portfolio Health: 72 / 100 · Healthy)
3. **What are the biggest strengths and weaknesses?** (Strength: 74% in wide-moat compounders; Weakness: 60% concentrated in one stock)
4. **What is currently holding the portfolio back?** (6 of 16 holdings are draggers tying up ₹2.15L in unproductive capital)
5. **What changes could improve it?** (Pruning concentration to ~20%, harvesting draggers, diversifying across under-represented sectors)
6. **How would those changes potentially improve it?** (Simulated improvement to 86/100 health, lowering concentration risk by 66%)

## Primary Surfaces & Features
- **Left Holdings Sidebar:** Persistent vertical scrollable list of all 16 stocks with search, filtering (Winners vs Draggers), and detail triggering.
- **Top Header:** Portfolio branding, live last-synced timestamp, and an interactive `[ Sync Broker ]` state machine.
- **Portfolio Summary:** Three prominent metrics and a 12-month calm performance trajectory line.
- **Portfolio Health:** 72/100 score circle, status pill, and one-sentence human explanation.
- **Six Analysis Pillars:**
  1. Portfolio Spread
  2. Downside Protection
  3. Investment Quality
  4. Valuation Safety
  5. Industry Balance
  6. Portfolio Drag
- **Actionable Recommendations:** 4-part breakdown (What is happening, Why it matters, Suggested direction, Potential impact).
- **Before vs After Simulator:** Concrete comparison modal contrasting current vs suggested rebalancing.
- **Holding Detail Sheet:** Accessible overview with collapsible advanced financial ratios.
- **Investor Profile Questionnaire:** 8 human scenario questions evaluating "Portfolio Fit".
