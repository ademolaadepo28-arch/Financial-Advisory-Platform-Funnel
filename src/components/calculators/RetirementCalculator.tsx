'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateRetirementCorpus,
  formatINR,
  formatPercentage,
} from '@/lib/calculators';
import { RetirementInputs } from '@/types';
import { useBooking } from '@/components/booking/BookingContext';
import {
  ShieldAlert,
  Flame,
  Calendar,
  Hourglass,
  TrendingDown,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';

export default function RetirementCalculator() {
  const { openBooking } = useBooking();

  const [inputs, setInputs] = useState<RetirementInputs>({
    currentAge: 32,
    retirementAge: 60,
    lifeExpectancyAge: 85,
    monthlyExpense: 60000,
    expectedInflation: 6.5,
    postRetirementReturn: 8.5,
    preRetirementReturn: 12.0,
    existingRetirementSavings: 500000,
  });

  const result = useMemo(() => {
    return calculateRetirementCorpus(inputs);
  }, [inputs]);

  const handleBookWithCalculation = () => {
    openBooking({
      calculatorType: 'retirement',
      calculatorTitle: 'Retirement Corpus & Post-Retirement Decumulation Dossier',
      summaryMetrics: [
        { label: 'Target Retirement Corpus', value: formatINR(result.requiredCorpus), highlight: true },
        { label: 'Monthly Expense @ Ret', value: formatINR(result.monthlyExpenseAtRetirement) },
        { label: 'Required Monthly SIP', value: formatINR(result.requiredMonthlySip) },
        { label: 'Exhaustion Age', value: `Age ${result.exhaustionAge}` },
      ],
      keyInputs: [
        { label: 'Current / Ret Age', value: `${inputs.currentAge} / ${inputs.retirementAge} Yrs` },
        { label: 'Current Monthly Expense', value: formatINR(inputs.monthlyExpense) },
        { label: 'Assumed Inflation', value: `${inputs.expectedInflation}% p.a.` },
        { label: 'Post-Retirement Return', value: `${inputs.postRetirementReturn}% p.a.` },
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
            Retirement Corpus & Decumulation Trajectory
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
              Longevity Protection
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compute inflation-adjusted living expenses and model corpus depletion across retirement years.
          </p>
        </div>

        <button
          onClick={handleBookWithCalculation}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-200 text-slate-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0 active:scale-95"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Review Retirement Dossier with Advisor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          {/* Ages Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Current Age</span>
                <span className="text-white font-mono font-bold">{inputs.currentAge} Yrs</span>
              </div>
              <input
                type="range"
                min={20}
                max={60}
                value={inputs.currentAge}
                onChange={(e) =>
                  setInputs({ ...inputs, currentAge: Math.min(Number(e.target.value), inputs.retirementAge - 1) })
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Retirement Age</span>
                <span className="text-emerald-400 font-mono font-bold">{inputs.retirementAge} Yrs</span>
              </div>
              <input
                type="range"
                min={inputs.currentAge + 1}
                max={75}
                value={inputs.retirementAge}
                onChange={(e) =>
                  setInputs({ ...inputs, retirementAge: Number(e.target.value) })
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Monthly Expense */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Current Monthly Living Expense</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {formatINR(inputs.monthlyExpense)}
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={300000}
              step={5000}
              value={inputs.monthlyExpense}
              onChange={(e) =>
                setInputs({ ...inputs, monthlyExpense: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>₹15,000</span>
              <span>₹1,50,000</span>
              <span>₹3,00,000</span>
            </div>
          </div>

          {/* Rates Grid: Inflation & Post-Retirement Return */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Inflation Rate</span>
                <span className="text-amber-400 font-mono font-bold">{inputs.expectedInflation}%</span>
              </div>
              <input
                type="range"
                min={4}
                max={10}
                step={0.5}
                value={inputs.expectedInflation}
                onChange={(e) =>
                  setInputs({ ...inputs, expectedInflation: Number(e.target.value) })
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Post-Ret Return</span>
                <span className="text-emerald-400 font-mono font-bold">{inputs.postRetirementReturn}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={12}
                step={0.5}
                value={inputs.postRetirementReturn}
                onChange={(e) =>
                  setInputs({ ...inputs, postRetirementReturn: Number(e.target.value) })
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Existing Savings */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Existing Retirement Savings / EPF</span>
              <span className="text-slate-200 font-bold font-mono text-sm">
                {formatINR(inputs.existingRetirementSavings)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={5000000}
              step={50000}
              value={inputs.existingRetirementSavings}
              onChange={(e) =>
                setInputs({ ...inputs, existingRetirementSavings: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Real rate of return post-retirement is calculated as{' '}
              <span className="text-emerald-400 font-mono font-semibold">
                {result.realRateOfReturn}%
              </span>
              . Living expenses compound with inflation every year until life expectancy.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
              <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider block">
                Required Corpus @ 60
              </span>
              <div className="text-lg sm:text-xl font-bold text-white mt-1 font-mono">
                {formatINR(result.requiredCorpus, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Funds {result.retirementYears} Years of Retirement
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Monthly Expense @ Ret
              </span>
              <div className="text-lg sm:text-xl font-bold text-amber-400 mt-1 font-mono">
                {formatINR(result.monthlyExpenseAtRetirement, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {inputs.expectedInflation}% Inflation Adjusted
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Required Monthly SIP
              </span>
              <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1 font-mono">
                {formatINR(result.requiredMonthlySip, { compact: true })}
              </div>
              <div className="text-[10px] text-emerald-500 mt-0.5">
                Over Next {result.yearsToRetire} Years
              </div>
            </div>
          </div>

          {/* Recharts Area Chart: Accumulation vs Decumulation */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Corpus Accumulation vs. Decumulation Exhaustion Trajectory
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Retirement Pivot: Age {inputs.retirementAge}
              </span>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={result.yearlyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="age"
                    stroke="#64748b"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `Age ${v}`}
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
                      name === 'corpusValue' ? 'Corpus Balance' : 'Annual Living Expense',
                    ]}
                    labelFormatter={(label) => `At Age ${label}`}
                  />
                  <ReferenceLine
                    x={inputs.retirementAge}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    label={{
                      value: 'Retirement (Age 60)',
                      fill: '#f59e0b',
                      fontSize: 10,
                      position: 'top',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="corpusValue"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#corpusGrad)"
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
