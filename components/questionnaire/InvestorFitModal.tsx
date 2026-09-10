import React, { useState } from 'react';
import { QUESTIONNAIRE_QUESTIONS } from '@/lib/portfolioData';
import { evaluatePortfolioFit } from '@/lib/questionnaireEngine';
import { PortfolioSummaryData, Holding, PortfolioFitResult } from '@/lib/types';
import { Badge, BadgeVariant } from '@/components/ui/Badge';
import { X, Check, ArrowRight, ArrowLeft, RefreshCw, UserCheck, AlertCircle, ShieldCheck } from 'lucide-react';

interface InvestorFitModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: PortfolioSummaryData;
  holdings: Holding[];
}

export function InvestorFitModal({ isOpen, onClose, summary, holdings }: InvestorFitModalProps) {
  // Default answers reflecting an average moderate Indian retail investor
  const [answers, setAnswers] = useState<Record<string, string>>({
    'q1-goal': 'q1-b',
    'q2-horizon': 'q2-c',
    'q3-reaction': 'q3-b', // 'I’d be worried, but hold on'
    'q4-tolerance': 'q4-b',
    'q5-liquidity': 'q5-c',
    'q6-experience': 'q6-b',
    'q7-involvement': 'q7-b',
    'q8-stability': 'q8-b',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [viewMode, setViewMode] = useState<'questionnaire' | 'results'>('results');

  if (!isOpen) return null;

  const currentQ = QUESTIONNAIRE_QUESTIONS[activeStep];
  const fitResult: PortfolioFitResult = evaluatePortfolioFit(answers, summary, holdings);

  const handleSelectOption = (qId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionId }));
    if (activeStep < QUESTIONNAIRE_QUESTIONS.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      setViewMode('results');
    }
  };

  const getFitBadgeVariant = (status: PortfolioFitResult['fitStatus']): BadgeVariant => {
    if (status === 'Good fit') return 'emerald';
    if (status === 'Moderate fit') return 'amber';
    return 'rose';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-elevated max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <UserCheck className="w-4 h-4 text-brand-600" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                Investor Profile & Alignment
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {viewMode === 'results' ? 'Portfolio Fit Assessment' : 'Investor Profile Questionnaire'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {viewMode === 'results'
                ? 'Evaluating whether your real-world portfolio matches your personal risk tolerance and goals.'
                : '8 quick human scenarios to understand your financial goals without financial jargon.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode: Questionnaire Steps */}
        {viewMode === 'questionnaire' && (
          <div className="py-6 space-y-6">
            {/* Progress indicator */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Question {activeStep + 1} of {QUESTIONNAIRE_QUESTIONS.length}</span>
                <span className="font-semibold text-slate-700">{currentQ.category}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${((activeStep + 1) / QUESTIONNAIRE_QUESTIONS.length) * 100}%` }}
                  className="h-full bg-brand-600 rounded-full transition-all duration-300"
                />
              </div>
            </div>

            {/* Current Question Title */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {currentQ.hint}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 group ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-slate-300 group-hover:border-slate-400'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-snug">
                        {opt.label}
                      </span>
                      <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                        {opt.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => setViewMode('results')}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Skip to Fit Assessment →
              </button>
            </div>
          </div>
        )}

        {/* View Mode: Results & Portfolio Fit */}
        {viewMode === 'results' && (
          <div className="py-6 space-y-5">
            {/* Top Persona Banner */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Your Assessed Investor Persona
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {fitResult.riskTemperament}
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveStep(0);
                  setViewMode('questionnaire');
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 self-start sm:self-auto"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retake 8 Questions</span>
              </button>
            </div>

            {/* Central Portfolio Fit Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Portfolio Fit
                </span>
                <Badge variant={getFitBadgeVariant(fitResult.fitStatus)} size="md">
                  {fitResult.fitStatus === 'Good fit' ? (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{fitResult.fitStatus}</span>
                </Badge>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                "{fitResult.fitHeadline}"
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {fitResult.fitExplanation}
              </p>

              {/* Distinguishing Insight: Profitability != Fit */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-800 leading-relaxed font-medium">
                💡 <strong>Important distinction:</strong> {fitResult.keyObservation}
              </div>
            </div>

            {/* Alignment Breakdown Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Factor-by-Factor Alignment
              </span>

              <div className="space-y-2">
                {fitResult.alignmentPoints.map((pt) => (
                  <div
                    key={pt.title}
                    className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/70 flex items-start gap-3"
                  >
                    <div
                      className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center flex-shrink-0 text-white ${
                        pt.aligned ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    >
                      {pt.aligned ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '!'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {pt.title}
                      </span>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        {pt.note}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveStep(0);
                  setViewMode('questionnaire');
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Change Answers
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
