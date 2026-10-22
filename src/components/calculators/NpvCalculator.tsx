'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateNPVValuation,
  formatINR,
  formatPercentage,
} from '@/lib/calculators';
import { NPVInputs, NPVPeriodInput } from '@/types';
import { useBooking } from '@/components/booking/BookingContext';
import {
  Activity,
  Calendar,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';

export default function NpvCalculator() {
  const { openBooking } = useBooking();

  const [discountRate, setDiscountRate] = useState<number>(12.0);
  const [initialOutflow, setInitialOutflow] = useState<number>(2000000); // 20 Lakhs
  const [cashflows, setCashflows] = useState<NPVPeriodInput[]>([
    { period: 1, cashflow: 450000 },
    { period: 2, cashflow: 600000 },
    { period: 3, cashflow: 800000 },
    { period: 4, cashflow: 950000 },
    { period: 5, cashflow: 1100000 },
  ]);

  const result = useMemo(() => {
    return calculateNPVValuation({
      discountRatePercentage: discountRate,
      initialCashOutflow: initialOutflow,
      cashflows,
    });
  }, [discountRate, initialOutflow, cashflows]);

  const handleAddPeriod = () => {
    const nextPeriod = cashflows.length + 1;
    if (nextPeriod <= 15) {
      const lastCf = cashflows.length > 0 ? cashflows[cashflows.length - 1].cashflow : 500000;
      setCashflows([...cashflows, { period: nextPeriod, cashflow: Math.round(lastCf * 1.1) }]);
    }
  };

  const handleRemovePeriod = (periodToRemove: number) => {
    if (cashflows.length > 1) {
      const filtered = cashflows.filter((cf) => cf.period !== periodToRemove);
      // Re-index periods 1..N
      const reindexed = filtered.map((cf, idx) => ({ ...cf, period: idx + 1 }));
      setCashflows(reindexed);
    }
  };

  const handleUpdateCashflow = (period: number, value: number) => {
    setCashflows(
      cashflows.map((cf) => (cf.period === period ? { ...cf, cashflow: Math.max(0, value) } : cf))
    );
  };

  const handleBookWithCalculation = () => {
    openBooking({
      calculatorType: 'npv',
      calculatorTitle: 'Capital Budgeting & NPV / IRR Valuation Dossier',
      summaryMetrics: [
        { label: 'Net Present Value (NPV)', value: formatINR(result.npv), highlight: true },
        { label: 'Internal Rate of Return (IRR)', value: result.irr !== null ? `${result.irr}%` : 'N/A' },
        { label: 'Discounted Payback', value: result.discountedPaybackPeriod ? `${result.discountedPaybackPeriod} Yrs` : 'Beyond Horizon' },
        { label: 'Profitability Index', value: `${result.profitabilityIndex}x` },
      ],
      keyInputs: [
        { label: 'Discount Hurdle Rate', value: `${discountRate}% p.a.` },
        { label: 'Initial Outflow', value: formatINR(initialOutflow) },
        { label: 'Evaluation Horizon', value: `${cashflows.length} Periods` },
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
            NPV & Valuation Engine
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                result.isViable
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              {result.isViable ? 'Value Accretive (NPV > 0)' : 'Value Dilutive (NPV < 0)'}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Discounted cash flow (DCF) capital budgeting. Compute Hurdle Rates, IRR, and Discounted Payback.
          </p>
        </div>

        <button
          onClick={handleBookWithCalculation}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-200 text-slate-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0 active:scale-95"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Review Valuation Model with Advisor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          {/* Discount Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Discount / Hurdle Rate (%)</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {formatPercentage(discountRate, 1)}
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={25}
              step={0.5}
              value={discountRate}
              onChange={(e) => setDiscountRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>6% (Risk-Free + Spread)</span>
              <span>12% (Cost of Capital)</span>
              <span>25% (Venture Hurdle)</span>
            </div>
          </div>

          {/* Initial Outflow */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Initial Capital Outflow (Year 0)</span>
              <span className="text-rose-400 font-bold font-mono text-sm">
                -{formatINR(initialOutflow)}
              </span>
            </div>
            <input
              type="range"
              min={200000}
              max={15000000}
              step={100000}
              value={initialOutflow}
              onChange={(e) => setInitialOutflow(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Projected Cash Inflows List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Projected Inflows by Year
              </label>
              <button
                type="button"
                onClick={handleAddPeriod}
                disabled={cashflows.length >= 12}
                className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 disabled:opacity-40"
              >
                <Plus className="w-3 h-3" /> Add Year
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {cashflows.map((cf) => (
                <div
                  key={cf.period}
                  className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800"
                >
                  <span className="text-xs font-mono font-bold text-slate-400 w-14 shrink-0">
                    Yr {cf.period}:
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={25000}
                    value={cf.cashflow}
                    onChange={(e) => handleUpdateCashflow(cf.period, Number(e.target.value))}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePeriod(cf.period)}
                    disabled={cashflows.length <= 1}
                    className="p-1 text-slate-500 hover:text-rose-400 disabled:opacity-30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              NPV discounts all prospective cash flows to period zero. If NPV is greater than zero and
              IRR exceeds the hurdle rate, the opportunity creates net wealth.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className={`p-4 rounded-xl border ${
                result.isViable
                  ? 'bg-gradient-to-br from-emerald-950/40 to-slate-900 border-emerald-500/30'
                  : 'bg-gradient-to-br from-rose-950/40 to-slate-900 border-rose-500/30'
              }`}
            >
              <span className="text-[11px] font-medium uppercase tracking-wider block text-slate-300">
                Net Present Value (NPV)
              </span>
              <div
                className={`text-lg sm:text-xl font-bold mt-1 font-mono ${
                  result.isViable ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formatINR(result.npv)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {result.isViable ? 'Positive Economic Profit' : 'Destroys Capital Value'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Internal Rate of Return (IRR)
              </span>
              <div className="text-lg sm:text-xl font-bold text-white mt-1 font-mono">
                {result.irr !== null ? `${result.irr}%` : 'N/A'}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                Hurdle Rate: {discountRate}%
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Discounted Payback
              </span>
              <div className="text-lg sm:text-xl font-bold text-slate-200 mt-1 font-mono">
                {result.discountedPaybackPeriod ? `${result.discountedPaybackPeriod} Yrs` : 'N/A'}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Undiscounted: {result.undiscountedPaybackPeriod ?? 'N/A'} Yrs
              </div>
            </div>
          </div>

          {/* Recharts Composed Chart: Discounted vs Undiscounted Cumulative Trajectory */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Discounted vs. Undiscounted Net Cashflow Trajectory
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Profitability Index: {result.profitabilityIndex}x
              </span>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={result.periodsData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="period"
                    stroke="#64748b"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => (v === 0 ? 'Yr 0' : `Yr ${v}`)}
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
                      name === 'discountedCashflow'
                        ? 'Discounted Period Cashflow'
                        : name === 'cumulativeDiscounted'
                        ? 'Cumulative Discounted (NPV line)'
                        : 'Cumulative Undiscounted',
                    ]}
                    labelFormatter={(label) => `Period Year ${label}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <ReferenceLine y={0} stroke="#475569" strokeWidth={1.5} />
                  <Bar
                    dataKey="discountedCashflow"
                    name="Discounted Cashflow"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeUndiscounted"
                    name="Cumulative Undiscounted"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeDiscounted"
                    name="Cumulative Discounted (NPV)"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
