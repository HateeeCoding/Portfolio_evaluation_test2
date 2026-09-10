# Design Truth: Impeccable Standards for Portfolio Evaluation

## Visual Identity & Mood
- **Atmosphere:** Calm, premium, trustworthy, and human. A serious modern fintech feel (Stripe / Wealthfront / Mercury for retail equities).
- **Surface Strategy:**
  - Base Canvas: Soft neutral warm `#F8F9FA`
  - Cards: Crisp `#FFFFFF` with 1px border `#E9ECEF` and restrained shadow `0 1px 3px rgba(0, 0, 0, 0.04)`.
  - Zero heavy dark themes, zero neon crypto accents, zero generic purple SaaS gradients.

## Craft Floor Adherence (`craft-floor.md`)
1. **Typography:**
   - Hierarchy: Large numbers where they matter (3xl/4xl bold for top metrics, 2xl for scores).
   - Line measure: 65–75ch for explanations.
   - Distinct weights and contrast: Slate-900 for headings, Slate-700 for body, Slate-400/500 for secondary context.
2. **Color Contrast:**
   - Strict WCAG AA/AAA compliance: all text passes ≥4.5:1.
   - Status indicators: Emerald-500/600 for positive (+₹), Rose-500/600 for draggers (-₹), Amber-500/600 for concentration warnings.
3. **Browser Surfaces:**
   - Styled selection color (`selection:bg-slate-200`).
   - Custom minimal scrollbar on the independent sidebar.
   - Accessible focus rings (`focus-visible:outline-2 focus-visible:outline-sky-600`).
4. **Anti-Pattern Bans:**
   - No kicker or eyebrow labels above headings.
   - No nested cards.
   - No gradient text.
   - No emoji icons (only authored Lucide SVG icons).
   - No modal overuse (content stays in the flow with targeted deep-dive sheets).

## Micro-Visualizations
- **Portfolio Spread:** Horizontal 2-segment bar contrasting Midwest Gold (59.7%) against the remaining 15 holdings.
- **Industry Balance:** Clean 5-segment sector strip highlighting Metals & Mining dominance.
- **Investment Quality:** 3-tier distribution bar (High Quality Moats vs Average vs Speculative).
- **Valuation Safety:** Slider pointer along an Undervalued ➔ Fair ➔ Premium 88x P/E spectrum.
- **Downside Protection:** Defensive bluechip buffer (45%) vs High-Beta smallcap swing (55%).
- **Portfolio Drag:** Gainer vs Dragger ratio indicator (10 profitable vs 6 draggers).
