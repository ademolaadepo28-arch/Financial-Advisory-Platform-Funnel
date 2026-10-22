import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CalculatorSuite from '@/components/calculators/CalculatorSuite';
import { ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financial Calculator Suite (5 Engines) | ArthaVault SEBI RIA',
  description:
    'Institutional client-side financial calculators: SIP vs Lumpsum, Retirement Corpus, Annuity SWP, Goal Shortfall, and NPV Valuation. Real-time Recharts visualizations.',
};

export default function CalculatorsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-6 sm:space-y-8 overflow-hidden">
      {/* Page Title & Context Header */}
      <div className="space-y-2.5 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Un-Gated Mathematical Authority Suite</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Institutional Financial Calculators
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
          Real-time, reactive client-side financial engines built strictly to SEBI advisory
          standards. Test assumptions, inspect Recharts visual curves, and seamlessly attach your
          active dossier to a private consultation.
        </p>
      </div>

      {/* Tabbed Suite Container */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <Suspense
          fallback={
            <div className="p-12 text-center text-slate-400 text-sm">
              Loading mathematical engines...
            </div>
          }
        >
          <CalculatorSuite />
        </Suspense>
      </div>

      {/* Educational & Advisory Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-white block font-medium">
              Need assistance interpreting boundary conditions or tax implications?
            </strong>
            <span>
              Explore our investor charter or schedule a 1-on-1 dossier briefing with our SEBI RIA.
            </span>
          </div>
        </div>
        <Link
          href="/faq"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs shrink-0 transition-colors"
        >
          Investor FAQ Hub
        </Link>
      </div>
    </div>
  );
}
