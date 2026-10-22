'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateGoalSavings,
  formatINR,
  formatPercentage,
  formatYears,
} from '@/lib/calculators';
import { GoalSavingsInputs, RiskAppetite } from '@/types';
import { useBooking } from '@/components/booking/BookingContext';
import {
  Target,
  Calendar,
  Zap,
  TrendingUp,
  Shield,
  Layers,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';

export default function GoalSavingsCalculator() {
  const { openBooking } = useBooking();

  const [inputs, setInputs] = useState<GoalSavingsInputs>({
    targetAmount: 5000000, // 50 Lakhs
    targetDateYears: 10,
    existingSavings: 500000,
    riskAppetite: 'moderate',
    expectedInflation: 6.0,
  });

  const result = useMemo(() => {
    return calculateGoalSavings(inputs);
  }, [inputs]);

  const handleBookWithCalculation = () => {
    openBooking({
      calculatorType: 'goal',
      calculatorTitle: 'Target Goal Savings & Step-Up SIP Roadmap',
      summaryMetrics: [
        { label: 'Inflation-Adjusted Target', value: formatINR(result.inflationAdjustedTarget), highlight: true },
        { label: 'Net Corpus Shortfall', value: formatINR(result.netShortfall) },
        { label: 'Required Flat Monthly SIP', value: formatINR(result.requiredMonthlySip) },
        { label: '10% Step-Up Initial SIP', value: formatINR(result.stepUpInitialMonthlySip) },
      ],
      keyInputs: [
        { label: 'Nominal Goal Target', value: formatINR(inputs.targetAmount) },
        { label: 'Target Horizon', value: `${inputs.targetDateYears} Years` },
        { label: 'Existing Corpus', value: formatINR(inputs.existingSavings) },
        { label: 'Risk Profile', value: inputs.riskAppetite.toUpperCase() },
      ],
      timestamp: new Date().toISOString(),
    });
  };

  const riskOptions: { value: RiskAppetite; label: string; cagr: string; desc: string }[] = [
    { value: 'conservative', label: 'Conservative', cagr: '8.0%', desc: 'Debt & Arbitrage' },
    { value: 'moderate', label: 'Moderate', cagr: '11.5%', desc: 'Flexi-cap Equity' },
    { value: 'aggressive', label: 'Aggressive', cagr: '14.0%', desc: 'Mid/Small-cap Equity' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Target Goal Savings & Step-Up Engine
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Goal Precision
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Determine required monthly step-up SIP to bridge capital shortfalls for milestone life goals.
          </p>
        </div>

        <button
          onClick={handleBookWithCalculation}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-200 text-slate-950 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0 active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          Review Goal Roadmap with Advisor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          {/* Target Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Target Goal Amount (Today's Value)</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {formatINR(inputs.targetAmount)}
              </span>
            </div>
            <input
              type="range"
              min={500000}
              max={30000000}
              step={250000}
              value={inputs.targetAmount}
              onChange={(e) =>
                setInputs({ ...inputs, targetAmount: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>₹5 Lakhs</span>
              <span>₹1.5 Crore</span>
              <span>₹3 Crore</span>
            </div>
          </div>

          {/* Target Horizon */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Target Horizon</span>
              <span className="text-white font-bold font-mono text-sm">
                {formatYears(inputs.targetDateYears)}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={1}
              value={inputs.targetDateYears}
              onChange={(e) =>
                setInputs({ ...inputs, targetDateYears: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Existing Savings */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Existing Earmarked Savings</span>
              <span className="text-amber-400 font-bold font-mono text-sm">
                {formatINR(inputs.existingSavings)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={10000000}
              step={50000}
              value={inputs.existingSavings}
              onChange={(e) =>
                setInputs({ ...inputs, existingSavings: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Risk Appetite Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Risk Appetite & Return Assumption
            </label>
            <div className="grid grid-cols-3 gap-2">
              {riskOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setInputs({ ...inputs, riskAppetite: opt.value })}
                  className={`p-2.5 rounded-xl text-center border transition-all ${
                    inputs.riskAppetite === opt.value
                      ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-0.5">{opt.cagr}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5 truncate">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Target amount is automatically adjusted for inflation at 6.0% p.a., reflecting real
              purchasing power needed at the target milestone.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30">
              <span className="text-[11px] font-medium text-amber-300 uppercase tracking-wider block">
                Inflation Target ({inputs.targetDateYears}y)
              </span>
              <div className="text-lg sm:text-xl font-bold text-white mt-1 font-mono">
                {formatINR(result.inflationAdjustedTarget, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Adjusted for 6% Cost Escalation
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Net Shortfall Gap
              </span>
              <div className="text-lg sm:text-xl font-bold text-amber-400 mt-1 font-mono">
                {formatINR(result.netShortfall, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                After Existing Savings Growth
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
              <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider block">
                Required Monthly SIP
              </span>
              <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1 font-mono">
                {formatINR(result.requiredMonthlySip)}
              </div>
              <div className="text-[10px] text-emerald-500 mt-0.5">
                Or {formatINR(result.stepUpInitialMonthlySip)} with 10% Step-Up
              </div>
            </div>
          </div>

          {/* Recharts Area Chart: Growth vs Target Line */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Bridging the Goal Shortfall Trajectory
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                CAGR: {result.assumedReturnRate}%
              </span>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={result.yearlyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="goalSipGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="existGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
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
                    formatter={(value: any, name: any) => [
                      formatINR(Number(value)),
                      name === 'corpusWithRequiredSip'
                        ? 'Corpus with Recommended SIP'
                        : name === 'corpusWithExistingOnly'
                        ? 'Existing Savings Only'
                        : 'Inflation Target',
                    ]}
                  />
                  <ReferenceLine
                    y={result.inflationAdjustedTarget}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    label={{
                      value: `Target: ${formatINR(result.inflationAdjustedTarget, { compact: true })}`,
                      fill: '#f59e0b',
                      fontSize: 10,
                      position: 'insideTopRight',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="corpusWithRequiredSip"
                    name="With Recommended SIP"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#goalSipGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="corpusWithExistingOnly"
                    name="Existing Savings Only"
                    stroke="#64748b"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#existGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
