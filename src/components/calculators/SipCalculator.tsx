'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateSIPvsLumpsum,
  formatINR,
  formatPercentage,
  formatYears,
} from '@/lib/calculators';
import { SIPCalculatorInputs } from '@/types';
import { useBooking } from '@/components/booking/BookingContext';
import {
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function SipCalculator() {
  const { openBooking } = useBooking();

  const [inputs, setInputs] = useState<SIPCalculatorInputs>({
    monthlyInstallment: 25000,
    tenureYears: 15,
    expectedReturnRate: 12.5,
    lumpsumSeedFund: 200000,
  });

  const [activeChartTab, setActiveChartTab] = useState<'growth' | 'stacked'>('growth');

  const result = useMemo(() => {
    return calculateSIPvsLumpsum(inputs);
  }, [inputs]);

  const handleBookWithCalculation = () => {
    openBooking({
      calculatorType: 'sip',
      calculatorTitle: 'SIP vs. Lumpsum Wealth Creation Strategy',
      summaryMetrics: [
        { label: 'Combined Final Value', value: formatINR(result.combinedFinalValue), highlight: true },
        { label: 'Total Invested', value: formatINR(result.combinedInvested) },
        { label: 'Estimated Wealth Gain', value: formatINR(result.combinedWealthGain) },
      ],
      keyInputs: [
        { label: 'Monthly SIP', value: formatINR(inputs.monthlyInstallment) },
        { label: 'Tenure', value: `${inputs.tenureYears} Years` },
        { label: 'Expected Return', value: `${inputs.expectedReturnRate}% p.a.` },
        { label: 'Lumpsum Seed', value: formatINR(inputs.lumpsumSeedFund) },
      ],
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Strategy Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            SIP vs. Lumpsum Growth Engine
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Compounding Power
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate dynamic rupee-cost averaging combined with upfront seed capital. Real-time compounding curves.
          </p>
        </div>

        <button
          onClick={handleBookWithCalculation}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-200 text-slate-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0 active:scale-95"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Book Consultation with this Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          {/* Input 1: Monthly Installment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Monthly SIP Installment</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {formatINR(inputs.monthlyInstallment)}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={250000}
              step={1000}
              value={inputs.monthlyInstallment}
              onChange={(e) =>
                setInputs({ ...inputs, monthlyInstallment: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>₹1,000</span>
              <span>₹1,00,000</span>
              <span>₹2,50,000</span>
            </div>
          </div>

          {/* Input 2: Lumpsum Seed Fund */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Lumpsum Initial Seed Fund</span>
              <span className="text-amber-400 font-bold font-mono text-sm">
                {formatINR(inputs.lumpsumSeedFund)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={2500000}
              step={10000}
              value={inputs.lumpsumSeedFund}
              onChange={(e) =>
                setInputs({ ...inputs, lumpsumSeedFund: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>₹0</span>
              <span>₹10,00,000</span>
              <span>₹25,00,000</span>
            </div>
          </div>

          {/* Input 3: Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Investment Tenure</span>
              <span className="text-white font-bold font-mono text-sm">
                {formatYears(inputs.tenureYears)}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={35}
              step={1}
              value={inputs.tenureYears}
              onChange={(e) =>
                setInputs({ ...inputs, tenureYears: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>35 Years</span>
            </div>
          </div>

          {/* Input 4: Expected Return Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Expected Annual CAGR (%)</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {formatPercentage(inputs.expectedReturnRate, 1)}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={22}
              step={0.5}
              value={inputs.expectedReturnRate}
              onChange={(e) =>
                setInputs({ ...inputs, expectedReturnRate: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>5% (Debt)</span>
              <span>12.5% (Flexi-Cap)</span>
              <span>22% (High Alpha)</span>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              SIP compounding applies monthly compounding frequency ($r/12$). Lumpsum compounds annually at the specified nominal CAGR.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Output & Metric Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Total Invested
              </span>
              <div className="text-lg sm:text-xl font-bold text-slate-200 mt-1 font-mono">
                {formatINR(result.combinedInvested, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                SIP: {formatINR(result.totalSipInvested, { compact: true })} + Lump:{' '}
                {formatINR(result.totalLumpsumInvested, { compact: true })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Estimated Wealth Gain
              </span>
              <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1 font-mono">
                {formatINR(result.combinedWealthGain, { compact: true })}
              </div>
              <div className="text-[10px] text-emerald-500 mt-0.5">
                {(result.combinedInvested > 0
                  ? (result.combinedWealthGain / result.combinedInvested) * 100
                  : 0
                ).toFixed(0)}
                % Wealth Multiple
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
              <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider block">
                Total Maturity Corpus
              </span>
              <div className="text-lg sm:text-xl font-bold text-white mt-1 font-mono">
                {formatINR(result.combinedFinalValue, { compact: true })}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                In {inputs.tenureYears} Years @ {inputs.expectedReturnRate}%
              </div>
            </div>
          </div>

          {/* Visual Charts Container */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Trajectory Visualization
                </span>
              </div>

              {/* Chart Mode Toggle */}
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveChartTab('growth')}
                  className={`px-3 py-1 rounded-md transition-all font-medium ${
                    activeChartTab === 'growth'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Growth Curves
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab('stacked')}
                  className={`px-3 py-1 rounded-md transition-all font-medium ${
                    activeChartTab === 'stacked'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Wealth Stacked Bar
                </button>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {activeChartTab === 'growth' ? (
                  <AreaChart
                    data={result.yearlyData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="sipGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="lumpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
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
                        name === 'sipTotal'
                          ? 'SIP Corpus'
                          : name === 'lumpsumTotal'
                          ? 'Lumpsum Corpus'
                          : 'Combined Total',
                      ]}
                      labelFormatter={(label) => `At Year ${label}`}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      formatter={(value) =>
                        value === 'sipTotal'
                          ? 'SIP Corpus'
                          : value === 'lumpsumTotal'
                          ? 'Lumpsum Corpus'
                          : 'Combined Wealth'
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="sipTotal"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#sipGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="lumpsumTotal"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#lumpGrad)"
                    />
                  </AreaChart>
                ) : (
                  <BarChart
                    data={[
                      {
                        name: 'SIP Engine',
                        Invested: result.totalSipInvested,
                        Gain: result.totalSipReturns,
                      },
                      {
                        name: 'Lumpsum Seed',
                        Invested: result.totalLumpsumInvested,
                        Gain: result.totalLumpsumReturns,
                      },
                      {
                        name: 'Total Portfolio',
                        Invested: result.combinedInvested,
                        Gain: result.combinedWealthGain,
                      },
                    ]}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
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
                        name === 'Invested' ? 'Net Invested Capital' : 'Accumulated Wealth Gain',
                      ]}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="Invested" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="Gain" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
