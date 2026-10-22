'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBooking } from '@/components/booking/BookingContext';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'Advisory & Fees' | 'Calculators & Methodology' | 'Booking & Tech' | 'SEBI Regulations';
  question: string;
  answer: string;
}

export default function FAQPage() {
  const { openBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Advisory & Fees',
      question: 'What is a SEBI Registered Investment Adviser (RIA) and how does it differ from a distributor?',
      answer:
        'A SEBI Registered Investment Adviser (RIA) is legally registered under the SEBI (Investment Advisers) Regulations, 2013. RIAs operate under a strict fiduciary mandate, meaning they are legally obligated to act exclusively in the client\'s best financial interest. Unlike mutual fund distributors or bank relationship managers who receive ongoing trail commissions (0.5%–1.5% p.a.) embedded in the Total Expense Ratio (TER) of Regular plans, an RIA works purely on a Fee-Only basis and recommends only Direct mutual fund plans.',
    },
    {
      id: 'faq-2',
      category: 'Advisory & Fees',
      question: 'How does the direct bank UPI settlement work? Why no payment gateway fee?',
      answer:
        'To ensure absolute transparency and remove intermediate gateway processing commissions (which typically charge 2%–3%), our consultation bookings settle directly peer-to-merchant into the advisor\'s registered HDFC Bank current account via dynamic UPI QR or direct IMPS/NEFT transfer. After transferring, you provide your 12-digit UTR transaction reference, which is verified against our bank statement.',
    },
    {
      id: 'faq-3',
      category: 'Calculators & Methodology',
      question: 'Are the calculator outputs guaranteed returns?',
      answer:
        'No. In compliance with SEBI advertising guidelines and statutory disclosure mandates, all calculator outputs represent illustrative mathematical projections based on assumed compounding rates, inflation, and cashflows. Actual market returns in securities fluctuate based on economic factors, interest rate cycles, and equity market performance.',
    },
    {
      id: 'faq-4',
      category: 'Calculators & Methodology',
      question: 'How does the Retirement Decumulation calculation treat inflation?',
      answer:
        'Our Retirement Corpus model computes the real rate of return post-retirement using the Fisher equation: r_real = (1 + r_nominal) / (1 + inflation) - 1. Your living expenses escalate annually with the chosen inflation parameter (e.g., 6.5% p.a.), and living withdrawals are calculated as an annuity-due (at the beginning of each year), accurately modeling capital decay over your planning horizon.',
    },
    {
      id: 'faq-5',
      category: 'Booking & Tech',
      question: 'How does the advisor receive my calculator inputs before the meeting?',
      answer:
        'When you click "Book Consultation with this Plan" from any calculator, our platform captures an active JSON snapshot of your chosen inputs (e.g. SIP installment, retirement age, hurdle rate, shortfall). This is packaged into a structured "Advisor Briefing Dossier" alongside your booking, allowing the advisor to review your specific numbers before the Google Meet begins.',
    },
    {
      id: 'faq-6',
      category: 'Booking & Tech',
      question: 'What happens immediately after I submit my booking and UTR?',
      answer:
        'Upon submitting your slot reservation and UTR transaction reference, the system generates an instant Google Meet room link, triggers automated dual calendar notifications to you and the advisor, and offers a downloadable .ics calendar file compatible with Google Calendar, Apple Calendar, and Microsoft Outlook.',
    },
    {
      id: 'faq-7',
      category: 'SEBI Regulations',
      question: 'Does ArthaVault hold custody of my investment funds or securities?',
      answer:
        'No. As per SEBI RIA regulations, independent investment advisers maintain zero custody of client money or securities. We do not hold client wallets, bank deposits, or pooled funds. Execution takes place exclusively through your own Demat or Direct AMC portal (e.g., MF Central, BSE StAR MF, Zerodha Coin, Groww Direct).',
    },
    {
      id: 'faq-8',
      category: 'SEBI Regulations',
      question: 'What is the Grievance Redressal mechanism if I have a complaint?',
      answer:
        'As mandated by SEBI, grievances must first be raised with the advisor at advisory@arthavault.in, with a binding resolution window of 21 calendar days. If unresolved, clients may escalate to the SEBI SCORES 2.0 portal (scores.sebi.gov.in) or initiate online dispute resolution through the SMART ODR platform (smartodr.in).',
    },
  ];

  const categories = ['All', 'Advisory & Fees', 'Calculators & Methodology', 'Booking & Tech', 'SEBI Regulations'];

  const filteredFaqs =
    activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10 sm:space-y-12 overflow-hidden">
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span>Investor Education & Awareness</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Investor Awareness & FAQ Hub
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
          Everything you need to know about fee-only fiduciary advisory, SEBI compliance, mathematical
          methodology, and our direct bank consultation pipeline.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all ${
                isExpanded
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-3 focus:outline-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-emerald-400 shrink-0 self-start">
                    {faq.category}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-white leading-snug">
                    {faq.question}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 shrink-0 mt-0.5 sm:mt-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SEBI Charter Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold">
          <ShieldCheck className="w-5 h-5" />
          <span>SEBI Investor Charter Highlights</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <strong className="text-slate-200 block font-semibold">Right to Fair Advice</strong>
            <span>Clients are entitled to objective financial advice tailored strictly to their assessed risk profile.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <strong className="text-slate-200 block font-semibold">Total Fee Transparency</strong>
            <span>Zero hidden charges, commissions, or distributor sharing. All advisory fees must be documented in an agreement.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
            <strong className="text-slate-200 block font-semibold">21-Day Redressal</strong>
            <span>Any complaint must be formally addressed by the registered intermediary within 21 calendar days.</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => openBooking()}
          className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/20 transition-all inline-flex items-center gap-2 active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          Book Private 30-Min Consultation (₹2,499)
        </button>
      </div>
    </div>
  );
}
