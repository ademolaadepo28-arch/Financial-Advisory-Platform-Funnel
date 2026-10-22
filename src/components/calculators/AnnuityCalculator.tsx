'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateAnnuityCashflow,
  formatINR,
  formatPercentage,
  formatYears,
} from '@/lib/calculators';
import { AnnuityInputs, PayoutFrequency } from '@/types';
import { useBooking } from '@/components/booking/BookingContext';
import {
  Coins,
  Calendar,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function AnnuityCalculator() {
  const { openBooking } = useBooking();

  const [inputs, setInputs] = useState<AnnuityInputs>({
    initialCapitalCorpus: 10000000, // 1 Crore
    payoutFrequency: 'monthly',
    assumedAnnualYield: 8.0,
    payoutDurationYears: 15,
    targetEndingCorpus: 0,
  });

  const [chartMode, setChartMode] = useState<'schedule' | 'decay'>('schedule');

  const result = useMemo(() => {
    return calculateAnnuityCashflow(inputs);
  }, [inputs]);

  const handleBookWithCalculation = () => {
    openBooking({
      calculatorType: 'annuity',
      calculatorTitle: 'Annuity & SWP Capital Preservation Plan',
      summaryMetrics: [
        {
          label: `${inputs.payoutFrequency.toUpperCase()} Payout`,
          value: formatINR(result.periodicPayout),
          highlight: true,
        },
        { label: 'Total Payout Received', value: formatINR(result.totalPayoutOverDuration) },
        { label: 'Total Interest Earned', value: formatINR(result.totalInterestEarned) },
      ],
      keyInputs: [
        { label: 'Initial Corpus', value: formatINR(inputs.initialCapitalCorpus) },
        { label: 'Yield Assumption', value: `${inputs.assumedAnnualYield}% p.a.` },
        { label: 'Duration', value: `${inputs.payoutDurationYears} Years` },
        { label: 'Payout Frequency', value: inputs.payoutFrequency },
      ],
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Annuity & Cashflow Engine
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
              SWP Modeling
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Systematic withdrawal plan (SWP) modeling. Track interest vs principal decay over time.
          </p>
        </div>

        <button
          onClick={handleBookWithCalculation}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-200 text-slate-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0 active:scale-95"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Review Cashflow Strategy with Advisor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          {/* Initial Capital */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Initial Capital Corpus</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {formatINR(inputs.initialCapitalCorpus)}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={500000}
              value={inputs.initialCapitalCorpus}
              onChange={(e) =>
                setInputs({ ...inputs, initialCapitalCorpus: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>₹10 Lakhs</span>
              <span>₹2.5 Crore</span>
              <span>₹5 Crore</span>
            </div>
          </div>

          {/* Payout Frequency Tabs */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Payout Frequency</label>
            <div className="grid grid-cols-3 gap-2">
              {(['monthly', 'quarterly', 'annual'] as PayoutFrequency[]).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setInputs({ ...inputs, payoutFrequency: freq })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    inputs.payoutFrequency === freq
                      ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Assumed Annual Yield */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Assumed Annual Yield (%)</span>
              <span className="text-white font-bold font-mono text-sm">
                {formatPercentage(inputs.assumedAnnualYield, 1)}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={14}
              step={0.5}
              value={inputs.assumedAnnualYield}
              onChange={(e) =>
                setInputs({ ...inputs, assumedAnnualYield: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>5% (Debt)</span>
              <span>8% (Conservative Hybrid)</span>
              <span>14% (Equity SWP)</span>
            </div>
          </div>

          {/* Payout Duration */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Payout Duration</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {formatYears(inputs.payoutDurationYears)}
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={30}
              step={1}
              value={inputs.payoutDurationYears}
              onChange={(e) =>
                setInputs({ ...inputs, payoutDurationYears: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              In an SWP model, yield earned directly subsidizes the cashflow withdrawal, significantly
              slowing down principal decay compared to simple cash withdrawals.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
              <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider block">
                {inputs.payoutFrequency} Cashflow
              </span>
              <div className="text-lg sm:text-xl font-bold text-white mt-1 font-mono">
                {formatINR(result.periodicPayout)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Annualized: {formatINR(result.annualizedPayout, { compact: true })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Total Payout Received
              </span>
              <div className="text-lg sm:text-xl font-bold text-slate-200 mt-1 font-mono">
                {formatINR(result.totalPayoutOverDuration, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Over {inputs.payoutDurationYears} Years
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Total Interest Earned
              </span>
              <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1 font-mono">
                {formatINR(result.totalInterestEarned, { compact: true })}
              </div>
              <div className="text-[10px] text-emerald-500 mt-0.5">
                Yield Subsidized Cashflow
              </div>
            </div>
          </div>

          {/* Visual Recharts Container */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Cashflow Schedule & Capital Decay
                </span>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setChartMode('schedule')}
                  className={`px-3 py-1 rounded-md transition-all font-medium ${
                    chartMode === 'schedule'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Schedule Bar
                </button>
                <button
                  type="button"
                  onClick={() => setChartMode('decay')}
                  className={`px-3 py-1 rounded-md transition-all font-medium ${
                    chartMode === 'decay'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Capital Decay Area
                </button>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {chartMode === 'schedule' ? (
                  <BarChart
                    data={result.capitalDecaySchedule.slice(0, 20)}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="periodLabel" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fontSize: 10 }}
                      tickFormatter={(v) => formatINR(v, { compact: true })}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        fontSize: '12px',
                      }}
                      formatter={(v: unknown, name: unknown) => [
                        formatINR(Number(v)),
                        String(name) === 'interestEarned' ? 'Interest Earned' : 'Principal Decay',
                      ]}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar
                      dataKey="interestEarned"
                      name="Interest Earned"
                      stackId="a"
                      fill="#10b981"
                      radius={[0, 0, 3, 3]}
                    />
                    <Bar
                      dataKey="principalDecay"
                      name="Principal Decay"
                      stackId="a"
                      fill="#f59e0b"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <AreaChart
                    data={result.capitalDecaySchedule}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="decayGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="year"
                      stroke="#64748b"
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) => `Yr ${v}`}
                    />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) => formatINR(v, { compact: true })}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        fontSize: '12px',
                      }}
                      formatter={(v: unknown) => [formatINR(Number(v)), 'Remaining Balance']}
                    />
                    <Area
                      type="monotone"
                      dataKey="endingBalance"
                      name="Capital Balance"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#decayGrad)"
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
