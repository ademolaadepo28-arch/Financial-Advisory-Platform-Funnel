'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  ExternalLink,
  Award,
  Scale,
  CheckCircle2,
  PieChart as PieIcon,
  HelpCircle,
  Calendar,
} from 'lucide-react';
import { useBooking } from '@/components/booking/BookingContext';
import { RiskQuestion, RiskProfileResult } from '@/types';

export default function DisclosuresPage() {
  const { openBooking } = useBooking();

  // Interactive Risk Profiling State
  const riskQuestions: RiskQuestion[] = [
    {
      id: 1,
      question: 'What is your primary investment planning horizon?',
      options: [
        { label: 'Less than 3 years (Short term capital preservation)', score: 1 },
        { label: '3 to 7 years (Balanced growth & milestone planning)', score: 2 },
        { label: '7+ years (Long term multi-cycle wealth compounding)', score: 3 },
      ],
    },
    {
      id: 2,
      question: 'If the broader stock market crashes by 25% over 3 months, how would you respond?',
      options: [
        { label: 'Panic, liquidate equities to protect remaining capital', score: 1 },
        { label: 'Hold existing allocation and wait for market recovery', score: 2 },
        { label: 'Aggressively buy the dip and increase equity SIP installments', score: 3 },
      ],
    },
    {
      id: 3,
      question: 'What is your current emergency liquidity buffer?',
      options: [
        { label: 'Less than 3 months of mandatory living expenses', score: 1 },
        { label: '3 to 6 months in liquid funds / high-interest bank FDs', score: 2 },
        { label: '6 to 12+ months in safe liquid debt & emergency reserves', score: 3 },
      ],
    },
    {
      id: 4,
      question: 'What is your expectation regarding investment volatility vs returns?',
      options: [
        { label: 'Capital safety is paramount; I prefer modest fixed returns with zero drawdown', score: 1 },
        { label: 'I accept moderate fluctuations for returns beating consumer inflation by 3%–4%', score: 2 },
        { label: 'I seek maximum long-term capital appreciation and can stomach large interim drops', score: 3 },
      ],
    },
  ];

  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 2,
    2: 2,
    3: 2,
    4: 2,
  });

  const calculateProfile = (): RiskProfileResult => {
    const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);

    if (totalScore <= 6) {
      return {
        totalScore,
        category: 'Conservative',
        recommendedAllocation: { equity: 25, debt: 65, gold: 10, cash: 0 },
        narrative:
          'Your profile prioritizes capital stability and drawdown protection. We recommend a core foundation in high-quality sovereign/AAA debt funds, short-duration assets, and sovereign gold bonds with limited large-cap equity exposure.',
      };
    } else if (totalScore <= 9) {
      return {
        totalScore,
        category: 'Moderate',
        recommendedAllocation: { equity: 60, debt: 30, gold: 10, cash: 0 },
        narrative:
          'Your profile balances inflation-beating capital growth with risk containment. A disciplined 60:30:10 multi-asset portfolio with annual rebalancing maximizes compound returns while dampening bear market drawdowns.',
      };
    } else {
      return {
        totalScore,
        category: 'Aggressive',
        recommendedAllocation: { equity: 80, debt: 15, gold: 5, cash: 0 },
        narrative:
          'Your profile is structured for high equity alpha and long-term compounding over 7–10+ year horizons. Recommended allocation leans heavily into Flexi-Cap, Mid-Cap, and Nifty 50 index funds.',
      };
    }
  };

  const riskResult = calculateProfile();

  const handleBookWithRiskProfile = () => {
    openBooking({
      calculatorType: 'general',
      calculatorTitle: `SEBI Risk Profiling Assessment (${riskResult.category})`,
      summaryMetrics: [
        { label: 'Risk Category', value: riskResult.category, highlight: true },
        { label: 'Risk Score', value: `${riskResult.totalScore} / 12` },
        {
          label: 'Target Allocation',
          value: `${riskResult.recommendedAllocation.equity}% Eq / ${riskResult.recommendedAllocation.debt}% Debt`,
        },
      ],
      keyInputs: [
        { label: 'Assessment Mandate', value: 'SEBI (Investment Advisers) Regulations 2013' },
        { label: 'Rebalancing Cycle', value: 'Annual / 5% Deviation Band' },
      ],
      timestamp: new Date().toISOString(),
    });
  };

  const credentialsList = [
    {
      label: 'SEBI Registration Number',
      value: 'INA000018921',
      highlight: true,
      isMono: true,
    },
    {
      label: 'Entity & RIA Legal Name',
      value: 'Aarav Sharma (Proprietorship / Advisory Vault LLP)',
    },
    {
      label: 'Registration Category',
      value: 'Individual Registered Investment Adviser (RIA)',
    },
    {
      label: 'BASL Membership ID',
      value: 'BASL-1402 (Active & Verified)',
      isMono: true,
    },
    {
      label: 'Validity Period',
      value: 'Perpetual (Subject to Periodic Filing)',
      isGreen: true,
    },
    {
      label: 'Registered Office',
      value:
        '14th Floor, Express Towers, Barrister Rajni Patel Marg, Nariman Point, Mumbai 400021, Maharashtra, India',
    },
    {
      label: 'Principal Officer & Compliance Officer',
      value: 'Aarav Sharma, CFA • compliance@arthavault.in • +91 22 6902 4400',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16 overflow-hidden">
      {/* Title Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Statutory Compliance Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          SEBI Disclosures & Risk Profiling
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
          Full regulatory disclosures under SEBI (Investment Advisers) Regulations, 2013, Grievance
          Redressal Escalate Matrices, and our interactive investor risk profiling model.
        </p>
      </div>

      {/* 1. ADVISOR REGISTRATION CREDENTIALS */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400 shrink-0" />
          Advisory Registration Credentials
        </h2>

        {/* Mobile View: Key-Value Cards */}
        <div className="block sm:hidden space-y-2.5">
          {credentialsList.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs"
            >
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {item.label}
              </div>
              <div
                className={`text-xs break-words ${
                  item.highlight
                    ? 'text-emerald-400 font-bold font-mono text-sm'
                    : item.isGreen
                    ? 'text-emerald-400 font-medium'
                    : item.isMono
                    ? 'font-mono text-slate-200'
                    : 'text-white'
                }`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tablet & Desktop View: Clean Table */}
        <div className="hidden sm:block overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs sm:text-sm">
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {credentialsList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 sm:px-6 py-3.5 font-semibold text-slate-400 w-1/3 align-top">
                    {item.label}
                  </td>
                  <td
                    className={`px-5 sm:px-6 py-3.5 break-words ${
                      item.highlight
                        ? 'font-mono text-emerald-400 font-bold'
                        : item.isGreen
                        ? 'text-emerald-400 font-medium'
                        : item.isMono
                        ? 'font-mono text-slate-200'
                        : 'text-white font-medium'
                    }`}
                  >
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. FORMAL SEBI GRIEVANCE REDRESSAL MATRIX */}
      <section id="redressal" className="space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-400 shrink-0" />
          Grievance Redressal Escalate Matrix
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          In case of any grievance or query, investors can resolve complaints in accordance with the
          following 3-tiered resolution pipeline mandated by SEBI:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Level 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block">
                Level 1: Intermediary
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">Direct Advisory Redressal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Email your grievance to{' '}
                <code className="text-emerald-400 break-all">grievance@arthavault.in</code> with client
                reference details.
              </p>
            </div>
            <div className="text-[11px] text-slate-300 font-semibold pt-2 border-t border-slate-800/80">
              Binding Resolution: Max 21 Calendar Days
            </div>
          </div>

          {/* Level 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block">
                Level 2: Regulatory Portal
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">SEBI SCORES 2.0 Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If unresolved within 21 days, file a formal complaint on the SEBI Complaints Redress
                System (SCORES).
              </p>
            </div>
            <a
              href="https://scores.sebi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 font-semibold pt-2 border-t border-slate-800/80 flex items-center gap-1 hover:underline"
            >
              Access SCORES 2.0 <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Level 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block">
                Level 3: Dispute Resolution
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">SMART ODR Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Online Dispute Resolution platform for conciliation and online arbitration as per SEBI
                circular SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131.
              </p>
            </div>
            <a
              href="https://smartodr.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 font-semibold pt-2 border-t border-slate-800/80 flex items-center gap-1 hover:underline"
            >
              Access SMART ODR <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. PARTNER MODEL SAAS & EXECUTION BOUNDARIES */}
      <section className="p-5 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h2 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          Execution Boundaries & Partner Model SaaS Demarcation
        </h2>
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
          <p>
            In strict compliance with SEBI guidelines regarding the segregation of advisory and
            distribution/execution activities:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-400 text-xs sm:text-sm">
            <li>
              <strong className="text-white">Zero Brokerage Integration:</strong> ArthaVault does not
              integrate direct custodial brokerage APIs or execute trades on client behalf without
              explicit client authorization.
            </li>
            <li>
              <strong className="text-white">Zero Client Funds Handling:</strong> No investor funds,
              margin collateral, or pooled subscription wallets are accepted or maintained.
            </li>
            <li>
              <strong className="text-white">Independent Execution Portals:</strong> Clients retain
              100% discretion to execute advised allocations through any registered direct execution
              portal of their choice (e.g., MF Central, AMC Direct, BSE StAR, NSE NMF II).
            </li>
          </ul>
        </div>
      </section>

      {/* 4. INTERACTIVE SEBI RISK PROFILING TEST */}
      <section id="risk-profiler" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-emerald-400 shrink-0" />
              Interactive SEBI Risk Profiling Model
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Suitability assessment required prior to providing personalized investment advice.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs shrink-0 self-start sm:self-auto">
            <span className="text-slate-400">Assessed:</span>
            <strong className="text-emerald-400 font-bold">{riskResult.category}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Questions List */}
          <div className="lg:col-span-7 space-y-4">
            {riskQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5"
              >
                <div className="text-xs sm:text-sm font-semibold text-white leading-snug">
                  {q.id}. {q.question}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt.score}
                      type="button"
                      onClick={() => setAnswers({ ...answers, [q.id]: opt.score })}
                      className={`w-full text-left p-3 rounded-xl text-xs border transition-all flex items-center justify-between gap-3 ${
                        answers[q.id] === opt.score
                          ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 font-medium shadow-sm'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="leading-relaxed">{opt.label}</span>
                      {answers[q.id] === opt.score && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Profiler Output & Recommended Allocation */}
          <div className="lg:col-span-5 space-y-5 bg-slate-900/80 border border-slate-800 p-5 sm:p-6 rounded-2xl lg:sticky lg:top-24 backdrop-blur-md">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Suitability Diagnostic
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1 flex items-center gap-2">
                {riskResult.category} Investor
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Score {riskResult.totalScore}/12
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{riskResult.narrative}</p>
            </div>

            {/* Asset Allocation Bar */}
            <div className="space-y-3 border-t border-slate-800 pt-4">
              <span className="text-xs font-semibold text-slate-300 block">
                Recommended Model Asset Allocation
              </span>

              {/* Stacked Percentage Bar */}
              <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${riskResult.recommendedAllocation.equity}%` }}
                  className="bg-emerald-500 h-full transition-all duration-300"
                  title={`Equity ${riskResult.recommendedAllocation.equity}%`}
                />
                <div
                  style={{ width: `${riskResult.recommendedAllocation.debt}%` }}
                  className="bg-blue-500 h-full transition-all duration-300"
                  title={`Debt ${riskResult.recommendedAllocation.debt}%`}
                />
                <div
                  style={{ width: `${riskResult.recommendedAllocation.gold}%` }}
                  className="bg-amber-500 h-full transition-all duration-300"
                  title={`Gold ${riskResult.recommendedAllocation.gold}%`}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Equity</span>
                  <strong className="text-emerald-400 font-mono">
                    {riskResult.recommendedAllocation.equity}%
                  </strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Debt / Fixed</span>
                  <strong className="text-blue-400 font-mono">
                    {riskResult.recommendedAllocation.debt}%
                  </strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Gold SGB</span>
                  <strong className="text-amber-400 font-mono">
                    {riskResult.recommendedAllocation.gold}%
                  </strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBookWithRiskProfile}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Book Consultation with this Risk Profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
