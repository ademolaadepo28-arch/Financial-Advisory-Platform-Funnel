'use client';

import React from 'react';
import Link from 'next/link';
import { useBooking } from '@/components/booking/BookingContext';
import {
  TrendingUp,
  ShieldCheck,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  BarChart3,
  HelpCircle,
  Clock,
  Coins,
  Hourglass,
  Activity,
  Award,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import SipCalculator from '@/components/calculators/SipCalculator';

export default function HomePage() {
  const { openBooking } = useBooking();

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Radiant Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-emerald-900/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute -top-24 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            {/* Regulatory Pillar Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SEBI Registered Investment Adviser • INA000018921</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Mathematical Precision for{' '}
              <span className="gradient-text-emerald">Serious Indian Wealth.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Un-gated institutional mathematical modeling engines. Direct, conflict-free
              fiduciary consultations with instant bank QR settlement. Zero commissions, zero
              distributor bias.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <Link
                href="/calculators"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-200 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                Launch 5 Calculator Engines
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                id="hero-book-consultation-btn"
                onClick={() => openBooking()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/40 shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                Book 30-Min Advisory (₹2,499)
              </button>
            </div>

            {/* Trust Metrics Strip */}
            <div className="pt-10 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-slate-800/80 mt-6">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-2xl font-bold font-mono text-white">₹420+ Cr</div>
                <div className="text-xs text-slate-400 mt-0.5">AUM Advised & Audited</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Fee-Only Fiduciary Model</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-2xl font-bold font-mono text-white">5 Engines</div>
                <div className="text-xs text-slate-400 mt-0.5">Client-Side Financial Models</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-2xl font-bold font-mono text-amber-400">Direct QR</div>
                <div className="text-xs text-slate-400 mt-0.5">Peer-to-Merchant Settlement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4-STEP CONVERSION FUNNEL & STRATEGIC FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Frictionless Strategic Funnel
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
            An Un-Gated Mathematical Authority Engine
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            No forced email signups, no deceptive lead forms. Experience raw mathematical value,
            then book verified 1-on-1 advisory when you demand customized execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 relative group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center mb-4">
              01
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Acquisition
            </span>
            <h3 className="text-base font-bold text-white mt-1">Landing / Authority Hub</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Transparent fiduciary proof, SEBI registration credentials, and un-gated mathematical tools.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 relative group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center mb-4">
              02
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Value & Proof
            </span>
            <h3 className="text-base font-bold text-white mt-1">5 Tabbed Calculators</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Reactive client-side engines: SIP vs. Lumpsum, Retirement Corpus, Annuity SWP, Goal Shortfall, NPV.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-emerald-500/40 shadow-lg shadow-emerald-950/40 relative group transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center mb-4">
              03
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              Conversion
            </span>
            <h3 className="text-base font-bold text-white mt-1">30-Min Paid Booking</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Direct UPI Bank QR code, UTR proof verification, and automated Google Meet calendar invite delivery.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 relative group transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 font-bold text-sm flex items-center justify-center mb-4">
              04
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Execution
            </span>
            <h3 className="text-base font-bold text-white mt-1">Partner Model SaaS</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Direct mutual fund execution, rebalancing schedules, and model-portfolio bridging without commissions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CALCULATOR PREVIEW (STEP 2 PROOF IN ACTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Interactive Calculation Engine #1
              </span>
              <h2 className="text-xl sm:text-3xl font-bold text-white mt-1">
                SIP vs. Lumpsum Dynamic Wealth Visualizer
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Experience the real-time Recharts visualization engine. Adjust sliders to see instant feedback.
              </p>
            </div>
            <Link
              href="/calculators"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-xs sm:text-sm text-slate-200 font-semibold flex items-center gap-2 transition-colors shrink-0"
            >
              View Full 5-Tool Suite
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <SipCalculator />
        </div>
      </section>

      {/* 4. THE FEE-ONLY FIDUCIARY ADVANTAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Fiduciary Accountability
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
            Why Discerning Investors Choose SEBI RIA Over Bank Distributors
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            The mathematical impact of 1.25% commission drag on a ₹2 Crore portfolio over 15 years
            exceeds ₹68 Lakhs in lost returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Bank / Distributor */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-300">Traditional Bank / Distributor</h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                Commission-Driven
              </span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold">✕</span>
                <span>
                  Sells Regular Mutual Funds with hidden 1.0%–1.5% trailing commission taken directly
                  from your corpus every year.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold">✕</span>
                <span>
                  Sales quotas push high-margin ULIPs, credit cards, and opaque structured notes with
                  hefty upfront broker cuts.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold">✕</span>
                <span>No legal fiduciary duty under SEBI to act exclusively in client interest.</span>
              </li>
            </ul>
          </div>

          {/* ArthaVault SEBI Registered RIA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl shadow-emerald-950/30 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                ArthaVault Advisory
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                SEBI Registered RIA
              </span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Direct Mutual Funds Only:</strong> Zero commissions.
                  You save the entire distributor margin, compounding 100% of your earnings.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Strict Fiduciary Standard:</strong> Legally bound by
                  SEBI RIA Regulations 2013 to recommend only asset allocations tailored to your risk
                  profile.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Direct UPI Bank Settlement:</strong> Transparent flat
                  fee for 30-min consultation. No recurring lock-ins.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CLIENT ADVISORY CASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Advisory Case Studies
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
            Real Portfolio Outcomes & Structuring
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Tech Founder • Bengaluru
            </div>
            <h3 className="text-base font-bold text-white">
              ₹14 Cr ESOP Liquidity Event & Capital Gains Staging
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transitioned concentrated single-stock risk into a multi-asset debt + equity core
              portfolio while structuring section 54F capital gains exemptions over 2 financial years.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              Advisory Focus: Tax Harvesting & Reinvestment
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Senior CXO • Mumbai
            </div>
            <h3 className="text-base font-bold text-white">
              ₹8.5 Cr Retirement Corpus Longevity & SWP Cashflow
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Constructed an inflation-hedged 3-bucket retirement model generating ₹3.5 Lakh/month
              tax-efficient cashflows without triggering principal depletion over 30 years.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              Advisory Focus: Annuity & Systematic Withdrawal
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              NRI Physician • Singapore / Delhi
            </div>
            <h3 className="text-base font-bold text-white">
              Cross-Border NRE/NRO Remittances & Indian Equity Indexing
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Re-engineered scattered bank FDs and regular mutual funds into low-cost direct Nifty 50
              and Midcap index funds with DTAA tax credit optimization.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              Advisory Focus: Cross-border FEMA & Direct Funds
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Private 30-Minute Consultation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Stress-Test Your Financial Strategy with a SEBI RIA?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Book a private 30-minute consultation directly with Aarav Sharma, CFA (SEBI RIA).
              Instant bank QR payment, automated Google Meet scheduling, and your calculator dossier
              pre-attached.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => openBooking()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Reserve 30-Min Slot (₹2,499)
              </button>
              <Link
                href="/disclosures"
                className="text-xs text-slate-400 hover:text-white underline flex items-center gap-1"
              >
                View SEBI Disclosures & Grievance Matrix <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
